"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";

export type AchievementData = {
  title: string;
  issuer: string;
  dateObtained: string;
};

async function fetchAchievements(userId: string) {
  const achievements = await prisma.achievement.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return achievements;
}

// cached function
const getCachedAchievements = unstable_cache(
  fetchAchievements,
  ["achievements"],
  {
    revalidate: 3600,
    tags: ["achievements"],
  }
);

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

    revalidateTag("achievements", { expire: 0 });

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

export async function countAchievements() {
  try {
    const totalAchievements = await prisma.achievement.count();
    return totalAchievements;
  } catch (error) {
    console.error("[Achievement] Count error:", error);
    return 0; // fallback if error occurs
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

    const achievements = await getCachedAchievements(userId);

    return { success: true, data: achievements || [], statusCode: 200 };
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

    revalidateTag("achievements", { expire: 0 });

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

    revalidateTag("achievements", { expire: 0 });

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
