import sendgrid from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  try {
    await sendgrid.send({
      to: "echucks19@gmail.com",
      from: "contact@emmanuelchucks.com",
      subject: "Website Contact Form",
      text: JSON.stringify(req.body, null, 2),
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
