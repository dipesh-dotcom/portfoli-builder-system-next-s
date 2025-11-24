import { type NextRequest, NextResponse } from "next/server";
import * as db from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fieldName, value, fieldType } = body;

    if (!fieldName || !value || !fieldType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const customization = await db.addPortfolioCustomization(params.id, {
      userId: session.user.id,
      templateId: params.id,
      fieldName,
      fieldValue: value, // map "value" to "fieldValue"
      fieldType,
    });

    return NextResponse.json(customization, { status: 201 });
  } catch (error) {
    console.error("Error adding customization:", error);
    return NextResponse.json(
      { error: "Failed to add customization" },
      { status: 500 }
    );
  }
}
