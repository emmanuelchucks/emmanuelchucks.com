function Contact() {
  return (
    <div id="contact">
      <h2 className="text-3xl font-bold">Contact</h2>
      <h3>{"Let's get in touch"}</h3>

      <form>
        <InputField id="name" placeholder="Leonardo" />
        <InputField id="email" placeholder="leonardo@email.com" />
        <InputField isTextarea id="message" placeholder="" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

function InputField({ id, placeholder, isTextarea, error }: InputFieldProps) {
  return (
    <div className="block">
      <label htmlFor={id} className="capitalize">
        {id}:
      </label>
      {isTextarea ? (
        <textarea id={id} placeholder={placeholder} className="block" />
      ) : (
        <input id={id} placeholder={placeholder} className="block" />
      )}
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
