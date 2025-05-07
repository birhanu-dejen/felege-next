"use server";

import z from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/lib/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email or password format" };
  }

  const { email, password } = validatedFields.data;

  // Check if user exists early and return early
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  // Validate that the user has a password
  if (!existingUser.password) {
    return { error: "User account is invalid" };
  }
  if (!existingUser.email) {
    return { error: "User email is invalid" };
  }
  // If email is not verified, send the verification token
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid credentials" };
    }

    // Log unexpected errors
    console.error("Unexpected error during login:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
};
