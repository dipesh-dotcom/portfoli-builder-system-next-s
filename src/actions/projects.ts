"use server";

import { revalidatePath } from "next/cache";
import type { ProjectData } from "@/types/user/projectTypes";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { deleteUploadcareFile } from "@/lib/uploadCare";

// CREATE
export async function createProject(data: ProjectData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized", data: null };
    }

    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        github_url: data.github_url || null,
        demo_url: data.demo_url || null,
        preview_image: data.preview_image || null,
        userId: session.user.id,
      },
    });

    revalidatePath("/projects");

    return { success: true, data: project, error: null };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project", data: null };
  }
}

// READ - Get all projects for current user
export async function getProjects() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized", data: [] };
    }

    const projects = await prisma.project.findMany({
      where: { userId: session.user.id },
      orderBy: { created_at: "desc" },
    });

    return { success: true, data: projects, error: null };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, error: "Failed to fetch projects", data: [] };
  }
}

// UPDATE
export async function updateProject(id: string, data: ProjectData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized", data: null };
    }

    // Verify ownership and get existing project
    const existingProject = await prisma.project.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingProject) {
      return { success: false, error: "Project not found", data: null };
    }

    // Delete old image from Uploadcare if it's being replaced with a new one
    if (
      existingProject.preview_image &&
      data.preview_image &&
      existingProject.preview_image !== data.preview_image
    ) {
      await deleteUploadcareFile(existingProject.preview_image);
    }

    // Delete old image if preview_image is being removed (set to null/empty)
    if (
      existingProject.preview_image &&
      (!data.preview_image || data.preview_image === "")
    ) {
      await deleteUploadcareFile(existingProject.preview_image);
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        github_url: data.github_url || null,
        demo_url: data.demo_url || null,
        preview_image: data.preview_image || null,
      },
    });

    revalidatePath("/projects");

    return { success: true, data: project, error: null };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project", data: null };
  }
}

// DELETE
export async function deleteProject(id: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Verify ownership and get existing project
    const existingProject = await prisma.project.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingProject) {
      return { success: false, error: "Project not found" };
    }

    // Delete image from Uploadcare if it exists
    if (existingProject.preview_image) {
      await deleteUploadcareFile(existingProject.preview_image);
    }

    // Delete project from database
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/projects");

    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
