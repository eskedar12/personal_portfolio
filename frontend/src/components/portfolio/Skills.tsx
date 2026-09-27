import { motion } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiExpress,
  SiPostgresql, SiMongodb, SiTailwindcss, SiGit, SiJsonwebtokens,
  SiSocketdotio, SiDocker, SiPostman,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

const skills = [
  { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
  { name: "React", Icon: SiReact, color: "#61dafb" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#3c873a" },
  { name: "Express", Icon: SiExpress, color: "#ffffff" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#4db33d" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38bdf8" },
  { name: "REST APIs", Icon: TbApi, color: "#a78bfa" },
  { name: "Socket.io", Icon: SiSocketdotio, color: "#ffffff" },
  { name: "Git", Icon: SiGit, color: "#f05033" },
  { name: "JWT", Icon: SiJsonwebtokens, color: "#d946ef" },
  { name: "Docker", Icon: SiDocker, color: "#2496ed" },
  { name: "Postman", Icon: SiPostman, color: "#ff6c37" },
];

export function Skills() {
  const loop = [...skills, ...skills];
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold">Skills & tech.</h2>
        </motion.div>

        {/* Static grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {skills.map(({ name, Icon, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -6 }}
              className="group glass rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/40 transition-colors"
            >
              <Icon size={40} style={{ color }} className="transition-transform group-hover:scale-110 group-hover:rotate-6" />
              <span className="text-sm text-muted-foreground text-center">{name}</span>
            </motion.div>
          ))}
        </div>

        {/* Infinite marquee */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex gap-12 w-max py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {loop.map(({ name, Icon, color }, i) => (
              <div key={i} className="flex items-center gap-3 text-muted-foreground shrink-0">
                <Icon size={28} style={{ color }} />
                <span className="font-display text-2xl">{name}</span>
                <span className="text-primary/40">·</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}