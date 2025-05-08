"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";
import { NewPasswordSchema } from "@/lib/schemas";
import { newPassword } from "@/actions/new-password";
import InputField from "@/components/auth/Inputfield";
import { FormError } from "@/components/auth/formerror";
import { FormSuccess } from "@/components/auth/formsuccess";
import FormWrapper from "@/components/ui/formwrapper";
import { SubmitButton } from "@/components/ui/submitbutton";
type NewPasswordFormValues = z.infer<typeof NewPasswordSchema>;
export default function NewPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: NewPasswordFormValues) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <FormWrapper title="Reset Your Password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          label="New Password"
          name="password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Create a strong password"
          register={register}
          error={errors.password?.message}
          isPending={isPending}
          customInput={
            <span
              onClick={() => !isPending && setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground cursor-pointer text-xl"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          }
        />

        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}

        <SubmitButton isLoading={isPending}>Reset Password</SubmitButton>
      </form>

      <Link
        href="/auth/login"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-indigo-600 hover:underline mt-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Login
      </Link>
    </FormWrapper>
  );
}
