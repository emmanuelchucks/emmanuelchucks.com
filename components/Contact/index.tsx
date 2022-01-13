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
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-100 dark:bg-neutral-900"
    >
      <svg
        className="absolute -right-96 top-20 w-[105rem] -rotate-12 fill-white opacity-30 dark:fill-neutral-800"
        viewBox="0 0 64 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M63.5475 3.03522C63.7735 3.71379 63.9996 4.39202 63.9996 5.0706V22.2573C63.9996 24.7448 61.7382 27.0066 59.2504 27.0066H30.9816C28.4941 27.0066 26.2323 24.7452 26.2323 22.2573V5.0706C26.2323 4.39203 26.4584 3.7138 26.6844 3.03522L40.9318 14.7948C43.1931 16.8301 46.8117 16.8301 49.0732 15.0208L63.5463 3.03546L63.5475 3.03522Z" />
        <path d="M30.9824 0.321594H59.2512C60.1558 0.321594 61.2866 0.773736 61.9651 1.22623L47.7178 13.2116C46.361 14.3423 43.8732 14.3423 42.5164 13.2116L28.269 1.22623C28.9476 0.774093 29.8522 0.321594 30.983 0.321594H30.9824Z" />
        <path d="M10.8553 20.9013C9.49854 20.9013 9.49854 22.7106 10.8553 22.7106H22.6149C23.7456 22.7106 23.7456 20.9013 22.6149 20.9013H10.8553ZM11.7596 15.0215C10.4028 15.0215 10.4028 17.0569 11.7596 17.0569H22.6149C23.7456 17.0569 23.7456 15.0215 22.6149 15.0215H11.7596ZM7.68898 17.0567C9.04578 17.0567 9.04578 15.0213 7.68898 15.0213H4.97502C3.61822 15.0213 3.61822 17.0567 4.97502 17.0567H7.68898ZM0.904663 10.2718C-0.226034 10.2718 -0.226034 12.3072 0.904663 12.3072H22.6153C23.746 12.3072 23.746 10.2718 22.6153 10.2718H0.904663ZM9.49854 4.39203C8.36784 4.39203 8.14174 6.42741 9.49854 6.42741H11.986C13.3428 6.42741 13.3428 4.39203 11.986 4.39203H9.49854ZM22.6149 6.42723C23.7456 6.42723 23.7456 4.39185 22.6149 4.39185H15.3781C14.2474 4.39185 14.2474 6.42723 15.3781 6.42723H22.6149Z" />
      </svg>

      <Container className="relative">
        <h2 className="text-3xl font-bold">Contact</h2>
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
              className={`flex items-center gap-2 px-4 py-2 md:max-w-[55%] rounded-md text-sm md:text-base ${
                error
                  ? "text-red-900 bg-red-100 dark:text-red-100 dark:bg-red-700"
                  : "text-green-900 bg-green-100 dark:text-green-100 dark:bg-green-700"
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
    </section>
  );
}

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export default Contact;
