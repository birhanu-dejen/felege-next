"use client";
import z from "zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/lib/schemas";
import { FiEye, FiEyeOff } from "react-icons/fi";
import InputField from "@/components/auth/Inputfield";
import Social from "@/components/auth/social";
import { FormError } from "@/components/auth/formerror";
import { FormSuccess } from "@/components/auth/formsuccess";
import { signup } from "@/actions/signup";
import DividerWithText from "@/components/auth/divider";
import { SubmitButton } from "@/components/auth/formbutton";
import FormWrapper from "@/components/auth/formwrapper";
type SignupFormValues = z.infer<typeof SignupSchema>;

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: SignupFormValues) => {
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
    <FormWrapper title="Create your account">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Name"
          name="name"
          type="text"
          required
          placeholder="Enter your name"
          register={register}
          error={errors.name?.message}
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

        <div className="mt-1">
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </div>
        <SubmitButton isLoading={isPending}>Join for Free</SubmitButton>
      </form>

      <DividerWithText text="or" />
      <Social />

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
    </FormWrapper>
  );
};

export default SignUpPage;
