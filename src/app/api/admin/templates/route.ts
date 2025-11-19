import { getTemplates } from "@/lib/data/templates";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// GET all templates
export async function GET(req: NextRequest) {
  try {
    const templates = await getTemplates();
    return NextResponse.json({ success: true, data: templates });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

// Create template
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, description, thumbnail, category, styles, sections } =
      body;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug exists
    const existing = await prisma.portfolioTemplate.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Template with this slug already exists" },
        { status: 400 }
      );
    }

    // Create template with sections
    const template = await prisma.portfolioTemplate.create({
      data: {
        name,
        slug,
        description,
        thumbnail,
        category: category || "general",
        styles,
        sections: {
          create:
            sections?.map((section: any, index: number) => ({
              name: section.name,
              type: section.type,
              order: section.order ?? index,
              config: section.config || {},
              isRequired: section.isRequired || false,
              isEnabled: section.isEnabled ?? true,
            })) || [],
        },
      },
      include: {
        sections: true,
      },
    });

    revalidateTag("templates", "default");

    return NextResponse.json(
      { success: true, data: template },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating template:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
