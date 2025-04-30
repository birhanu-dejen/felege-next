"use server";
import z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { signupSchema } from "@/lib/schemas/signupSchema";
export const signup = async (values: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email or password" };
  }
  const { email, password, fullName } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "User already exists" };
  }
  await db.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
  });
  return { success: "User created" };
};
