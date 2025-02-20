import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, subject, message } = await req.json();

  const formattedMessage = `
  <h1>Someone reached out!</h1>
  <br>
  <h3>The following message was sent from ${email}:</h3>
  <br>
  <p style="font-size: 16px; font-family: Arial, sans-serif;">${message}</p>
  `;

  const data = await resend.emails.send({
    from: "Guti's Portfolio <contact@diegogtz.dev>",
    to: [process.env.EMAIL_TO ?? "diego_gtz_t@hotmail.com"],
    subject: subject + " - " + email,
    html: formattedMessage,
  });

  return Response.json(data);
}
