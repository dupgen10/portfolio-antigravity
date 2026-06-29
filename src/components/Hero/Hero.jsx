"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";
import SpotifyNowPlaying from "../SpotifyNowPlaying/SpotifyNowPlaying";
import BaseCampWidget from "../BaseCampWidget/BaseCampWidget";

const SKILLS = ["Java 21", "Spring Boot", "Microservices", "REST APIs", "React 18",
  "Next.js", "Tailwind CSS", "PostgreSQL", "MongoDB", "Docker", "Kafka", "Git"];

export default function Hero() {
  const { socials } = portfolioData;

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-0">
      {/* ── Top row: location ── */}
      <div className="w-full px-8 md:px-16 flex items-center justify-end">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--muted)" }}
        >
          India · 2026
        </motion.p>
      </div>

      {/* ── HERO HEADLINE — name + spotify on right ── */}
      <div className="w-full px-8 md:px-16 mt-12 md:mt-16 relative">
        <div className="flex items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            {/* Name — MASSIVE */}
            <h1 className="display-xl-hero text-white overflow-hidden">
              <span className="block">DUPGEN</span>
              <span
                className="block"
                style={{ WebkitTextStroke: "2px var(--ivory)", color: "transparent" }}
              >
                SHERPA
              </span>
            </h1>
          </motion.div>

          {/* Spotify + BaseCamp widgets — right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block flex-shrink-0"
            style={{ maxWidth: "260px", width: "100%" }}
          >
            <SpotifyNowPlaying />
            <BaseCampWidget />
          </motion.div>
        </div>

        {/* ── Sub row below name ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mt-8 gap-8"
        >
          {/* Left: descriptor */}
          <div className="max-w-sm">
            <p className="section-num mb-4">01 / PROFILE</p>
            <p className="body-text">
              Software engineer building{" "}
              <span style={{ color: "var(--ivory)" }}>high-performance microservices</span>{" "}
              with Java & Spring Boot. A recent{" "}
              <span style={{ color: "var(--lime)" }}>B.Tech graduate</span>{" "}
              ready to make an impact.
            </p>
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              See My Work <ArrowRight size={14} />
            </a>
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              GitHub <ArrowUpRight size={14} />
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── MARQUEE STRIP ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="w-full mt-16 overflow-hidden border-y"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="py-4 flex overflow-hidden">
          <div className="marquee-track">
            {[...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS].map((s, i) => (
              <span
                key={i}
                className="flex items-center gap-5 px-6 text-sm font-semibold uppercase tracking-widest whitespace-nowrap"
                style={{ color: i % 2 === 0 ? "var(--muted)" : "var(--lime)", fontSize: "12px" }}
              >
                {s}
                <span style={{ color: "var(--lime)", opacity: 0.4 }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mobile-only interactive stack (renders below the hero on <1024px) */}
      <div className="md:hidden w-full px-8 mt-12 mb-8 flex flex-col gap-6">
        <SpotifyNowPlaying />
        <BaseCampWidget />
      </div>
    </section>
  );
}
