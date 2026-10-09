# @fossilui/cards

Animated card components from [Fossil UI](https://fossilui.buzz) as a standalone package. Live docs and a configurator: https://fossilui.buzz/components/cards

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes — **you must install and configure Tailwind**)

## Install

```bash
# Components
npm install @fossilui/cards

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

@source "../node_modules/@fossilui/cards/dist";
```

## Usage

```jsx
import { Card } from '@fossilui/cards'

export default function App() {
  return (
    <Card
      motion="liftShadow"
      imageSrc="/hero.jpg"
      title="Fossil UI"
      description="Production-ready components for modern developers."
    />
  )
}
```

## Motions

`liftShadow, borderGlow, imageZoom, shineSweep, gradientShift, scaleUp, accentReveal, tiltHover`

Use the `motion` prop on the wrapper component, or import a named variant directly (e.g. `LiftShadowCard`).

## Notes

- Same components as `@fossilui/react` — install one or the other, not both.
- No animation library required: CSS transitions plus the Web Animations API.
- Respects `prefers-reduced-motion`.
