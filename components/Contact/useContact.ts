import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from ".";

function useContact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormInput>();

  const [serverError, setServerError] = useState<string>();

  const onSubmit = async (data: FormInput) => {
    const response = await fetch("/api/sendgrid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const { error } = await response.json();
    setServerError(error);
  };

  const submit = handleSubmit(onSubmit);

  return {
    register,
    submit,
    errors,
    serverError,
    isSubmitting,
    isSubmitSuccessful,
  };
}

export default useContact;
