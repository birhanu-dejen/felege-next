"use client";
import z from "zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/schemas/signupSchema";
import { FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import InputField from "@/components/authform/InputField";
import SocialButton from "@/components/authform/SocialsButton";
import { FormError } from "@/components/authform/FormError";
import { FormSuccess } from "@/components/authform/FormSucess";
import { signup } from "@/actions/signup";
type signupFormValues = z.infer<typeof signupSchema>;
const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = (values: signupFormValues) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      signup(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className="flex justify-center bg-white px-4 py-6 md:py-2">
      <div className="w-full max-w-md bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create your account
        </h2>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <InputField
            label="Full Name"
            name="fullName"
            type="text"
            required
            placeholder="Enter your full name"
            register={register}
            error={errors.fullName?.message}
            isPending={isPending}
          />

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
            placeholder="Create a password"
            register={register}
            error={errors.password?.message}
            isPending={isPending}
            customInput={
              <span
                onClick={() => !isPending && setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer text-xl"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            }
          />
          <p className="text-xs text-gray-500 mt-1">
            Between 8 and 72 characters
          </p>

          {/* Always visible feedback section */}
          <div className="space-y-2">
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2 rounded-md transition text-white ${
              isPending
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            {isPending ? "Processing..." : "Join for Free"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="space-y-3">
          <SocialButton Icon={FcGoogle} text="Continue with Google" />
          <SocialButton
            Icon={FaFacebook}
            text="Continue with Facebook"
            color="text-blue-600"
          />
          <SocialButton
            Icon={FaApple}
            text="Continue with Apple"
            color="text-gray-800"
          />
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already on FelegeHiwot?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>

        <p className="text-xs text-gray-500 text-center mt-4">
          I accept FelegeHiwot&apos;s{" "}
          <a href="#" className="underline">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Notice
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
