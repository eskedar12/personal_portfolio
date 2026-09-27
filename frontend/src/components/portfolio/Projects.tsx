import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import direFoods from "@/assets/project-dire-foods.webp";
import ecommerce from "@/assets/project-ecommerce.webp";
import studyHive from "@/assets/project-study-hive.webp";
import career from "@/assets/career.webp";
import coffeeShop from "@/assets/coffee.webp";

const projects = [
  {
    title: "StudyHive",
    tag: "Collaborative Learning Platform",
    image: studyHive,
    description: "Full-stack resource sharing platform where students discover, share, and collaborate on educational materials. Features real-time discussions, post creation, media uploads, and community feed.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    demo: "https://studyhive-app.onrender.com",
    github: "https://github.com/eskedar12/studyhive-resource_sharing",
  },
  {
    title: "Dire Foods",
    tag: "Food Delivery Platform",
    image: direFoods,
    description: "Full-stack app connecting customers with restaurants in Dire Dawa, Ethiopia. Auth, menu management, cart, orders, and admin dashboard.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    demo: "https://food-delivery-app-qfcw.onrender.com",
    github: "https://github.com/eskedar12/Food-Delivery-App",
  },
  {
    title: "SweetGlam - Habesha Atelier",
    tag: "E-Commerce Frontend",
    image: ecommerce,
    description: "Elegant e-commerce website showcasing Habesha-inspired fashion and handmade products. Features product listing, smooth navigation, and fully responsive design.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "shadcn/ui", "TanStack Router"],
    demo: "https://ecommercewebsite102.netlify.app/",
    github: "https://github.com/eskedar12/Ecommerce-Website",
  },
  {
    title: "Career Compass",
    tag: "Job Application Tracker",
    image: career,
    description: "Full-stack job application management system. Track applications, update statuses (Applied, Interview, Offer, Rejected, Accepted), and visualize job search progress with interactive dashboards and charts.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "Recharts"],
    demo: "https://job-tracker-web-ych8.onrender.com",
    github: "https://github.com/eskedar12/job-tracker",
  },
  {
    title: "Coffee Shop Website",
    tag: "Modern Cafe Frontend",
    image: coffeeShop,
    description: "Modern, responsive coffee shop website featuring elegant UI components, smooth animations, and mobile-first design. Shows menu items and brand identity.",
    tech: ["React", "TanStack Start", "Tailwind CSS", "TypeScript", "Vite"],
    demo: "https://coffeeshopwebsite101.netlify.app",
    github: "https://github.com/eskedar12/coffee_shop_web",
  },
];

type Project = (typeof projects)[number];

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group glass rounded-2xl overflow-hidden w-[340px] md:w-[420px] shrink-0 mx-3 hover:glow-primary transition-all">
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/70 backdrop-blur border border-border text-primary">
          {p.tag}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold mb-2">{p.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{p.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tech.slice(0, 4).map((t) => (
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium hover:opacity-90 transition"
          >
            <ExternalLink size={12} /> Demo
          </a>
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface transition"
          >
            <Github size={12} /> Code
          </a>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({ items, reverse = false, duration = 40 }: { items: Project[]; reverse?: boolean; duration?: number }) {
  // Duplicate items for seamless infinite scroll
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] group/row">
      <motion.div
        className="flex w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        style={{ animationPlayState: "running" }}
      >
        {loop.map((p, i) => (
          <ProjectCard key={`${p.title}-${i}`} p={p} />
        ))}
      </motion.div>
    </div>
  );
}

export function Projects() {
  // Split into 3 and 2 (first 3, remaining 2)
  const rowA = projects.slice(0, 3);
  const rowB = projects.slice(3);

  return (
    <section id="projects" className="px-6 py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Selected work</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
             My <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>
      </div>

      <div className="space-y-6">
        <MarqueeRow items={rowA} duration={45} />
        {rowB.length > 0 && <MarqueeRow items={rowB} reverse duration={50} />}
      </div>
    </section>
  );
}
