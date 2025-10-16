"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/clerk-sdk-node";

export type LanguageData = {
  name: string;
  proficiency: string;
};

export async function createLanguage(data: LanguageData) {
  try {
    const { userId } = await auth();
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    let user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          name:
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
            null,
        },
      });
    }

    const language = await prisma.language.create({
      data: {
        userId: user.id,
        ...data,
      },
    });

    revalidatePath("/language");

    return { success: true, data: language, statusCode: 201 };
  } catch (error) {
    console.error("[Language] Create error:", error);
    return {
      success: false,
      error: "Failed to create language",
      statusCode: 500,
    };
  }
}

export async function getLanguages() {
  try {
    const { userId } = await auth();
    if (!userId)
      return {
        success: false,
        error: "Unauthorized",
        data: [],
        statusCode: 401,
      };

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { languages: { orderBy: { id: "desc" } } },
    });

    return { success: true, data: user?.languages || [], statusCode: 200 };
  } catch (error) {
    console.error("[Language] Fetch error:", error);
    return {
      success: false,
      error: "Failed to fetch language",
      data: [],
      statusCode: 500,
    };
  }
}

export async function updateLangugae(id: string, data: LanguageData) {
  try {
    const { userId } = await auth();
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const language = await prisma.language.findFirst({
      where: { id, userId: user.id },
    });
    if (!language)
      return { success: false, error: "Language not found", statusCode: 404 };

    const updated = await prisma.language.update({
      where: { id },
      data,
    });

    revalidatePath("/language");

    return { success: true, data: updated, statusCode: 200 };
  } catch (error) {
    console.error("[Language] Update error:", error);
    return {
      success: false,
      error: "Failed to update language",
      statusCode: 500,
    };
  }
}

export async function deleteLanguage(id: string) {
  try {
    const { userId } = await auth();
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const language = await prisma.language.findFirst({
      where: { id, userId: user.id },
    });
    if (!language)
      return { success: false, error: "Language not found", statusCode: 404 };

    await prisma.language.delete({ where: { id } });

    revalidatePath("/language");

    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error("[Language] Delete error:", error);
    return {
      success: false,
      error: "Failed to delete language",
      statusCode: 500,
    };
  }
}
