"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FormError } from "@/components/auth/formerror";
import { FormSuccess } from "@/components/auth/formsuccess";
import { newVerification } from "@/actions/new-verification";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import withSearchParams from "@/utils/withsearchparams";

const NewVerificationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Verification token is missing.");
      setIsPending(false);
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success || "Your account has been verified!");
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-6">
          Confirm Your Email Verification
        </h1>

        {!error && !success && (
          <div className="flex justify-center mb-6">
            <BeatLoader color="#4F46E5" loading={isPending} size={16} />
          </div>
        )}

        <div className="space-y-6">
          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withSearchParams(NewVerificationPage);
