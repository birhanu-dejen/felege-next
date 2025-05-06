"use server";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
      return { error: "Verification token does not exist or is invalid." };
    }

    // Check if the token has expired
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { error: "Verification token has expired." };
    }

    // Check if the user exists
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
      return { error: "User not found with this email." };
    }

    // Update email verification status
    await db.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date() },
    });

    // Delete the verification token as it has been used
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Your email has been successfully verified!" };
  } catch (error) {
    console.error("Error verifying email:", error);
    return {
      error: "An error occurred during verification. Please try again.",
    };
  }
};
