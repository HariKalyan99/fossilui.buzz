# @fossilui/modals

Animated modal components from [Fossil UI](https://fossilui.buzz) as a standalone package. Live docs and a configurator: https://fossilui.buzz/components/modals

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes — **you must install and configure Tailwind**)
- `lucide-react` (icons)

## Install

```bash
# Components
npm install @fossilui/modals lucide-react

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

@source "../node_modules/@fossilui/modals/dist";
```

## Usage

```jsx
import { useState } from 'react'
import { Modal } from '@fossilui/modals'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal
        motion="scaleFade"
        title="Publish this template?"
        description="It will be visible to everyone in your workspace."
        confirmLabel="Publish"
        cancelLabel="Cancel"
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
```

## Motions

`scaleFade, slideUp, slideDown, zoomBounce, flip, blurIn, drawer, bottomSheet`

Use the `motion` prop on the wrapper component, or import a named variant directly (e.g. `ScaleFadeModal`).

## Notes

- Same components as `@fossilui/react` — install one or the other, not both.
- No animation library required: CSS transitions plus the Web Animations API.
- Respects `prefers-reduced-motion`.
