"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";

const EMAIL = "dupgensherpa@email.com";

export default function Contact() {
  const { socials } = portfolioData;

  return (
    <section id="contact" className="w-full px-8 md:px-16 pt-20 pb-28">
      <hr className="hairline mb-20" />

      {/* Section marker */}
      <p className="section-num mb-10">05 / CONTACT</p>

      {/* Main CTA */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-end">
        <div className="md:col-span-7">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="display-lg text-white mb-8"
          >
            Let's build<br />
            something{" "}
            <span
              style={{
                WebkitTextStroke: "2px var(--lime)",
                color: "transparent",
              }}
            >
              great.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="body-text max-w-md mb-10"
          >
            I'm actively looking for internships, graduate roles, and freelance
            projects. Whether it's a backend microservice or a full-stack
            product — I'd love to hear about it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="btn-primary"
            >
              <Mail size={14} />
              Send an Email
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              LinkedIn <ArrowUpRight size={13} />
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              GitHub <ArrowUpRight size={13} />
            </a>
          </motion.div>
        </div>

        {/* Right: contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="md:col-span-5 space-y-0"
        >
          {[
            { label: "Email",    value: EMAIL,                href: `mailto:${EMAIL}` },
            { label: "GitHub",   value: "github.com/dupgen10", href: socials.github },
            { label: "LinkedIn", value: "linkedin.com/in/dupgen", href: socials.linkedin },
            { label: "Based in", value: "India (Open to remote)", href: null },
            { label: "Status",   value: "✦ Available now", href: null, accent: true },
          ].map(({ label, value, href, accent }) => (
            <div key={label} className="info-row">
              <span className="info-label">{label}</span>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="info-value link-line text-right"
                  style={{ color: accent ? "var(--lime)" : undefined }}
                >
                  {value}
                </a>
              ) : (
                <span
                  className="info-value"
                  style={{ color: accent ? "var(--lime)" : undefined }}
                >
                  {value}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
