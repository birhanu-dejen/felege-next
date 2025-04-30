"use client";

import { useForm } from "react-hook-form";
import InputField from "@/components/authform/InputField"; // <- Corrected import path
import Link from "next/link";

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4 ">
      <div className="max-w-md w-full bg-white p-8   relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600  cursor-pointer"
          onClick={() => history.back()}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-2">Forgot password</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter the email address you use on FelegeHiwot. We&apos;ll send you a
          link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="name@email.com"
            register={register}
            required
            error={errors.email?.message || null}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 mt-2 rounded-md transition-colors cursor-pointer"
          >
            Reset Password
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <button
            type="button"
            className="w-full border border-indigo-600 text-indigo-600 hover:bg-blue-50 py-2 rounded-md transition-colors cursor-pointer"
          >
            Email me a login link
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-indigo-600 hover:underline text-sm"
          >
            Back to Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
