import { FieldError, Path, useForm, UseFormRegister } from "react-hook-form";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

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
          required
        />
        <InputField
          isTextarea
          label="message"
          placeholder=""
          register={register}
          error={errors.message}
        />
        <button
          type="submit"
          className="px-8 py-2 font-semibold bg-gray-900 rounded-md text-gray-50 hover:bg-gray-700"
        >
          Send
        </button>
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
}: InputFieldProps) {
  const Component = isTextarea ? "textarea" : "input";

  return (
    <div className="block space-y-2">
      <label htmlFor={label} className="capitalize">
        {label}:{" "}
        <span className="text-red-600" aria-hidden>
          {required ? "*" : ""}
        </span>
      </label>

      <Component
        {...register(label, { required })}
        type={type}
        placeholder={placeholder}
        className={`block w-full px-2 py-1 border-2 rounded-md md:w-1/2 peer invalid:border-red-600 required:text-red-600 ${
          isTextarea ? "h-32" : ""
        }`}
      />

      <div className="text-sm peer-invalid:text-red-600">{error?.message}</div>
    </div>
  );
}

type InputFieldProps = {
  register: UseFormRegister<FormData>;
  type?: string;
  label: Path<FormData>;
  error?: FieldError;
  placeholder: string;
  isTextarea?: boolean;
  required?: boolean;
};

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default Contact;
