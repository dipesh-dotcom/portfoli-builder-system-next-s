import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET single template
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const template = await prisma.portfolioTemplate.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!template) {
      return NextResponse.json(
        { success: false, message: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: template });
  } catch (error) {
    console.error("Error fetching template:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch template" },
      { status: 500 }
    );
  }
}

// UPDATE template
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = await req.json();
    const {
      name,
      slug,
      description,
      thumbnail,
      category,
      styles,
      sections,
      isPublished,
      isPremium,
    } = body;

    // Update template
    const template = await prisma.portfolioTemplate.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        thumbnail,
        category,
        styles,
        isPublished,
        isPremium,
      },
      include: {
        sections: true,
      },
    });

    // Update sections if provided
    if (sections) {
      // Delete removed sections
      await prisma.templateSection.deleteMany({
        where: {
          templateId: id,
          id: {
            notIn: sections.filter((s: any) => s.id).map((s: any) => s.id),
          },
        },
      });

      // Upsert sections
      for (const section of sections) {
        await prisma.templateSection.upsert({
          where: { id: section.id || "new" },
          create: {
            templateId: id,
            name: section.name,
            type: section.type,
            order: section.order,
            config: section.config || {},
            isRequired: section.isRequired || false,
            isEnabled: section.isEnabled ?? true,
          },
          update: {
            name: section.name,
            type: section.type,
            order: section.order,
            config: section.config,
            isRequired: section.isRequired,
            isEnabled: section.isEnabled,
          },
        });
      }
    }

    return NextResponse.json({ success: true, data: template });
  } catch (error: any) {
    console.error("Error updating template:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE template
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.portfolioTemplate.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Template deleted" });
  } catch (error: any) {
    console.error("Error deleting template:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
