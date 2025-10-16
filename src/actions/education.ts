"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/clerk-sdk-node";

export type EducationData = {
  instituteName: string;
  degree: string;
  startYear: number;
  endYear: number;
};

export async function createEducation(data: EducationData) {
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

    const education = await prisma.education.create({
      data: {
        userId: user.id,
        ...data,
      },
    });

    revalidatePath("/education");

    return { success: true, data: education, statusCode: 201 };
  } catch (error) {
    console.error("[Education] Create error:", error);
    return {
      success: false,
      error: "Failed to create education",
      statusCode: 500,
    };
  }
}

export async function getEducations() {
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
      include: { educations: { orderBy: { startYear: "desc" } } },
    });

    return { success: true, data: user?.educations || [], statusCode: 200 };
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

export async function updateEducation(id: string, data: EducationData) {
  try {
    const { userId } = await auth();
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const education = await prisma.education.findFirst({
      where: { id, userId: user.id },
    });
    if (!education)
      return { success: false, error: "Education not found", statusCode: 404 };

    const updated = await prisma.education.update({
      where: { id },
      data,
    });

    revalidatePath("/education");

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

export async function deleteEducation(id: string) {
  try {
    const { userId } = await auth();
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const education = await prisma.education.findFirst({
      where: { id, userId: user.id },
    });
    if (!education)
      return { success: false, error: "Education not found", statusCode: 404 };

    await prisma.education.delete({ where: { id } });

    revalidatePath("/education");

    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error("[Education] Delete error:", error);
    return {
      success: false,
      error: "Failed to delete education",
      statusCode: 500,
    };
  }
}
