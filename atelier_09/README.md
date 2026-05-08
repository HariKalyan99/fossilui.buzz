# ATELIER/09 — Clothing Manufacturing Website

A modern, visually-driven marketing site for a clothing & apparel manufacturing factory. Built to win two audiences at once:

- B2B brands looking for a serious, capable manufacturing partner
- Gen Z fashion founders who want something aesthetic and trustworthy

## Tech stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (utility-first, via `@tailwindcss/vite`)
- **Framer Motion** for premium motion and section reveals
- **lucide-react** for iconography
- Zero inline styles, strict component-based architecture

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # eslint
```

Dev server runs on the Vite default port (5173).

## Project structure

```
three/
├── index.html
├── vite.config.js        # vite + @tailwindcss/vite plugin
├── eslint.config.js
└── src/
    ├── main.jsx
    ├── App.jsx           # section composition
    ├── index.css         # Tailwind v4 theme + grain + marquee utilities
    ├── data/
    │   └── content.js    # all copy, metrics, products, testimonials
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── BrandStrip.jsx
        ├── Services.jsx
        ├── ProductShowcase.jsx
        ├── Process.jsx
        ├── Factory.jsx
        ├── Testimonials.jsx
        ├── CTA.jsx
        ├── Footer.jsx
        └── ui/
            ├── Button.jsx
            ├── Container.jsx
            ├── Reveal.jsx
            └── SectionLabel.jsx
```

## Design system

Defined in `src/index.css` via Tailwind v4 `@theme`:

- **Ink scale** (`ink-950 → ink-600`) — near-black base
- **Bone scale** (`bone-50 → bone-300`) — warm off-white
- **Accents** — `accent-lime` (neon-ish highlight), `accent-peach`, `accent-mauve`
- **Fonts** — `Inter` (sans) + `Space Grotesk` (display)
- **Utilities** — `.grain`, `.marquee-track`, `.no-scrollbar`

## Animation guidelines

- All section reveals use `Reveal` (fade + slide with `ease: [0.22, 1, 0.36, 1]`)
- Hero has a parallax background with `useScroll` + `useTransform`
- Process steps use scroll-linked opacity/translate
- Cards use subtle `whileHover={{ y: -4 }}` lifts and image zooms on hover
- Brand marquee uses CSS keyframes for cheap GPU-only motion
- Mobile menu uses `AnimatePresence` for height transitions

## Image sources

All imagery comes from **Unsplash** (free license, direct CDN). URLs are in `src/data/content.js` — swap them out for your own shoot whenever you're ready.

## Customization quick-hits

- **Brand name / colors** — edit `@theme` tokens in `src/index.css` and the `ATELIER/09` strings in `Navbar.jsx` / `Footer.jsx`.
- **Copy** — everything editorial lives in `src/data/content.js`.
- **Sections** — add/remove from the composition inside `src/App.jsx`.
- **New section** — mirror the pattern: `Container + SectionLabel + Reveal + grid/cards`.
