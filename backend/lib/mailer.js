import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

// Best-effort notification email. Contact messages are always saved to
// MongoDB regardless of whether this succeeds, so a missing/broken SMTP
// config never causes a visitor's message to be lost.
export async function notifyNewMessage({ name, email, subject, message }) {
  const t = getTransporter();
  if (!t) return { sent: false, reason: "SMTP not configured" };

  const to = process.env.CONTACT_NOTIFY_EMAIL;
  if (!to) return { sent: false, reason: "CONTACT_NOTIFY_EMAIL not set" };

  try {
    await t.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `New portfolio message: ${subject || "No subject"}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return { sent: true };
  } catch (err) {
    console.error("Failed to send notification email:", err.message);
    return { sent: false, reason: err.message };
  }
}
