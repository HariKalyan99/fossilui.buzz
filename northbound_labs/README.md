# Northbound Labs — Agency Website

A production-grade marketing site for a Software Development Solutions & Services agency.
Built with React 19, Vite 8, Tailwind CSS v4, and Motion (Framer Motion).

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build
npm run preview
```

## Stack

| Concern    | Choice                                                                         |
| ---------- | ------------------------------------------------------------------------------ |
| Framework  | React 19 + Vite 8                                                              |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`) with CSS variable tokens                 |
| Animation  | `motion` (Framer Motion successor)                                             |
| Icons      | `lucide-react` + inline brand SVGs                                             |
| Typography | Inter (body) · Instrument Serif (editorial accents) · JetBrains Mono           |
| Theming    | Class-based dark mode, persisted to `localStorage`, respects system preference |

## Architecture

```
src/
├── App.jsx                        Composition of all sections
├── main.jsx                       Entry
├── index.css                      Tailwind v4 + design tokens + utilities
├── context/
│   └── ThemeContext.jsx           Light/dark provider + hook
├── lib/
│   ├── cn.js                      Class-name helper
│   └── data.js                    All copy / content (single source)
└── components/
    ├── layout/
    │   ├── Navbar.jsx
    │   └── Footer.jsx
    ├── ui/
    │   ├── Button.jsx
    │   ├── SectionHeading.jsx
    │   └── ThemeToggle.jsx
    └── sections/
        ├── Hero.jsx
        ├── SocialProof.jsx
        ├── Services.jsx
        ├── Solutions.jsx
        ├── Process.jsx
        ├── Portfolio.jsx          iframe-based live previews
        ├── CaseStudies.jsx
        ├── Testimonials.jsx
        ├── TechStack.jsx
        └── CTA.jsx
```

## Design system

All surfaces are driven by CSS variables in `src/index.css`:

- `--bg`, `--bg-elevated`, `--bg-subtle`
- `--fg`, `--fg-muted`, `--fg-subtle`
- `--border`, `--border-strong`
- `--accent` (red, used only for emphasis / CTAs / accents)

Swap the `.dark` class on `<html>` to switch themes. The provider also syncs
`meta[theme-color]` so the browser chrome matches.

## Swapping in your content

Everything user-facing lives in `src/lib/data.js` (brand info, services,
process, portfolio URLs, testimonials, tech stack). No string edits required
inside components.
