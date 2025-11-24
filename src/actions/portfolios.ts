"use server";

import { auth } from "@/lib/auth";
import * as db from "@/lib/db";

export async function getPortfoliosAction() {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const userId = session.user.id;
    if (!userId) throw new Error("User ID is missing");

    return await db.getPortfolios(userId);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    throw new Error("Failed to fetch portfolios");
  }
}

export async function getPortfolioByIdAction(id: string) {
  try {
    return await db.getPortfolioById(id);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    throw new Error("Failed to fetch portfolio");
  }
}

export async function getPortfolioBySlugAction(slug: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const userId = session.user.id;
    if (!userId) throw new Error("User ID is missing");

    return await db.getPortfolioBySlug(userId, slug);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    throw new Error("Failed to fetch portfolio");
  }
}

export async function createPortfolioAction(data: {
  templateId: string;
  title: string;
  slug: string;
}) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const userId = session.user.id;
    if (!userId) throw new Error("User ID is missing");
    return await db.createPortfolio({
      userId,
      templateId: data.templateId,
      title: data.title,
      slug: data.slug,
    });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    throw new Error("Failed to create portfolio");
  }
}

export async function updatePortfolioAction(
  id: string,
  data: {
    title?: string;
    slug?: string;
    published?: boolean;
  }
) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const userId = session.user.id;
    if (!userId) throw new Error("User ID is missing");

    return await db.updatePortfolio(id, data);
  } catch (error) {
    console.error("Error updating portfolio:", error);
    throw new Error("Failed to update portfolio");
  }
}

export async function deletePortfolioAction(id: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const userId = session.user.id;
    if (!userId) throw new Error("User ID is missing");

    return await db.deletePortfolio(id);
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    throw new Error("Failed to delete portfolio");
  }
}

export async function addPortfolioCustomizationAction(
  portfolioId: string,
  data: {
    templateId: string;
    fieldName: string;
    fieldValue: string;
    fieldType: string;
  }
) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const userId = session.user.id;
    if (!userId) throw new Error("User ID is missing");

    return await db.addPortfolioCustomization(portfolioId, {
      ...data,
      userId,
    });
  } catch (error) {
    console.error("Error adding customization:", error);
    throw new Error("Failed to add customization");
  }
}

export async function updatePortfolioCustomizationAction(
  customizationId: string,
  value: string
) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const userId = session.user.id;
    if (!userId) throw new Error("User ID is missing");

    return await db.updatePortfolioCustomization(customizationId, value);
  } catch (error) {
    console.error("Error updating customization:", error);
    throw new Error("Failed to update customization");
  }
}
