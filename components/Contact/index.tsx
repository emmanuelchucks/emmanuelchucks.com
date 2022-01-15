import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiCheckCircle, FiInfo } from "react-icons/fi";
import Container from "../Container";
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
    <>
      <FiInfo />
      {error}
    </>
  );

  const SubmitSucceeded = (
    <>
      <FiCheckCircle />
      {"Email sent! I'll get back to you soon."}
    </>
  );

  return (
    <Container
      as="section"
      className="py-24 mb-8 [--input-width:100%] md:[--input-width:60%] lg:[--input-width:55%]"
    >
      <h2 id="contact" className="text-3xl font-bold">
        Contact
      </h2>
      <p className="mt-2">{"Let's get in touch"}</p>

      <form
        className="mt-16 space-y-8"
        onSubmit={
          isSubmitting
            ? (e) => {
                e.preventDefault();
              }
            : handleSubmit(onSubmit)
        }
      >
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
            className={`flex items-center gap-2 px-4 py-2 w-[var(--input-width)] rounded-md md:text-base text-white ${
              error ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {error ? SubmitFailed : SubmitSucceeded}
          </div>
        ) : (
          <button
            type="submit"
            aria-disabled={isSubmitting}
            className={`px-12 py-2 font-semibold transition-opacity bg-black rounded-md text-slate-50 hover:bg-opacity-80 ${
              isSubmitting ? "cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        )}
      </form>
    </Container>
  );
}

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export default Contact;
