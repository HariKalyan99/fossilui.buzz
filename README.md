# FossilUI

![FossilUI logo](./public/Rex.svg)

> Free, production-ready UI templates for modern developers.

FossilUI is a developer-first platform for discovering, previewing, and learning from real UI templates. Every template ships with a live deployment, browseable source code, and a public GitHub repository — no sign-up, no paywall.

## What's inside

This repository contains:

- **The FossilUI platform** (this folder) — a React + Vite + Tailwind app that powers the catalog, previews, and code viewer.
- **Eight standalone templates** — each is a self-contained React + Vite + Tailwind project with its own `package.json` and deployment.

```
fossilUI/
├── src/                      # FossilUI platform source
├── atelier_09/               # Boutique studio portfolio
├── eleven/                   # Eleven CRM dashboard
├── evently/                  # Events & ticketing landing
├── glimpse/                  # Photography / visual story
├── nebula/                   # AI / DevTool SaaS
├── northbound_labs/          # Research lab marketing site
├── norwin_ai/                # AI product marketing
└── olea/                     # Premium e-commerce
```

## Tech stack

| Concern               | Choice                                 |
| --------------------- | -------------------------------------- |
| Framework             | React 19 + Vite 8                      |
| Styling               | Tailwind CSS v4                        |
| Animation             | Framer Motion + GSAP ScrollTrigger     |
| Smooth scrolling      | Lenis                                  |
| 3D hero backdrop      | Three.js (lightweight, no Spline dep)  |
| Code viewer           | CodeMirror 6 (`@uiw/react-codemirror`) |
| Routing               | React Router v7                        |
| Icons                 | Lucide + inline brand icons            |

## Routes

| Path                   | Page                                                  |
| ---------------------- | ----------------------------------------------------- |
| `/`                    | Home — hero, featured templates, categories, trust    |
| `/templates`           | Templates grid (search + category filter)             |
| `/templates/:slug`     | Detail — live preview + CodeMirror file viewer        |
| `/components`          | Components (coming soon)                              |
| `/code`                | Alias to `/templates`                                 |
| `/docs`                | Quick Start + FossilUI Docs (intro, features, FAQ)    |
| `/contact`             | Contact form                                          |

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build
npm run preview
```

The platform reads each template's source via `import.meta.glob` (lazy, raw text) so the file viewer always reflects what's on disk.

## License

MIT — use freely in commercial or personal projects.
