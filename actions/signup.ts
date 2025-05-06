"use server";

import z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SignupSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  // Validate incoming data
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email or password" };
  }

  const { email, password, fullName } = validatedFields.data;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "User already exists" };
    }

    // Create user in the database
    await db.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: "USER", // Default role can be dynamic in the future
      },
    });

    // Generate verification token and send verification email
    const verificationToken = await generateVerificationToken(email);

    // Here, splitting the full name for the first name is fine, but you may also want to consider how the name will be displayed
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
