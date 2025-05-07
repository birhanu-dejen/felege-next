import { Spinner } from "@/components/ui/spinner";

export function SubmitButton({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-2 rounded-md transition text-white flex justify-center items-center ${
        isLoading
          ? "bg-indigo-400 cursor-not-allowed opacity-70"
          : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
      }`}
    >
      {isLoading && <Spinner className="mr-2 h-4 w-4" />}
      {isLoading ? "Processing..." : children}
    </button>
  );
}
