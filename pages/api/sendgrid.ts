import sendgrid from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";
import type { FormInput } from "../../components/Contact";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  const { email, name, message } = req.body as FormInput;

  if (!name.trim()) {
    return res.status(400).json({ error: "Missing name" });
  } else if (!email.trim()) {
    return res.status(400).json({ error: "Missing email" });
  }

  try {
    await sendgrid.send({
      to: "echucks19@gmail.com",
      from: "contact@emmanuelchucks.com",
      subject: "Website Contact Form",
      text: JSON.stringify({ name, email, message }, null, 2),
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
