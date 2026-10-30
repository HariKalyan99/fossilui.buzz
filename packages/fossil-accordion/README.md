# @fossilui/accordion

Accordion from [Fossil UI](https://fossilui.buzz) as a standalone package. Live docs and a configurator: https://fossilui.buzz/components/accordion

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4
- `lucide-react` (the chevron)

## Install

```bash
npm install @fossilui/accordion lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

### CSS

```css
@import "tailwindcss";

@source "../node_modules/@fossilui/accordion/dist";
```

## Usage

```jsx
import { Accordion } from '@fossilui/accordion'

const items = [
  { value: 'shipping', title: 'Shipping', content: 'Orders leave within two business days.' },
  { value: 'returns', title: 'Returns', content: 'Unused items can come back within 30 days.' },
]

export default function App() {
  return <Accordion motion="height" items={items} defaultValue="shipping" />
}
```

## Motions

`height`, `fade`, `slide`, `rise`, `scale`, `blur`, `pop`, `wipe`

`type="single"` keeps one panel open. `type="multiple"` lets several stay open. `collapsible` lets the open panel close in single mode. `duration`, `easing`, and `delay` time the panel and the chevron. Named variants are `HeightAccordion`, `FadeAccordion`, `SlideAccordion`, `RiseAccordion`, `ScaleAccordion`, `BlurAccordion`, `PopAccordion`, and `WipeAccordion`.

## Notes

- Same components as `@fossilui/react` — install one or the other, not both.
- Respects `prefers-reduced-motion`.
