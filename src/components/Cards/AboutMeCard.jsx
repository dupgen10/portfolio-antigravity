"use client";

import { motion } from "framer-motion";

export default function AboutMeCard({ bio, skills }) {
  const info = [
    { label: "Role",        value: "Software Engineer\nBackend Specialist" },
    { label: "Education",   value: "B.Tech Software Engineering\n(Final Year · Thesis)" },
    { label: "Expertise",   value: "Java · Spring Boot\nMicroservices · React" },
    { label: "Location",    value: "New Delhi ↔ Bagdogra\nIndia" },
    { label: "Interests",   value: "Basketball · Hiking\nTravel · Open Source" },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Bio text */}
      <p className="body-text mb-8 leading-relaxed" style={{ color: "var(--ivory-dim)" }}>
        {bio}
      </p>

      {/* Info rows — editorial list */}
      <div className="flex-1">
        {info.map(({ label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="info-row"
          >
            <span className="info-label">{label}</span>
            <span className="info-value" style={{ whiteSpace: "pre-line" }}>{value}</span>
          </motion.div>
        ))}
      </div>

      {/* Skills grid */}
      <div className="mt-8">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>Core Stack</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="chip chip-lime"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
