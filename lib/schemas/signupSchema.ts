import { z } from "zod";

export type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
};

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be 72 characters or less"),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
