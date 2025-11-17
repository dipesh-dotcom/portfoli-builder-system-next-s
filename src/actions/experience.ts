"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cacheTag, revalidatePath, revalidateTag } from "next/cache";

export type ExperienceData = {
  companyName: string;
  position: string;
  startYear: number;
  endYear: number;
  description: string;
};

async function getCachedExperiences(userId: string) {
  "use cache";
  cacheTag(`experiences-${userId}`);

  const experiences = await prisma.experience.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return experiences;
}

export async function createExperience(data: ExperienceData) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const experience = await prisma.experience.create({
      data: {
        userId: userId,
        ...data,
      },
    });

    revalidateTag(`experiences-${userId}`, "default");
    return { success: true, data: experience, statusCode: 201 };
  } catch (error) {
    console.error("[Education] Create error:", error);
    return {
      success: false,
      error: "Failed to create education",
      statusCode: 500,
    };
  }
}

export async function getExperiences() {
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

    const experiences = await getCachedExperiences(userId);
    return { success: true, data: experiences || [], statusCode: 200 };
  } catch (error) {
    console.error("[Education] Fetch error:", error);
    return {
      success: false,
      error: "Failed to fetch educations",
      data: [],
      statusCode: 500,
    };
  }
}

export async function updateExperience(id: string, data: ExperienceData) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const experience = await prisma.experience.findFirst({
      where: { id, userId: user.id },
    });

    if (!experience)
      return { success: false, error: "Experience not found", statusCode: 404 };

    const updated = await prisma.experience.update({
      where: { id },
      data,
    });
    revalidateTag(`experiences-${userId}`, "default");
    return { success: true, data: updated, statusCode: 200 };
  } catch (error) {
    console.error("[Education] Update error:", error);
    return {
      success: false,
      error: "Failed to update education",
      statusCode: 500,
    };
  }
}

export async function deleteExperience(id: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const experience = await prisma.experience.findFirst({
      where: { id, userId: user.id },
    });
    if (!experience)
      return { success: false, error: "Experience not found", statusCode: 404 };

    await prisma.experience.delete({ where: { id } });

    revalidateTag(`experiences-${userId}`, "default");

    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error("[experience] Delete error:", error);
    return {
      success: false,
      error: "Failed to delete experience",
      statusCode: 500,
    };
  }
}
