"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "@/components/auth/Inputfield";
import Link from "next/link";
import { useState, useTransition } from "react";
import { ResetSchema } from "@/lib/schemas";
import { FormError } from "@/components/auth/formerror";
import { FormSuccess } from "@/components/auth/formsuccess";
import { reset } from "@/actions/reset";
type ResetFormValues = z.infer<typeof ResetSchema>;
const ForgotPasswordPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: ResetFormValues) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4 ">
      <div className="max-w-md w-full bg-white p-8   relative">
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
            isPending={isPending}
          />
          <div className="mt-1">
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 mt-2 rounded-md transition-colors cursor-pointer"
          >
            Send reset email
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/auth/login"
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
