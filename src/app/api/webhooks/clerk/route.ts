// app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; // Make sure you have Prisma client set up

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET to .env");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Error: Verification failed", { status: 400 });
  }

  const eventType = evt.type;
  console.log(`🎯 Webhook event: ${eventType}`);

  if (eventType === "user.created" || eventType === "user.updated") {
    try {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        primary_email_address_id,
      } = evt.data;

      // Skip test events
      if (!email_addresses || email_addresses.length === 0) {
        console.log("⚠️ Test event detected - skipping database operation");
        return new Response("Test webhook received", { status: 200 });
      }

      let email: string | null = null;

      if (primary_email_address_id) {
        const primaryEmail = email_addresses.find(
          (e: any) => e.id === primary_email_address_id
        );
        email = primaryEmail?.email_address || null;
      }

      if (!email && email_addresses.length > 0) {
        email = email_addresses[0].email_address;
      }

      if (!email) {
        console.error("❌ No email address found");
        return new Response("Error: No valid email address", { status: 400 });
      }

      const name = `${first_name || ""} ${last_name || ""}`.trim() || null;

      // Upsert using Prisma
      const user = await prisma.user.upsert({
        where: { clerkId: id },
        update: { name, email },
        create: { clerkId: id, name, email },
      });

      console.log("✅ User synced successfully:", user);
      return new Response("User synced successfully", { status: 200 });
    } catch (error: any) {
      console.error("❌ Unexpected error in user.created/updated:", error);
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    try {
      const { id } = evt.data;

      if (!id) {
        console.error("❌ Missing user ID for deletion");
        return new Response("Error: Missing user id", { status: 400 });
      }

      await prisma.user.delete({
        where: { clerkId: id },
      });

      console.log("✅ User deleted successfully");
      return new Response("User deleted successfully", { status: 200 });
    } catch (error: any) {
      console.error("❌ Unexpected error in user.deleted:", error);
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }

  console.log(`ℹ️ Unhandled event type: ${eventType}`);
  return new Response("Webhook received", { status: 200 });
}
