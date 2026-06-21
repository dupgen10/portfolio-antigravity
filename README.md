# Dupgen Sherpa — Developer Portfolio

A modern, high-performance developer portfolio built with Next.js 16, Tailwind CSS, and Framer Motion. 
Features an editorial "Himalayan Digital" design system with an off-black background and electric lime accents.

## Features
- **Next.js 16 App Router:** Server components and fast routing.
- **Framer Motion:** Smooth micro-animations, page load reveals, and a custom cursor.
- **Live GitHub Stats:** Integrates with the GitHub API to display real-time repository stats (Stars, Forks, Issues).
- **Responsive Design:** Fluid typography and layout adjustments for seamless mobile scaling.
- **SEO Optimized:** Full OpenGraph metadata and dynamic social share images (`opengraph-image.jsx`).

## Tech Stack
- React 18 / Next.js 16 (Turbopack)
- Tailwind CSS v4
- Framer Motion
- Lucide React Icons

## Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization
- **Data:** Update your personal information, skills, and projects in `src/data/portfolioData.js`.
- **Styling:** Edit the CSS variables in `src/app/globals.css` to change the color palette.
- **Contact:** Update the email address in `src/components/Contact/Contact.jsx`.

## Deployment
This project is configured for seamless deployment to Vercel. 
Simply push the repository to GitHub and import it via the Vercel dashboard.

```bash
npx vercel --prod
```
