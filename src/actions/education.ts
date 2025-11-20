"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cacheTag, revalidateTag, unstable_cache } from "next/cache";

export type EducationData = {
  instituteName: string;
  degree: string;
  startYear: number;
  endYear: number;
};

async function fetchEducations(userId: string) {
  const educations = await prisma.education.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return educations;
}

// cached function
const getCachedEducations = unstable_cache(fetchEducations, ["educations"], {
  revalidate: 3600,
  tags: ["educations"],
});

export async function createEducation(data: EducationData) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const education = await prisma.education.create({
      data: {
        userId: userId,
        ...data,
      },
    });

    revalidateTag("educations", { expire: 0 });

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
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return {
        success: false,
        error: "Unauthorized",
        data: [],
        statusCode: 401,
      };

    const educations = await getCachedEducations(userId);

    return { success: true, data: educations || [], statusCode: 200 };
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
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { id: userId } });
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

    revalidateTag("educations", { expire: 0 });

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
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const education = await prisma.education.findFirst({
      where: { id, userId: user.id },
    });
    if (!education)
      return { success: false, error: "Education not found", statusCode: 404 };

    await prisma.education.delete({ where: { id } });

    revalidateTag("educations", { expire: 0 });

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
