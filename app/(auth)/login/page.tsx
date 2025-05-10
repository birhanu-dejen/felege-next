"use client";

"use client";
import { useRouter } from "next/navigation";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { login } from "@/actions/login";
import { LoginSchema } from "@/lib/schemas";

import InputField from "@/components/auth/Inputfield";
import { FormError } from "@/components/auth/formerror";
import { FormSuccess } from "@/components/auth/formsuccess";
import Social from "@/components/auth/social";
import FormWrapper from "@/components/ui/formwrapper";
import { SubmitButton } from "@/components/ui/submitbutton";
import DividerWithText from "@/components/ui/divider";

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already registered with a different sign-in method. Use your password to log in or delete your account to switch to Google."
      : undefined;

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>(urlError);
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = (values: LoginFormValues) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(
          typeof data?.success === "string" ? data.success : undefined
        );
        if (data?.success === true) {
          router.push("/dashboard");
        }
      });
    });
  };

  return (
    <FormWrapper title="Welcome back">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          label="Email"
          name="email"
          type="email"
          required
          placeholder="name@email.com"
          register={register}
          error={errors.email?.message}
          isPending={isPending}
        />

        <InputField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Enter your password"
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

        <Link
          href="/reset"
          className={`text-sm text-indigo-600 hover:underline mt-1 inline-block ${
            isPending ? "pointer-events-none opacity-70" : ""
          }`}
        >
          Forgot password?
        </Link>

        {error && <FormError message={error || urlError} />}
        {success && <FormSuccess message={success} />}

        <SubmitButton isLoading={isPending}>Login</SubmitButton>
      </form>

      <DividerWithText text="or" />

      <Social />

      <p className="text-center text-sm text-muted-foreground mt-6">
        New to FelegeHiwot?{" "}
        <Link
          href="/signup"
          className={`text-indigo-600 hover:underline ${
            isPending ? "pointer-events-none opacity-70" : ""
          }`}
        >
          Sign up
        </Link>
      </p>
    </FormWrapper>
  );
}
