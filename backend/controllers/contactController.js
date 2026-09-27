import { insertMessage, findMessages } from "../models/Message.js";
import { notifyNewMessage } from "../lib/mailer.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body ?? {};

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    if (!EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }
    if (name.length > 120 || email.length > 200 || message.length > 5000) {
      return res.status(400).json({ error: "One of the fields is too long." });
    }

    const saved = await insertMessage({
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || "",
      message: message.trim(),
    });

    // Fire-and-forget: don't block the response on email delivery.
    notifyNewMessage({ name: saved.name, email: saved.email, subject: saved.subject, message: saved.message });

    return res.status(201).json({ success: true, id: saved.id });
  } catch (err) {
    console.error("createMessage error:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
}

// Simple admin-facing listing endpoint so messages can be read back out of
// Postgres later (e.g. from a small admin page). Not linked from the public
// site, and protected by a shared secret so contact messages (which include
// visitors' email addresses) aren't publicly readable.
export async function listMessages(req, res) {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || req.get("x-admin-key") !== adminKey) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const messages = await findMessages({ limit: 200 });
    return res.json(messages);
  } catch (err) {
    console.error("listMessages error:", err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
