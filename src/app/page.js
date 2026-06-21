import Hero from '../components/Hero/Hero';
import BentoGrid from '../components/BentoGrid/BentoGrid';
import Navbar from '../components/Navbar/Navbar';
import CustomCursor from '../components/Cursor/CustomCursor';
import Contact from '../components/Contact/Contact';

export default function Home() {
  return (
    <>
      {/* Film grain texture */}
      <div className="texture-overlay" />

      {/* Custom cursor (hidden on touch devices via CSS) */}
      <CustomCursor />

      {/* Content */}
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <Contact />

        {/* Footer */}
        <footer
          className="w-full px-8 md:px-16 py-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              © 2026 Dupgen Sherpa — Built with Next.js
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
