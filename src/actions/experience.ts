"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { number } from "zod";
import { EducationData } from "./education";

export type ExperienceData = {
  companyName: string;
  position: string;
  startYear: number;
  endYear: number;
  description: string;
};

export async function createExperience(data: ExperienceData) {
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
    const experience = await prisma.experience.create({
      data: {
        userId: user.id,
        ...data,
      },
    });

    revalidatePath("/experience");
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
      include: { experiences: { orderBy: { startYear: "desc" } } },
    });
    return { success: true, data: user?.experiences || [], statusCode: 200 };
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
    const { userId } = await auth();
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
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
    revalidatePath("/experience");
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
    const { userId } = await auth();
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const experience = await prisma.experience.findFirst({
      where: { id, userId: user.id },
    });
    if (!experience)
      return { success: false, error: "Experience not found", statusCode: 404 };

    await prisma.experience.delete({ where: { id } });

    revalidatePath("/experience");

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
