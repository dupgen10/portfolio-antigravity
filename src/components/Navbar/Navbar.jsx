"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "../../data/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 h-[1.5px] z-50 origin-left"
        style={{ width: progressWidth, background: "var(--lime)" }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,10,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          padding: scrolled ? "14px 0" : "22px 0",
        }}
      >
        <div className="px-8 md:px-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "var(--lime)" }}
            >
              <span className="text-[10px] font-black" style={{ color: "var(--ink)", fontFamily: "monospace" }}>DS</span>
            </div>
          </a>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-10">
            {[["02", "Projects", "#projects"], ["03", "About", "#about"]].map(([num, label, href]) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest link-line"
                style={{ color: "var(--muted)" }}
              >
                <span style={{ color: "var(--lime)", fontSize: "9px" }}>{num}</span>
                {label}
              </a>
            ))}
          </div>

          {/* Right: contact */}
          <a
            href={portfolioData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--muted)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--lime)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
          >
            <span style={{ color: "var(--lime)", fontSize: "9px" }}>04</span>
            Contact
          </a>
        </div>
      </motion.nav>
    </>
  );
}
