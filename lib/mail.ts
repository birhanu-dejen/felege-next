import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || "no-reply@example.com";

/**
 * Sends a password reset email.
 */
export const sendPasswordResetEmail = async (
  email: string,
  token: string
): Promise<void> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/auth/new-password?token=${token}`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: sans-serif; font-size: 16px; color: #333;">
          <p>Hello,</p>
          <p>You requested to reset your password. Click the button below:</p>
          <a href="${resetLink}" style="padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
          <p>If you did not request this, please ignore this message.</p>
        </div>
      `,
      text: `Reset your password: ${resetLink}`,
    });
  } catch (error) {
    console.error("[SEND_PASSWORD_RESET_EMAIL_ERROR]", error);
    throw new Error("Failed to send password reset email");
  }
};

/**
 * Sends an email verification link.
 */
export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string = "User"
): Promise<void> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Confirm Your Email",
      html: `
        <div style="font-family: sans-serif; font-size: 16px; color: #333;">
          <p>Hello ${name},</p>
          <p>Thanks for signing up for FelegeHiowot.</p>
          <p>Please confirm your email by clicking the button below:</p>
          <a href="${confirmLink}" style="padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px;">Confirm Email</a>
          <p>If you did not create an account, you can ignore this message.</p>
        </div>
      `,
      text: `Confirm your email: ${confirmLink}`,
    });
  } catch (error) {
    console.error("[SEND_VERIFICATION_EMAIL_ERROR]", error);
    throw new Error("Failed to send verification email");
  }
};
