"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { reset } from "@/actions/reset";
import { FormError } from "@/components/auth/formerror";
import { FormSuccess } from "@/components/auth/formsuccess";
import FormWrapper from "@/components/ui/formwrapper";
import { SubmitButton } from "@/components/ui/submitbutton";
import InputField from "@/components/auth/Inputfield";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // ✅ Correct import

const NewPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("Missing token.");
      setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper title="Enter a New Password">
      <form onSubmit={onSubmit} className="space-y-4">
        <InputField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          customInput={
            <span
              onClick={() => !isLoading && setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer text-xl"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          }
        />

        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <SubmitButton isLoading={isLoading}>Reset Password</SubmitButton>
      </form>

      <Link
        href="/auth/login"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 hover:underline mt-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Login
      </Link>
    </FormWrapper>
  );
};

export default NewPasswordPage;
