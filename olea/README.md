# OLEA — Boutique Hotel & Restaurant

A premium, editorial-style website for a fictional boutique hotel & restaurant in the Tuscan countryside. Built with React, Vite, Tailwind CSS, and Framer Motion.

## Brand

**OLEA** — _A quiet luxury, slowly lived._
Nine-suite countryside retreat with a thirty-seat chef's table.

## Design system

- **Palette** Ink `#0E0E0C`, ivory `#F5F1E8`, bone `#E8DFCE`, bronze `#A98253`, sage `#6B7560`
- **Type** Fraunces (display serif) · Inter (body)
- **Motion** Framer Motion — subtle scroll reveals, slow image hovers, page transitions
- **Tone** Editorial, slow, generous whitespace

## Pages

- `/` Home — cinematic hero, press strip, intro, stay/dine split, suites, story, CTA
- `/stay` Suites — alternating editorial room cards with pricing & features
- `/menu` Restaurant — categorized tasting menu with sticky pricing
- `/about` Story — founder voice, philosophy, numbers
- `/gallery` — masonry grid with keyboard-navigable lightbox
- `/reservations` — combined Stay / Table form with summary card
- `/contact` — visit, hours, getting-here, embedded map, newsletter

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle
npm run preview  # preview the build
```

## Stack

- **React 19** with **react-router-dom**
- **Vite** for dev / build
- **Tailwind CSS** for styling
- **Framer Motion** for animation
- All imagery served from the Unsplash CDN — no local hosting needed

## Structure

```
src/
├── components/
│   ├── layout/        Navbar · Footer · Layout (page transitions)
│   └── ui/            Reveal · Marquee · Lightbox
├── data/              content.js — all rooms / menu / gallery / story
├── pages/             Home · Stay · Menu · About · Gallery · Reservations · Contact
├── App.jsx            Router
├── main.jsx
└── index.css          Tailwind + custom layers
```
