"use client";

import { motion } from "framer-motion";
import { portfolioData } from "../../data/portfolioData";
import ProjectCard from "../Cards/ProjectCard";
import AboutMeCard from "../Cards/AboutMeCard";
import GitHubStats from "../GitHubStats/GitHubStats";


const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function BentoGrid() {
  const { projects, about } = portfolioData;

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PROJECTS SECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="projects" className="w-full px-8 md:px-16 pt-28 pb-20">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="section-num mb-4">02 / WORK</p>
            <h2 className="display-lg text-white">Selected<br />Projects</h2>
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="body-text max-w-xs text-right hidden md:block"
          >
            A selection of my recent engineering work spanning backend systems and frontend interfaces.
          </motion.p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={i}
              className={i === 0 ? "md:col-span-2 flex flex-col gap-4" : ""}
              style={{ minHeight: i === 0 ? "auto" : "320px" }}
            >
              <div style={{ minHeight: i === 0 ? "320px" : "100%", flex: 1 }}>
                <ProjectCard project={project} index={i} />
              </div>
              {i === 0 && <GitHubStats />}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ABOUT SECTION — full bleed split layout
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="about" className="w-full px-8 md:px-16 pt-20 pb-28">
        <hr className="hairline mb-20" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Left col: section heading — large stacked */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="md:col-span-4"
          >
            <p className="section-num mb-6">03 / ABOUT</p>
            <h2 className="display-lg text-white">The<br />Person.</h2>

            {/* Fun data blocks */}
            <div className="mt-12 space-y-5">
              {[
                { num: "3+", label: "Years building\nbackend systems" },
                { num: "4", label: "Projects shipped\n(and counting)" },
                { num: "∞", label: "Outdoor basketball\ncourt sessions" },
              ].map(({ num, label }) => (
                <div key={num} className="flex items-baseline gap-5">
                  <span
                    className="font-display font-black text-5xl"
                    style={{ color: "var(--lime)" }}
                  >
                    {num}
                  </span>
                  <span
                    className="text-sm font-medium leading-snug"
                    style={{ color: "var(--muted)", whiteSpace: "pre-line" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right col: info table + bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="md:col-span-8"
          >
            <AboutMeCard bio={about.bio} skills={about.skills} />
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TECH STACK SECTION — minimal horizontal list
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full px-8 md:px-16 pb-24">
        <hr className="hairline mb-14" />
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-24">
          <div className="flex-shrink-0">
            <p className="section-num mb-4">04 / STACK</p>
            <h3 className="font-display text-2xl font-bold text-white">Arsenal</h3>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-0">
            {[
              { cat: "Backend",      items: ["Java 21", "Spring Boot 3", "Spring MVC", "Microservices", "REST APIs", "Kafka"] },
              { cat: "Frontend",     items: ["React 18", "Next.js 15", "Tailwind CSS", "Framer Motion"] },
              { cat: "Data & Infra", items: ["PostgreSQL", "MongoDB", "Docker", "Git & GitHub"] },
            ].map(({ cat, items }) => (
              <div key={cat}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--lime)" }}>{cat}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-sm" style={{ color: "var(--muted)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
