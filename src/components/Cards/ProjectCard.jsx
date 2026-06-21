"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ACCENTS = {
  signalforge:     { chip: "chip-lime",  index: "01" },
  foodfrenzy:      { chip: "chip-blue",  index: "02" },
  moneymanager:    { chip: "chip-lime",  index: "03" },
  "hcl-hackathon": { chip: "chip-blue",  index: "04" },
};

export default function ProjectCard({ project, index }) {
  const acc = ACCENTS[project.id] || { chip: "chip", index: `0${index + 1}` };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="project-card h-full flex flex-col p-7 group"
    >
      {/* Top row: number + external link */}
      <div className="flex items-center justify-between mb-8">
        <span
          className="card-num font-mono font-bold text-xs tracking-widest transition-colors duration-300"
          style={{ color: "var(--muted)", fontFamily: "monospace" }}
        >
          {acc.index}
        </span>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:border-[var(--lime)] group-hover:text-[var(--lime)]"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Title */}
      <h3
        className="font-display text-xl font-bold text-white mb-3 tracking-tight leading-tight"
      >
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className={`chip ${acc.chip}`}>{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}
