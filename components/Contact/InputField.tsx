import {
  FieldError,
  Path,
  UseFormRegister,
  ValidationRule,
} from "react-hook-form";
import type { FormData } from "./";

function InputField({
  type,
  label,
  register,
  required,
  placeholder,
  isTextarea,
  error,
  pattern,
}: InputFieldProps) {
  const Component = isTextarea ? "textarea" : "input";
  const errorMessage =
    (error?.type === "required" && "This field is required") ||
    (error?.type === "pattern" && "Please enter a valid email address");

  return (
    <div className="block space-y-2">
      <label htmlFor={label} className="capitalize">
        {label}:{" "}
        <span className="text-red-600 dark:text-red-400" aria-hidden>
          {required ? "*" : ""}
        </span>
      </label>
      <Component
        {...register(label, { required, pattern })}
        id={label}
        type={type}
        placeholder={placeholder}
        aria-required={required ? "true" : "false"}
        aria-describedby={`${label}-error-message`}
        aria-invalid={error ? "true" : "false"}
        className={`block px-2 py-1 border-2 rounded-md w-[var(--input-width)] ${
          errorMessage
            ? "border-red-600 dark:border-red-400 dark:border-opacity-100"
            : "dark:border-opacity-30"
        } ${isTextarea ? "h-32" : ""}`}
      />
      <span
        id={`${label}-error-message`}
        className="text-sm text-red-600 dark:text-red-400"
      >
        {errorMessage}
      </span>
    </div>
  );
}

type InputFieldProps = {
  register: UseFormRegister<FormData>;
  label: Path<FormData>;
  type?: string;
  error?: FieldError;
  placeholder: string;
  isTextarea?: boolean;
  pattern?: ValidationRule<RegExp>;
  required?: ValidationRule<boolean>;
};

export default InputField;
