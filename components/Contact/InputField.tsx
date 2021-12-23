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
        <span className="text-red-600" aria-hidden>
          {required ? "*" : ""}
        </span>
      </label>

      <Component
        {...register(label, { required, pattern })}
        id={label}
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        className={`block w-full px-2 py-1 border-2 rounded-md md:w-[60%] ${
          errorMessage ? "outline-red-600 border-red-600" : ""
        } ${isTextarea ? "h-32" : ""}`}
      />

      {errorMessage && (
        <span role="alert" className="text-sm text-red-600">
          {errorMessage}
        </span>
      )}
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
