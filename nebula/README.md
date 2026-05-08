# Nebula — Premium SaaS Agency Website

A production-grade marketing site for a fictional boutique web studio, built as
a single-page React app. Dark aesthetic inspired by Linear / Vercel / Stripe.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, utility-first, no inline styles)
- **Framer Motion** for scroll entrances, stagger, and hover micro-interactions
- **lucide-react** for crisp, consistent icons
- **Inter** + **Instrument Serif** from Google Fonts

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the built output
npm run lint     # ESLint (flat config, React + Hooks)
```

## Folder structure

```
src/
├── App.jsx                 # composes every section
├── main.jsx                # React entry
├── index.css               # Tailwind v4 import + design tokens (@theme) + custom utilities
├── lib/
│   └── motion.js           # shared Framer Motion variants (fadeUp, stagger, etc.)
└── components/
    ├── Navbar.jsx          # sticky, glass-morphic nav with mobile sheet
    ├── Hero.jsx            # animated gradient backdrop + metrics strip
    ├── TrustedBy.jsx       # infinite CSS marquee of SVG wordmarks
    ├── Services.jsx        # 6-card grid with hover radial-glow
    ├── Process.jsx         # interactive 4-step flow with AnimatePresence
    ├── CaseStudies.jsx     # bento grid with gradient covers + hover reveal
    ├── Features.jsx        # bordered grid with icon + copy
    ├── Pricing.jsx         # 3 tiers + billing-frequency toggle (layoutId pill)
    ├── Testimonials.jsx    # auto-rotating carousel (pauses on hover)
    ├── CTA.jsx             # oversized closing call-to-action
    ├── Footer.jsx          # newsletter + column links
    └── ui/
        ├── Button.jsx      # polymorphic motion button (as="a" | "button")
        ├── Container.jsx   # max-width wrapper
        ├── Logo.jsx        # wordmark + gradient icon
        └── SectionHeading.jsx  # eyebrow + gradient title + description
```

## Design system

Tokens live in `src/index.css` under `@theme`:

- **ink-950 → ink-400** — near-black surface palette
- **mist-50 → mist-400** — neutral text ramp
- **brand-\*** — indigo/violet accent used for primary moments
- **accent-\*** — cyan secondary accent, paired in gradients
- **glow-\*** — raw colors for ambient blur/radial effects

Custom Tailwind utilities (v4 `@utility` syntax):

- `bg-noise` — subtle SVG noise overlay
- `text-gradient-brand` — premium headline gradient
- `animate-marquee` — seamless horizontal logo scroll
- `ring-brand` — focus-ring color token

## Animation principles

All scroll-in motion uses a shared cubic-bezier `[0.22, 1, 0.36, 1]` for that
"ease-out-expo" premium feel. Sections stagger their children (`staggerContainer`),
individual elements fade-and-rise (`fadeUp`), and interactive elements use
spring-based hover lifts. Animations trigger once per viewport entry to avoid
jank on re-scroll.

## Responsiveness

Mobile-first. Key breakpoints: `md` (768px) and `lg` (1024px). The hero, nav,
process, case-study grid and pricing all have explicit mobile layouts — test with
DevTools at 375px and 768px to confirm.
