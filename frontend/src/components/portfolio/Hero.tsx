import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import profilePic from "@/assets/profile.webp";
import { siteConfig } from "@/lib/siteConfig";

const line1 = "Eskedar".split("");
const line2 = "Nigussie.".split("");

const roles = ["Full-Stack Developer", "problem solver",];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};
const letter: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { type: "spring" as const, damping: 14, stiffness: 180 } },
};

function useTypewriter(words: string[], typeSpeed = 90, deleteSpeed = 45, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((p) => p + 1);
    } else {
      t = setTimeout(
        () => setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(roles);
  return (
    <section id="top" className="relative pt-36 pb-24 px-6 overflow-hidden">

      {/* Animated blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-20 size-[480px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, var(--primary), transparent 60%)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-40 -right-24 size-[420px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 60%)" }}
        animate={{ x: [0, -50, 20, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl">
        

        {/* Two column layout for name and picture */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          {/* Left side - Name and text content */}
          <div className="flex-1">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              <motion.span variants={container} initial="hidden" animate="show" className="block overflow-hidden">
                {line1.map((c, i) => (
                  <motion.span key={i} variants={letter} className="inline-block">
                    {c}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span variants={container} initial="hidden" animate="show" className="block overflow-hidden text-gradient">
                {line2.map((c, i) => (
                  <motion.span key={i} variants={letter} className="inline-block">
                    {c === " " ? "\u00A0" : c}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground font-display"
            >
              I'm a <span className="text-foreground">{typed}</span>
              <span className="inline-block w-[2px] h-6 md:h-7 ml-1 align-middle bg-primary animate-pulse" />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              I design and build performant full-stack web applications — from elegant
              interfaces to robust APIs. Currently shipping things with React, Node.js, Express, and PostgreSQL.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium glow-primary hover:opacity-90 transition">
                View my work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:bg-surface transition">
                Get in touch
              </a>
              <div className="flex items-center gap-2 ml-2">
                <a href={siteConfig.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-full border border-border hover:bg-surface transition" aria-label="GitHub"><Github size={18} /></a>
                <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-full border border-border hover:bg-surface transition" aria-label="LinkedIn"><Linkedin size={18} /></a>
                <a href={`mailto:${siteConfig.email}`} className="p-2.5 rounded-full border border-border hover:bg-surface transition" aria-label="Email"><Mail size={18} /></a>
              </div>
            </motion.div>
          </div>

          {/* Right side - Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Animated ring around the image */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-accent opacity-70 blur-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative size-80 sm:size-96 md:size-[450px] rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <img
                  src={profilePic}
                  alt={siteConfig.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
