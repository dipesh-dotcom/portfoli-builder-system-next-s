import { type NextRequest, NextResponse } from "next/server";
import * as db from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { value } = body;

    if (!value) {
      return NextResponse.json({ error: "Value is required" }, { status: 400 });
    }

    const customization = await db.updatePortfolioCustomization(
      params.id,
      value
    );

    return NextResponse.json(customization);
  } catch (error) {
    console.error("Error updating customization:", error);
    return NextResponse.json(
      { error: "Failed to update customization" },
      { status: 500 }
    );
  }
}
