"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { reset } from "@/actions/reset"; // Replace with your actual function
import { FormError } from "@/components/auth/formerror";
import { FormSuccess } from "@/components/auth/formsuccess";

const NewPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("Missing token.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await reset({ token, password });
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success || "Password successfully reset!");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md space-y-6">
        <h1 className="text-xl font-semibold text-center">
          Enter a New Password
        </h1>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>

        <button
          onClick={() => router.push("/auth/login")}
          className="w-full text-sm text-gray-600 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};
export default NewPasswordPage;
