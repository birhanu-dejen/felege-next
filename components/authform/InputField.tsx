import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { ReactNode } from "react";

interface InputFieldProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string | null;
  required?: boolean;
  className?: string;
  customInput?: ReactNode;
  isPending?: boolean; // New prop
}

const InputField = <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder = "",
  register,
  error = null,
  required = false,
  className = "",
  customInput,
  isPending = false, // Default to false
}: InputFieldProps<T>) => {
  const inputClasses = `w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 transition-colors ${
    error
      ? "border-red-500 focus:ring-red-200"
      : "border-gray-300 focus:border-indigo-600 focus:ring-indigo-200"
  } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium text-gray-700 mb-1 ${
            isPending ? "opacity-70" : ""
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          className={inputClasses}
          disabled={isPending}
          {...register(name)}
        />
        {customInput}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
