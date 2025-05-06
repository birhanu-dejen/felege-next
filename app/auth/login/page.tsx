"use client";
import { login } from "@/actions/login";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Social from "@/components/auth/social";

import { LoginSchema } from "@/lib/schemas";
import InputField from "@/components/auth/Inputfield";

import { FormError } from "@/components/auth/formerror";
import { FormSuccess } from "@/components/auth/formsuccess";
import { useSearchParams } from "next/navigation";

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

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

  const onSubmit = (values: LoginFormValues) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className="flex justify-center bg-white px-4 py-6 md:py-2">
      <div className="w-full max-w-md bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome back
        </h2>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
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

          <div>
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
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer text-xl"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              }
            />
            <Link
              href="/auth/forgot-password"
              className={`text-sm text-indigo-600 hover:underline mt-1 inline-block ${
                isPending ? "pointer-events-none opacity-70" : ""
              }`}
            >
              Forgot password?
            </Link>
          </div>

          {error && (
            <div className="mt-1">
              <FormError message={error || urlError} />
            </div>
          )}

          {success && (
            <div className="mt-1">
              <FormSuccess message={success} />
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2 rounded-md transition text-white ${
              isPending
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            {isPending ? "Processing..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="space-y-3">
          <Social />
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
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
      </div>
    </div>
  );
}
