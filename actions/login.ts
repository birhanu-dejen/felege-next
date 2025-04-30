"use server";
import z from "zod";
import { loginSchema } from "@/lib/schemas/loginSchema";
export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email or password" };
  }
  return { success: "Login successful" };
};
