# @fossilui/alerts

Animated alert components from [Fossil UI](https://fossilui.buzz) as a standalone package. Live docs and a configurator: https://fossilui.buzz/components/alerts

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes — **you must install and configure Tailwind**)
- `lucide-react` (icons)

## Install

```bash
# Components
npm install @fossilui/alerts lucide-react

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

@source "../node_modules/@fossilui/alerts/dist";
```

## Usage

```jsx
import { Alert } from '@fossilui/alerts'

export default function App() {
  return (
    <Alert
      motion="slide"
      tone="success"
      title="Workspace updated"
      description="Teammates can see the latest changes."
      dismissible
    />
  )
}
```

## Motions

`slide, rise, slideRight, shake, fade, scale, pop, blur`

Use the `motion` prop on `Alert`, or import a named variant directly (e.g. `SlideAlert`). Tones are `info`, `success`, `warning`, and `error`.

Alerts play with the Web Animations API, so `duration`, `easing`, `delay`, `direction`, `iterationCount`, `fillMode`, and `playState` are available.

## Notes

- Same components as `@fossilui/react` — install one or the other, not both.
- No animation library required: CSS plus the Web Animations API.
- Respects `prefers-reduced-motion`.
