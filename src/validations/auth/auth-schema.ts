import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().regex(emailRegex, "Invalid email format"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        passwordRegex,
        "Password must be 8+ chars with uppercase, lowercase, number & special character"
      ),
  })

  .refine((data) => data.email, {
    message: "Email is required",
    path: ["email"],
  });

export const LoginSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
});

export const passwordValidation = z.object({
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must be 8+ chars with uppercase, lowercase, number & special character"
    ),
});
