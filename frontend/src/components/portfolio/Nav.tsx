import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-6 mt-4">
        <nav className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteConfig.resumeUrl}
              download
              className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-surface transition"
            >
              Resume
            </a>
            <a href="#contact" className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition">
              Hire me
            </a>
          </div>
          <button className="md:hidden p-2 text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {open && (
          <div className="md:hidden glass mt-2 rounded-2xl p-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            ))}
            <a href={siteConfig.resumeUrl} download className="text-sm text-muted-foreground hover:text-foreground">
              Resume
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
