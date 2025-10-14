import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  try {
    const user = await clerkClient.users.createUser({
      emailAddress: [email],
      password,
      firstName: name.split("")[0] || "",
      lastName: name.split("")[1] || "",
    });
    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.errors?.[0]?.longMessage || "Signup Failed",
      },
      { status: 400 }
    );
  }
}
