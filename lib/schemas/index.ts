import { z } from "zod";
export const SignupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters")
    .max(72, "Password must be 72 characters or less"),
});
export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, "Password is required"),
});
export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});
export const NewPasswordSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, "Password is required"),
});
