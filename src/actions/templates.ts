"use server";

import { auth } from "@/lib/auth";
import * as db from "@/lib/db";

export async function getTemplatesAction() {
  try {
    return await db.getTemplates();
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw new Error("Failed to fetch templates");
  }
}

export async function getTemplateByIdAction(id: string) {
  try {
    return await db.getTemplateById(id);
  } catch (error) {
    console.error("Error fetching template:", error);
    throw new Error("Failed to fetch template");
  }
}

export async function getCategoriesAction() {
  try {
    return await db.getCategories();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

export async function createTemplateAction(data: {
  name: string;
  description: string;
  categoryId: string;
  thumbnail: string;
  code: string;
}) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    return await db.createTemplate(data);
  } catch (error) {
    console.error("Error creating template:", error);
    throw new Error("Failed to create template");
  }
}

export async function updateTemplateAction(
  id: string,
  data: {
    name?: string;
    description?: string;
    categoryId?: string;
    thumbnail?: string;
    code?: string;
  }
) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    return await db.updateTemplate(id, data);
  } catch (error) {
    console.error("Error updating template:", error);
    throw new Error("Failed to update template");
  }
}

export async function deleteTemplateAction(id: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    return await db.deleteTemplate(id);
  } catch (error) {
    console.error("Error deleting template:", error);
    throw new Error("Failed to delete template");
  }
}
