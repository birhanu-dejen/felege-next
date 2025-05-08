"use server";

import { NewPasswordSchema } from "@/lib/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getPasswordResetTokenByToken } from "@/data/reset-token";
import { getUserByEmail } from "@/data/user";

type NewPasswordFormValues = z.infer<typeof NewPasswordSchema>;

type PasswordResetResponse = {
  success?: string;
  error?: string;
};

const MAX_ATTEMPTS = 5;

export const newPassword = async (
  values: NewPasswordFormValues,
  token: string | null
): Promise<PasswordResetResponse> => {
  if (!token) {
    return { error: "Reset token is missing." };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid input. Please check your password requirements." };
  }

  const { password } = validatedFields.data;

  try {
    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "This reset token is invalid or has already been used." };
    }

    if (existingToken.attempts >= MAX_ATTEMPTS) {
      return { error: "Too many reset attempts. This token has been locked." };
    }

    if (new Date(existingToken.expires) < new Date()) {
      return { error: "This reset token has expired." };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
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
    try {
      await db.passwordResetToken.update({
        where: { id: (await getPasswordResetTokenByToken(token))?.id ?? "" },
        data: { attempts: { increment: 1 } },
      });
    } catch (updateError) {
      console.error("Failed to increment reset attempts:", updateError);
    }

    console.error("Password reset error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
};
