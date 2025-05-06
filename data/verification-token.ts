import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await db.verificationToken.findUnique({
      where: { token },
    });
  } catch (error) {
    console.error("Error fetching verification token by token:", error);
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await db.verificationToken.findFirst({
      where: { email },
    });
  } catch (error) {
    console.error("Error fetching verification token by email:", error);
    return null;
  }
};
