"use server";

import z from "zod";
import { ResetSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email format." };
  }

  const { email } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      const passwordResetToken = await generatePasswordResetToken(email);
      await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
      );
    }

    return {
      success:
        "If this email exists in our system, you'll receive a reset link shortly.",
    };
  } catch (error) {
    console.error("Password reset failed:", error);
    return { error: "Something went wrong. Please try again later." };
  }
};
