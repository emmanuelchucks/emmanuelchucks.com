import {
  FieldError,
  Path,
  useForm,
  UseFormRegister,
  ValidationRule,
} from "react-hook-form";
import { FiCheckCircle } from "react-icons/fi";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(console.log(data));
      }, 2000);
    });
  };

  return (
    <div id="contact" className="px-4 mx-auto lg:max-w-4xl">
      <h2 className="text-3xl font-bold">Contact</h2>
      <h3>{"Let's get in touch"}</h3>

      <form className="my-16 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="name"
          placeholder="Leonardo"
          register={register}
          error={errors.name}
          required
        />
        <InputField
          type="email"
          label="email"
          placeholder="leonardo@email.com"
          register={register}
          error={errors.email}
          pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
          required
        />
        <InputField
          isTextarea
          label="message"
          placeholder=""
          register={register}
          error={errors.message}
        />

        {isSubmitSuccessful ? (
          <div
            role="alert"
            className="flex items-center gap-2 px-4 py-2 text-green-800 bg-green-100 md:max-w-[60%]"
          >
            <FiCheckCircle />
            {"Email sent! I'll get back to you soon."}
          </div>
        ) : (
          <button
            type="submit"
            aria-disabled={isSubmitting}
            disabled={isSubmitting}
            className="px-12 py-2 font-semibold transition-colors bg-gray-900 rounded-md text-gray-50 hover:opacity-80 disabled:opacity-40"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        )}
      </form>
    </div>
  );
}

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

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default Contact;
