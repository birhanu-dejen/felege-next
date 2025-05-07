"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import React from "react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type Provider = "google" | "apple";

interface SocialProviderConfig {
  provider: Provider;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  color?: string;
}

const SOCIAL_PROVIDERS: SocialProviderConfig[] = [
  {
    provider: "google",
    icon: FcGoogle,
    text: "Continue with Google",
  },
  {
    provider: "apple",
    icon: FaApple,
    text: "Continue with Apple",
    color: "text-gray-800",
  },
];

const Social = () => {
  const handleSignIn = (provider: Provider) => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="space-y-3">
      {SOCIAL_PROVIDERS.map(({ provider, icon: Icon, text, color }) => (
        <button
          key={provider}
          onClick={() => handleSignIn(provider)}
          className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer"
        >
          <Icon className={`w-6 h-6 ${color || ""}`} />
          <span>{text}</span>
        </button>
      ))}
    </div>
  );
};

export default Social;
