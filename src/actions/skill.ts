"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";

export type SkillData = {
  skillName: string;
  rating: number;
};

export async function createSkill(data: SkillData) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    let user = await prisma.user.findUnique({ where: { id: userId } });

    const skill = await prisma.skill.create({
      data: {
        userId: userId,
        ...data,
      },
    });

    revalidatePath("/skill");

    return { success: true, data: skill, statusCode: 201 };
  } catch (error) {
    console.error("[Skill] Create error:", error);
    return {
      success: false,
      error: "Failed to create skill",
      statusCode: 500,
    };
  }
}

export async function getSkills() {
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
      include: { skills: { orderBy: { rating: "desc" } } },
    });

    return { success: true, data: user?.skills || [], statusCode: 200 };
  } catch (error) {
    console.error("[Skill] Fetch error:", error);
    return {
      success: false,
      error: "Failed to fetch skills",
      data: [],
      statusCode: 500,
    };
  }
}

export async function updateSkill(id: string, data: SkillData) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const skill = await prisma.skill.findFirst({
      where: { id, userId: user.id },
    });
    if (!skill)
      return { success: false, error: "Skill not found", statusCode: 404 };

    const updated = await prisma.skill.update({
      where: { id },
      data,
    });

    revalidatePath("/skill");

    return { success: true, data: updated, statusCode: 200 };
  } catch (error) {
    console.error("[Skill] Update error:", error);
    return {
      success: false,
      error: "Failed to update skill",
      statusCode: 500,
    };
  }
}

export async function deleteSkill(id: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId)
      return { success: false, error: "Unauthorized", statusCode: 401 };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const skill = await prisma.skill.findFirst({
      where: { id, userId: user.id },
    });
    if (!skill)
      return { success: false, error: "Skill not found", statusCode: 404 };

    await prisma.skill.delete({ where: { id } });

    revalidatePath("/skill");

    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error("[Skill] Delete error:", error);
    return {
      success: false,
      error: "Failed to delete skill",
      statusCode: 500,
    };
  }
}
