import { Webhook } from "svix";
import { headers } from "next/headers";
import { supabase } from "@/lib/supabaseClient";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  console.log("🔵 Webhook endpoint hit");

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ CLERK_WEBHOOK_SECRET is missing");
    return new Response("Error: Missing webhook secret", { status: 500 });
  }

  console.log("✅ Webhook secret found");

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log("📋 Headers:", {
    svix_id: svix_id ? "✅" : "❌",
    svix_timestamp: svix_timestamp ? "✅" : "❌",
    svix_signature: svix_signature ? "✅" : "❌",
  });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Missing svix headers");
    return new Response("Error: Missing svix headers", { status: 400 });
  }

  // Get the body
  let payload;
  try {
    payload = await req.json();
    console.log("✅ Payload parsed:", JSON.stringify(payload, null, 2));
  } catch (err) {
    console.error("❌ Error parsing payload:", err);
    return new Response("Error: Invalid JSON", { status: 400 });
  }

  const body = JSON.stringify(payload);

  // Create a new Svix instance
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("✅ Webhook verified successfully");
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Error: Verification failed", { status: 400 });
  }

  const eventType = evt.type;
  console.log(`🎯 Event type: ${eventType}`);

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    console.log("👤 User data:", {
      id,
      email: email_addresses?.[0]?.email_address,
      first_name,
      last_name,
    });

    if (!id || !email_addresses?.[0]?.email_address) {
      console.error("❌ Missing required fields");
      return new Response("Error: Missing required fields", { status: 400 });
    }

    const userData = {
      clerk_id: id,
      email: email_addresses[0].email_address,
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim() || null,
    };

    console.log("💾 Attempting to upsert:", userData);

    const { data, error } = await supabase
      .from("users")
      .upsert(userData, {
        onConflict: "clerk_id",
      })
      .select();

    if (error) {
      console.error("❌ Database error:", error);
      return new Response("Error: Database operation failed", { status: 500 });
    }

    console.log("✅ User synced successfully:", data);
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
