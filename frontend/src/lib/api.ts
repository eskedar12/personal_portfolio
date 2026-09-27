export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function sendContactMessage(payload: ContactPayload) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || "Something went wrong sending your message.");
  }

  return data;
}
