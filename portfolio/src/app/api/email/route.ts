import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, subject, message } = await req.json();

  const data = await resend.emails.send({
    from: "Diego Gutierrez <contact@diegogtz.dev>",
    to: [process.env.EMAIL_TO ?? "random@email.com"],
    subject: subject + "\n\n" + email,
    html: message,
  });

  return Response.json(data);
}
