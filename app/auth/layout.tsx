import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center bg-white px-4 ">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
