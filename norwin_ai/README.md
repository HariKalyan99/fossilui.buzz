# Nova — AI Image & Video Platform

A modern, production-style SaaS interface for an AI platform that generates
images and videos from prompts. Built with **React (Vite) + Tailwind CSS +
Framer Motion** and styled as a polished, professional product experience.

## Stack

- React 19 + Vite 8
- Tailwind CSS 3 (with `@tailwindcss/forms` and `typography`)
- Framer Motion (page transitions, hover/scale, staggered reveals, shared-layout tabs)
- React Router 7
- lucide-react icons

## Design System

| Token      | Value              |
| ---------- | ------------------ |
| Background | `#0B0B0F`          |
| Surface    | `#121217`          |
| Text       | `#E5E7EB`          |
| Muted      | `#9CA3AF`          |
| Primary    | `#6366F1` (indigo) |
| Secondary  | `#06B6D4` (cyan)   |
| Gradient   | indigo → cyan      |

Fonts: Inter (UI), Space Grotesk (display), JetBrains Mono (code).

## Pages

| Route                | Page                                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `/`                  | Home — hero, live demo, features, how it works, testimonials, CTA                                                      |
| `/generate`          | Studio — image/video tabs, prompt box, style/ratio/duration controls, output grid with skeleton loading, preview modal |
| `/dashboard`         | Library — sidebar, stats, image/video filters, search, preview modal                                                   |
| `/features`          | Detailed capabilities, hero features, and secondary feature grid                                                       |
| `/pricing`           | Plans, monthly/yearly toggle, comparison table                                                                         |
| `/contact`           | Contact form with submitted state                                                                                      |
| `/about`             | Story, stats, values                                                                                                   |
| `/login`, `/signup`  | Split-screen auth                                                                                                      |
| `/privacy`, `/terms` | Legal docs                                                                                                             |

## Folder Structure

```
src/
├── App.jsx                 # Routes + page transitions
├── main.jsx
├── index.css               # Tailwind layers, theme utilities
├── components/
│   ├── layout/             # Navbar, Footer, PageTransition
│   ├── ui/                 # Button, Badge, Logo, Modal, Select, Skeleton, SectionHeader, BrandIcons
│   └── sections/           # Hero, FeatureGrid, HowItWorks, Testimonials, CTA, LogoCloud
├── data/mock.js            # Mock images, videos, style/ratio/duration presets
├── lib/cn.js               # clsx wrapper
└── pages/                  # Home, Generate, Dashboard, Features, Pricing, Contact, About, Login, Signup, Legal, NotFound
```

## Scripts

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # eslint
```

## Notes

- Mock media is served from Unsplash + open video clips; no uploads required.
- Authentication and generation are mocked (client-side) to showcase UX flows.
- Animations follow the spec: subtle page fades, staggered cards, smooth tab swaps
  using `layoutId`, skeleton shimmer during generation, and floating hero badges.
