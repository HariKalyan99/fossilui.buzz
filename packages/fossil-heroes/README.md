# @fossilui/heroes

Animated hero section components from [Fossil UI](https://fossilui.buzz) as a standalone package. Live docs and a configurator: https://fossilui.buzz/components/heroes

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes — **you must install and configure Tailwind**)
- `lucide-react` (icons)

## Install

```bash
# Components
npm install @fossilui/heroes lucide-react

# Tailwind v4 (required — components will not render correctly without this)
npm install -D tailwindcss @tailwindcss/vite
```

### Vite

```js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### CSS

Scan the published package so Tailwind generates the utility classes used by the components:

```css
@import "tailwindcss";

@source "../node_modules/@fossilui/heroes/dist";
```

## Usage

```jsx
import { Hero } from '@fossilui/heroes'

export default function App() {
  return (
    <Hero
      motion="staggerWords"
      eyebrow="New release"
      title="Ship polished interfaces faster"
      description="Animated React components built on Tailwind CSS."
      primaryLabel="Get started"
      primaryHref="/docs"
      secondaryLabel="GitHub"
      secondaryHref="https://github.com/HariKalyan99/fossilui.buzz"
    />
  )
}
```

## Motions

`fadeUp, staggerWords, blurReveal, scaleIn, letterCascade, gradientText, spotlight, typewriter`

Use the `motion` prop on the wrapper component, or import a named variant directly (e.g. `StaggerWordsHero`).

## Notes

- Same components as `@fossilui/react` — install one or the other, not both.
- No animation library required: CSS transitions plus the Web Animations API.
- Respects `prefers-reduced-motion`.
