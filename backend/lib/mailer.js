// Best-effort notification email, sent over HTTPS (port 443) so it works on
// Render's free tier, which blocks SMTP ports 25/465/587.
//
// Pick ONE provider by setting its API key in the environment:
//   Resend: RESEND_API_KEY   (+ optional MAIL_FROM)
//   Brevo:  BREVO_API_KEY    + BREVO_SENDER_EMAIL (must be a verified sender)
// Messages are always saved to Postgres first; this never throws, so an email
// problem can't make a visitor's message get lost.

const TIMEOUT_MS = 10_000;

async function sendWithResend({ to, subject, text, replyTo }) {
  const from = process.env.MAIL_FROM || "Portfolio Contact Form <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text, reply_to: replyTo }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function sendWithBrevo({ to, subject, text, replyTo, replyToName }) {
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!senderEmail) throw new Error("BREVO_SENDER_EMAIL not set");
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Portfolio Contact Form", email: senderEmail },
      to: [{ email: to }],
      replyTo: { email: replyTo, name: replyToName },
      subject,
      textContent: text,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
}

export async function notifyNewMessage({ name, email, subject, message }) {
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  if (!to) return { sent: false, reason: "CONTACT_NOTIFY_EMAIL not set" };

  const send = process.env.RESEND_API_KEY
    ? sendWithResend
    : process.env.BREVO_API_KEY
      ? sendWithBrevo
      : null;
  if (!send) return { sent: false, reason: "No email provider configured" };

  try {
    await send({
      to,
      subject: `New portfolio message: ${subject || "No subject"}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: email,
      replyToName: name,
    });
    return { sent: true };
  } catch (err) {
    console.error("Failed to send notification email:", err.message);
    return { sent: false, reason: err.message };
  }
}