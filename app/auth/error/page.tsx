"use client";

import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();

  return (
    <main
      role="alert"
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
    >
      <section className="w-full max-w-md text-center bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold text-red-600 mb-2">
          Authentication Failed
        </h1>
        <p className="text-gray-700 text-sm mb-6">
          We couldn&apos;t complete the sign-in process. Please try again or
          contact support if the issue continues.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Return Home
          </button>
          <button
            onClick={() => router.refresh()}
            className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
          >
            Try Again
          </button>
        </div>
      </section>
    </main>
  );
}
