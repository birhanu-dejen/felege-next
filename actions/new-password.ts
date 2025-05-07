"use server";

import { NewPasswordSchema } from "@/lib/schemas";
import { db } from "@/lib/db"; // your Prisma client
import bcrypt from "bcryptjs";
import { z } from "zod";

type NewPasswordFormValues = z.infer<typeof NewPasswordSchema>;

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Resets the user's password using a provided reset token and new password values.
 *
 * @param values - An object containing the new password to be set.
 * @param token - A string representing the password reset token.
 *
 * @returns An object with either a success message indicating the password was reset
 *          or an error message if any step in the process fails, such as missing token,
 *          invalid password input, or issues during token validation or password update.
 */

/*******  7b35359e-b397-4c26-b782-b2efaf5d2ef4  *******/ export const newPassword =
  async (values: NewPasswordFormValues, token: string | null) => {
    // 1. Check for missing token
    if (!token) {
      return { error: "Token is missing." };
    }

    // 2. Validate password input
    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid password." };
    }

    const { password } = validatedFields.data;

    try {
      // 3. Check if token is valid and not expired
      const existingUser = await getUserByPasswordResetToken(token);
      if (!existingUser) {
        return { error: "Invalid or expired reset token." };
      }

      // 4. Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 5. Update user's password
      await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
      });

      // 6. Delete the reset token
      await deletePasswordResetToken(token);

      return { success: "Your password has been reset successfully!" };
    } catch (error) {
      console.error("Password reset error:", error);
      return { error: "Something went wrong. Please try again." };
    }
  };
