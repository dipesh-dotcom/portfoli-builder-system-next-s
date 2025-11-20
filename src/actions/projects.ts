"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import type { ProjectData } from "@/types/user/projectTypes";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { deleteUploadcareFile } from "@/lib/uploadCare";

async function fetchProjects(userId: string) {
  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: { created_at: "desc" },
  });

  return projects;
}

// cached function
const getCachedProjects = unstable_cache(fetchProjects, ["projects"], {
  revalidate: 3600,
  tags: ["projects"],
});

export async function getProjects() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized", data: [] };
    }

    const projects = await getCachedProjects(session.user.id);
    return { success: true, data: projects, error: null };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, error: "Failed to fetch projects", data: [] };
  }
}

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

    revalidateTag("projects", { expire: 0 });

    return { success: true, data: project, error: null };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project", data: null };
  }
}

// UPDATE
export async function updateProject(id: string, data: ProjectData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized", data: null };
    }

    const existingProject = await prisma.project.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existingProject) {
      return { success: false, error: "Project not found", data: null };
    }

    if (
      existingProject.preview_image &&
      data.preview_image &&
      existingProject.preview_image !== data.preview_image
    ) {
      await deleteUploadcareFile(existingProject.preview_image);
    }

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

    revalidateTag("projects", { expire: 0 });

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

    const existingProject = await prisma.project.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existingProject) {
      return { success: false, error: "Project not found" };
    }

    if (existingProject.preview_image) {
      await deleteUploadcareFile(existingProject.preview_image);
    }

    await prisma.project.delete({
      where: { id },
    });

    revalidateTag("projects", { expire: 0 });

    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
