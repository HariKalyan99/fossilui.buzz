# @fossilui/tooltip

Animated tooltips from [Fossil UI](https://fossilui.buzz) as a standalone package. Live docs and a configurator: https://fossilui.buzz/components/tooltip

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4

## Install

```bash
npm install @fossilui/tooltip
npm install -D tailwindcss @tailwindcss/vite
```

### CSS

```css
@import "tailwindcss";

@source "../node_modules/@fossilui/tooltip/dist";
```

## Usage

```jsx
import { Tooltip } from '@fossilui/tooltip'

export default function App() {
  return (
    <Tooltip motion="fade" content="Copy link to clipboard">
      <button type="button">Share</button>
    </Tooltip>
  )
}
```

## Motions

`fade`, `scale`, `slide`, `rise`, `blur`, `pop`, `grow`, `lift`

Use `motion` on `Tooltip`, or import a named variant (`FadeTooltip`, `ScaleTooltip`, `SlideTooltip`, `RiseTooltip`, `BlurTooltip`, `PopTooltip`, `GrowTooltip`, `LiftTooltip`). `side` places the tip; `delayDuration` waits before hover or focus reveals it. On touch, tap the trigger to toggle.

## Notes

- Same components as `@fossilui/react` — install one or the other, not both.
- Respects `prefers-reduced-motion`.
