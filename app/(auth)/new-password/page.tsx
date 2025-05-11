"use client";

import { useState, useTransition } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "@/components/auth/Inputfield";
import Link from "next/link";
import { NewPasswordSchema } from "@/lib/schemas";
import { FormError } from "@/components/auth/formerror";
import { FormSuccess } from "@/components/auth/formsuccess";
import { newPassword } from "@/actions/new-password";
import FormWrapper from "@/components/auth/formwrapper";
import { SubmitButton } from "@/components/auth/formbutton";
import { useSearchParams } from "next/navigation";
import withSearchParams from "@/utils/withsearchparams";
type NewPasswordFormValues = z.infer<typeof NewPasswordSchema>;

const NewPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const { register, handleSubmit } = form;
  const onSubmit = (values: NewPasswordFormValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <FormWrapper title="New Password">
      <p className="text-center text-gray-600 mb-6">Enter a new password</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Password"
          name="password"
          placeholder="******"
          register={register}
          required
          isPending={isPending}
        />

        <div className="mb-4">
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </div>

        <SubmitButton isLoading={isPending}>Change Password</SubmitButton>
      </form>

      <div className="text-center mt-6">
        <Link href="/login" className="text-indigo-600 hover:underline text-sm">
          Back to Login
        </Link>
      </div>
    </FormWrapper>
  );
};

export default withSearchParams(NewPasswordPage);
