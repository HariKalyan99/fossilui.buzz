# @fossilui/inputs

Animated input components from [Fossil UI](https://fossilui.buzz) as a standalone package. Live docs and a configurator: https://fossilui.buzz/components/inputs

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes — **you must install and configure Tailwind**)
- `lucide-react` (icons)

## Install

```bash
# Components
npm install @fossilui/inputs lucide-react

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

@source "../node_modules/@fossilui/inputs/dist";
```

## Usage

```jsx
import { Input } from '@fossilui/inputs'

export default function App() {
  return (
    <Input
      motion="floatingLabel"
      label="Email address"
      type="email"
      helperText="We'll never share your email."
    />
  )
}
```

## Motions

`focusGlow, floatingLabel, underlineGrow, gradientBorder, iconPop, fillSweep, placeholderSlide, borderDraw`

Use the `motion` prop on the wrapper component, or import a named variant directly (e.g. `FloatingLabelInput`).

## Notes

- Same components as `@fossilui/react` — install one or the other, not both.
- No animation library required: CSS transitions plus the Web Animations API.
- Respects `prefers-reduced-motion`.
