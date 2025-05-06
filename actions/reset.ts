"use server";
import z from "zod";
import { ResetSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

type ResetFormValues = z.infer<typeof ResetSchema>;

export const reset = async (values: ResetFormValues) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields) {
    return { error: "invalid email" };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "email not found" };
  }
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "reset email sent" };
};
