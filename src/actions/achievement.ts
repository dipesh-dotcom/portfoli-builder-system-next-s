"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type AchievementData = {
  title: string;
  issuer: string;
  dateObtained: string;
};

export async function createAchievement(data: AchievementData) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const achievement = await prisma.achievement.create({
      data: {
        userId: userId,
        ...data,
      },
    });

    revalidatePath("/achievement");

    return { success: true, data: achievement, statusCode: 201 };
  } catch (error) {
    console.error("[Achievement] Create error:", error);
    return {
      success: false,
      error: "Failed to create achievement",
      statusCode: 500,
    };
  }
}

export async function getAchievements() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return {
        success: false,
        error: "Unauthorized",
        data: [],
        statusCode: 401,
      };

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { achievements: { orderBy: { dateObtained: "desc" } } },
    });

    return { success: true, data: user?.achievements || [], statusCode: 200 };
  } catch (error) {
    console.error("[Achievement] Fetch error:", error);
    return {
      success: false,
      error: "Failed to fetch achievement",
      data: [],
      statusCode: 500,
    };
  }
}

export async function updateAchievement(id: string, data: AchievementData) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const achievement = await prisma.achievement.findFirst({
      where: { id, userId: user.id },
    });
    if (!achievement)
      return {
        success: false,
        error: "Achievement not found",
        statusCode: 404,
      };

    const updated = await prisma.achievement.update({
      where: { id },
      data,
    });

    revalidatePath("/achievement");

    return { success: true, data: updated, statusCode: 200 };
  } catch (error) {
    console.error("[Achievement] Update error:", error);
    return {
      success: false,
      error: "Failed to update achievement",
      statusCode: 500,
    };
  }
}

export async function deleteAchievement(id: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const achievement = await prisma.achievement.findFirst({
      where: { id, userId: user.id },
    });
    if (!achievement)
      return {
        success: false,
        error: "Achievement not found",
        statusCode: 404,
      };

    await prisma.achievement.delete({ where: { id } });

    revalidatePath("/achievement");

    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error("[Achievement] Delete error:", error);
    return {
      success: false,
      error: "Failed to delete achievement",
      statusCode: 500,
    };
  }
}
