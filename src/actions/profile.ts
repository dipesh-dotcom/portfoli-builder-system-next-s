"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { deleteUploadcareFile } from "@/lib/uploadCare";
import { ProfileUpdateData } from "@/types/user/userTypes";

export async function getProfile() {
  const session = await auth();

  if (!session || !session.user?.email) {
    throw new Error("unauthorized");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email,
      },
      include: { profile: true },
    });

    if (!user) {
      return { success: false, error: "User not foundz" };
    }
    return {
      success: true,
      data: {
        name: user.name,
        email: user.email,
        avatar_url: user.image ?? "",
        bio: user.profile?.bio ?? "",
        location: user.profile?.location ?? "",
        occupation: user.profile?.occupation ?? "",
        joined_date: user.profile?.joined_date?.toISOString() ?? "",
      },
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, error: "Failed to fetch profile" };
  }
}

export async function updateProfile(data: ProfileUpdateData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  try {
    // update user info
    const updatedUser = await prisma.user.update({
      where: { email: session.user?.email },
      data: {
        name: data.name,
        email: data.email,
      },
    });

    //upsert user profile (create if not exist)
    const updateUserProfile = await prisma.userProfile.upsert({
      where: { userId: updatedUser.id },
      update: {
        bio: data.bio,
        location: data.location,
        occupation: data.occupation,
      },
      create: {
        userId: updatedUser.id,
        bio: data.bio || "",
        location: data.location || "",
        occupation: data.occupation || "",
      },
    });
    return {
      success: true,
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
        avatar_url: updatedUser.image,
        bio: updateUserProfile.bio,
        location: updateUserProfile.location,
        occupation: updateUserProfile.occupation,
        joined_date: updateUserProfile.joined_date?.toISOString() || "",
      },
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function uploadAvater(avatarUrl: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");
    const existingUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    // Delete old image from Uploadcare if it's being replaced with a new one
    if (existingUser?.image && avatarUrl && existingUser.image !== avatarUrl) {
      await deleteUploadcareFile(existingUser.image);
    }

    // Delete old image if preview_image is being removed (set to null/empty)
    if (existingUser?.image && (!avatarUrl || avatarUrl === "")) {
      await deleteUploadcareFile(existingUser.image);
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { image: avatarUrl }, // save URL to DB
    });
    return { success: true, data: user };
  } catch (error) {
    console.error("Error updating avatar:", error);
    return { success: false, error: "Failed to update avatar" };
  }
}

export async function getProfileStats() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        projects: true,
        educations: true,
        skills: true,
      },
    });

    if (!user) return { success: false, error: "User not found" };

    return {
      success: true,
      data: {
        projects: user.projects.length,
        education: user.educations.length,
        skills: user.skills.length,
      },
    };
  } catch (err) {
    console.error("Error fetching stats:", err);
    return { success: false, error: "Failed to fetch stats" };
  }
}
