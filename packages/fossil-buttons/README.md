# @fossilui/buttons

Animated button components from Fossil UI as a standalone package.

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes — **you must install and configure Tailwind**)
- `lucide-react` (icons and loading spinner)

## Install

```bash
# Components
npm install @fossilui/buttons lucide-react

# Tailwind v4 (required — buttons will not render correctly without this)
npm install -D tailwindcss @tailwindcss/vite
```

### Vite

Add the Tailwind plugin in `vite.config.js`:

```js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### CSS

Scan the published package so Tailwind generates the utility classes used by the buttons:

```css
@import "tailwindcss";

@source "../node_modules/@fossilui/buttons/dist";
```

Import that CSS from your app entry (e.g. `src/main.jsx` → `import './index.css'`).

## Usage

```jsx
import { Button } from '@fossilui/buttons'

export default function App() {
  return (
    <>
      <Button motion="shineSweep">Get Started</Button>
      <Button motion="liftShadow">Alt CTA</Button>
    </>
  )
}
```

## Example template

```jsx
import { ButtonExample } from '@fossilui/buttons/example'
```

Mount `ButtonExample` in your app to preview all button variants quickly.

## Notes

- Supports the same semantic color palette and motion system as `@fossilui/react`.
- Foreground/hover text is contrast-aware for lighter fills and color-aware across motions.
