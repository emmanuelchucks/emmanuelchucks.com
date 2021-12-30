import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiCheckCircle, FiInfo } from "react-icons/fi";
import InputField from "./InputField";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>();

  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/sendgrid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const { error } = await response.json();
    setError(error);
  };

  const SubmitFailed = (
    <div
      role="alert"
      className="flex items-center gap-2 px-4 py-2 md:max-w-[60%] text-rose-900 bg-rose-100"
    >
      <FiInfo />
      Something went wrong. Please try again.
    </div>
  );

  const SubmitSucceeded = (
    <div
      role="alert"
      className="text-green-900 bg-green-100 flex items-center gap-2 px-4 py-2 md:max-w-[60%]"
    >
      <FiCheckCircle />
      {"Email sent! I'll get back to you soon."}
    </div>
  );

  return (
    <div id="contact" className="container px-4 mx-auto lg:max-w-4xl">
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
          error ? (
            SubmitFailed
          ) : (
            SubmitSucceeded
          )
        ) : (
          <button
            type="submit"
            aria-disabled={isSubmitting}
            disabled={isSubmitting}
            className="px-12 py-2 font-semibold transition-opacity bg-gray-900 rounded-md text-gray-50 hover:opacity-90 disabled:opacity-40"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        )}
      </form>
    </div>
  );
}

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export default Contact;
