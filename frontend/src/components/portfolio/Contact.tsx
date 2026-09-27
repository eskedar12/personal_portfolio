import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { sendContactMessage } from "@/lib/api";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, and a message.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      await sendContactMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Let's build <span className="text-gradient">something.</span>
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Have an idea, a role, or a project in mind? My inbox is always open.
          </p>
          <div className="space-y-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition group"
            >
              <Mail size={18} className="text-primary shrink-0" />
              <span className="break-all">{siteConfig.email}</span>
            </a>

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition group"
            >
              <Github size={18} className="text-primary shrink-0" />
              <span>{siteConfig.githubHandle}</span>
            </a>

            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition group"
            >
              <Linkedin size={18} className="text-primary shrink-0" />
              <span>{siteConfig.linkedinHandle}</span>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-3 glass rounded-2xl p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" type="text" placeholder="Your name" value={form.name} onChange={update("name")} required />
            <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} required />
          </div>
          <Field label="Subject" type="text" placeholder="What's this about?" value={form.subject} onChange={update("subject")} />
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Message</label>
            <textarea
              rows={5}
              required
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={update("message")}
              className="w-full rounded-xl bg-surface border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium glow-primary hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                Sending <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>
                Send message <Send size={16} />
              </>
            )}
          </button>

          {status === "success" && (
            <p className="flex items-center gap-2 text-sm text-primary" role="status">
              <CheckCircle2 size={16} /> Message sent — I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center gap-2 text-sm text-red-400" role="alert">
              <AlertCircle size={16} /> {errorMsg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl bg-surface border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition"
      />
    </div>
  );
}
