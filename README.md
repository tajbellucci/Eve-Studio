# Ava Studio®

An Awwwards-style portfolio site for **Ava Studio**, a full-service creative
studio, showcasing real client work. Editorial, kinetic, monochrome — warm
ivory paper, deep ink typography, and premium motion throughout.

Original design inspired by the visual language of experimental creative-agency
sites. Case thumbnails are generated abstract artwork matched to each real
project's brand palette (no screenshots or third-party assets are embedded),
and both fonts are self-hosted open-source variable fonts.

## Stack

- **Next.js 15** (App Router) + **React 19** + TypeScript
- **Tailwind CSS v4**
- **GSAP 3** (ScrollTrigger) for all animation
- **Lenis** for smooth scrolling
- **Fraunces Variable** (high-contrast editorial serif) + **Archivo Variable**
  (grotesk, with a width axis used for condensed labels), via Fontsource

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

| Component | Role |
| --- | --- |
| `Preloader` | Full-screen intro — marquee word rows + 0→100% counter, slide-up exit |
| `Header` | Fixed nav in `mix-blend-difference`, magnetic links |
| `Hero` | Oversized split studio name, scattered sticker labels, rotating "play showreel" button |
| `AboutServices` | "Just about" statement + flowing services wall in three typographic voices |
| `SelectedCases` / `CaseCard` | Alternating case rows — clip reveals, scroll parallax, cursor-follow images |
| `CaseDetail` (`app/work/[slug]`) | Per-case detail page — accent-themed Overview / Requirements / Solution / gallery |
| `Awards` | Broken-word typographic composition + count-up stats grid |
| `Footer` | Interactive poster — CTA, marquee, sun-face graphic, full-bleed closing wordmark |
| `CustomCursor` | Circular cursor with `view` / `play` / `link` states (shows on real mouse input, hides on touch) |
| `MarqueeText` | Reusable infinite horizontal loop |
| `Decor` | Starburst, sun face, squiggle, circular text and other hand-drawn marks |

Case data (title, description, tech stack, accent color, etc.) lives in
`data/cases.ts`. Thumbnails live in `public/cases/` and are produced by
`node scripts/generate-case-art.mjs` — brand-matched abstract compositions
keyed to each real project's own palette and a simple geometric echo of its
UI (concentric rings, module grids, chat bubbles, …).

Reduced-motion preferences are respected for ambient animations, cursor
effects are disabled on touch devices, and all type scales fluidly from
mobile to widescreen.
