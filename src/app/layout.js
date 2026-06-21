import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://dupgensherpa.vercel.app"),
  title: "Dupgen Sherpa — Software Engineer",
  description:
    "Final-year Software Engineering student & Backend Engineer. Building high-performance microservices with Java & Spring Boot, paired with modern React frontends.",
  keywords: ["Dupgen Sherpa", "Software Engineer", "Java", "Spring Boot", "React", "Next.js", "Microservices", "Portfolio"],
  authors: [{ name: "Dupgen Sherpa", url: "https://github.com/dupgen10" }],
  openGraph: {
    type: "website",
    url: "https://dupgensherpa.vercel.app",
    title: "Dupgen Sherpa — Software Engineer",
    description: "Building high-performance microservices & modern React UIs.",
    siteName: "Dupgen Sherpa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dupgen Sherpa — Software Engineer",
    description: "Building high-performance microservices & modern React UIs.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body
        style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
        className="bg-[#050510] text-[#f1f1f5] antialiased overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
