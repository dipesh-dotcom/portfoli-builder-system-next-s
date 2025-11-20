"use server";

import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { cacheTag, revalidateTag, unstable_cache } from "next/cache";

export type UserData = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
};

async function fetchUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return users;
}

// cached function
const getCachedUsers = unstable_cache(fetchUsers, ["users"], {
  revalidate: 3600,
  tags: ["users"],
});

export async function getUsers() {
  try {
    const users = await getCachedUsers();

    return { success: true, data: users || [], statusCode: 200 };
  } catch (error) {
    console.error("[Users] Fetch error:", error);
    return {
      success: false,
      error: "Failed to fetch users",
      data: [],
      statusCode: 500,
    };
  }
}

export async function updateUser(
  id: string,
  data: { role: Role; isActive: boolean }
) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      return { success: false, error: "User not found", statusCode: 404 };

    const updated = await prisma.user.update({
      where: { id },
      data: {
        role: data.role,
        isActive: data.isActive,
      },
    });

    revalidateTag("users", { expire: 0 });

    return { success: true, data: updated, statusCode: 200 };
  } catch (error) {
    console.error("[User] Update error:", error);
    return {
      success: false,
      error: "Failed to update user",
      statusCode: 500,
    };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } });

    revalidateTag("users", { expire: 0 });

    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error("[User] Delete error:", error);
    return {
      success: false,
      error: "Failed to delete user",
      statusCode: 500,
    };
  }
}
