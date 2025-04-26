"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { loginSchema } from "@/app/lib/loginSchema";
import InputField from "@/app/_components/form/InputField";
import SocialButton from "@/app/_components/form/SocialsButton";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data ✅", data);
    alert("Login successful!");
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
              customInput={
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer text-xl"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              }
            />
            <a
              href="#"
              className="text-sm text-indigo-600 hover:underline mt-1 inline-block"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            Login
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
          New to FelegeHiwot?{" "}
          <a href="/auth/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
