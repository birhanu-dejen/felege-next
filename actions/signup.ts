"use server";

import z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SignupSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email or password" };
  }

  const { email, password, fullName } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await getUserByEmail(email);
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

    const verificationToken = await generateVerificationToken(email);

    const firstName = fullName?.split(" ")[0] || "User";

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      firstName
    );

    return { success: "Confirmation email sent" };
  } catch (error) {
    console.error("Signup failed: ", error);
    return { error: "Something went wrong, please try again later." };
  }
};
