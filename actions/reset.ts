"use server";
import z from "zod";
import { ResetSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
//import { rateLimit } from "@/lib/rate-limit";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  // 1. Rate limiting
  // const { success: isAllowed } = await rateLimit.limit(values.email);
  //if (!isAllowed) {
  //return { error: "Too many attempts. Try again later." };
  //}

  // 2. Validation
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email format" };
  }

  // 3. User lookup (silent fail for security)
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    console.log(`Password reset attempt for non-existent email: ${email}`);
  }

  // 4. Token + Email
  try {
    const token = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(token.email, token.token);
    return { success: "Reset email sent" };
  } catch (error) {
    console.error("Password reset failed:", error);
    return { error: "Failed to send reset email. Contact support." };
  }
};
