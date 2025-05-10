"use server";
import { NewPasswordSchema } from "@/lib/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getPasswordResetTokenByToken } from "@/data/reset-token";
import { getUserByEmail } from "@/data/user";

type NewPasswordFormValues = z.infer<typeof NewPasswordSchema>;

export const newPassword = async (
  values: NewPasswordFormValues,
  token: string | null
) => {
  if (!token) {
    console.error("Reset token is missing");
    return { error: "Reset token is missing." };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    console.error("Invalid input:", validatedFields.error);
    return { error: "Invalid input. Please check your password requirements." };
  }

  const { password } = validatedFields.data;

  try {
    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      console.error("Invalid or expired token");
      return { error: "This reset token is invalid or has already been used." };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      console.error("Token has expired");
      return { error: "This reset token has expired." };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
      console.error("No user found for this reset request");
      return { error: "No user found for this reset request." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Your password has been reset successfully." };
  } catch (error) {
    console.error("Password reset error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
};
