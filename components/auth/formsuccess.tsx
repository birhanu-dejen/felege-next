import { CheckCircle } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="bg-green-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-600"
    >
      <CheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
