# @fossilui/toasts

Animated toast notifications from [Fossil UI](https://fossilui.buzz) as a standalone package. Live docs and a configurator: https://fossilui.buzz/components/toasts

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes — **you must install and configure Tailwind**)
- `lucide-react` (icons)

## Install

```bash
# Components
npm install @fossilui/toasts lucide-react

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

@source "../node_modules/@fossilui/toasts/dist";
```

## Usage

Wrap the tree once, then call `toast()` from any event under that provider.

```jsx
import { ToastProvider, toast } from '@fossilui/toasts'

export default function App() {
  return (
    <ToastProvider motion="slide">
      <button type="button" onClick={() => toast.success('Changes saved')}>
        Save
      </button>
    </ToastProvider>
  )
}
```

`duration` is how long the toast stays visible. `0` keeps it until it is dismissed. `enterDuration`, `easing`, and `delay` time the entrance.

## Motions

`slide, rise, drop, fade, scale, pop, blur, stack`

Pass `motion` to `ToastProvider`. Tones are `info`, `success`, `warning`, and `error` — `toast.success('Saved')` sets the tone for you.

## Notes

- Same components as `@fossilui/react` — install one or the other, not both.
- No animation library required: CSS transitions plus the Web Animations API.
- Respects `prefers-reduced-motion`.
