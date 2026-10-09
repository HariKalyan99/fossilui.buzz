# @fossilui/navbars

Animated navbar components from [Fossil UI](https://fossilui.buzz) as a standalone package. Live docs and a configurator: https://fossilui.buzz/components/navbars

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes — **you must install and configure Tailwind**)
- `lucide-react` (icons)

## Install

```bash
# Components
npm install @fossilui/navbars lucide-react

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

@source "../node_modules/@fossilui/navbars/dist";
```

## Usage

```jsx
import { Navbar } from '@fossilui/navbars'

export default function App() {
  return (
    <Navbar
      motion="slidingPill"
      brand="Acme"
      links={[
        { label: 'Product', href: '/product' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Docs', href: '/docs' },
      ]}
      active="Product"
      ctaLabel="Get started"
      ctaHref="/signup"
    />
  )
}
```

## Motions

`slidingPill, slidingUnderline, dotIndicator, growUnderline, textRoll, spotlight, glassFloat`

Use the `motion` prop on the wrapper component, or import a named variant directly (e.g. `SlidingPillNavbar`).

## Notes

- Same components as `@fossilui/react` — install one or the other, not both.
- No animation library required: CSS transitions plus the Web Animations API.
- Respects `prefers-reduced-motion`.
