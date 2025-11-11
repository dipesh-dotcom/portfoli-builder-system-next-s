"use server";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { RegisterSchema } from "@/validations/auth/auth-schema";
import { ZodError } from "zod";

export async function registerUser(formData: FormData) {
  try {
    const data = RegisterSchema.parse({
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString() || "",
    });

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      return {
        success: false,
        message: "User already exists with this email",
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    console.log("Created user:", user);

    return {
      success: true,
      message: "User registered. Please verify your email.",
      userId: user.id,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.issues.forEach((err) => {
        if (err.path?.[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      return { success: false, errors: fieldErrors };
    }
    console.error(error);
    return { success: false, message: "Something went wrong." };
  }
}
