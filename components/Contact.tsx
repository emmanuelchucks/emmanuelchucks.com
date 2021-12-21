function Contact() {
  return (
    <div id="contact">
      <h2 className="text-3xl font-bold">Contact</h2>
      <h3>{"Let's get in touch"}</h3>

      <form className="my-16 space-y-4">
        <InputField id="name" placeholder="Leonardo" />
        <InputField id="email" placeholder="leonardo@email.com" />
        <InputField isTextarea id="message" placeholder="" />
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

function InputField({ id, placeholder, isTextarea, error }: InputFieldProps) {
  const Component = isTextarea ? "textarea" : "input";

  return (
    <div className="block space-y-2">
      <label htmlFor={id} className="capitalize">
        {id}:
      </label>
      <Component
        id={id}
        placeholder={placeholder}
        className={`block w-full px-2 py-1 border-2 rounded-md md:w-1/2 ${
          isTextarea ? "h-32" : ""
        }`}
      />
      <span>{error}</span>
    </div>
  );
}

type InputFieldProps = {
  id: string;
  error?: string;
  placeholder: string;
  isTextarea?: boolean;
  isRequired?: boolean;
};

export default Contact;
