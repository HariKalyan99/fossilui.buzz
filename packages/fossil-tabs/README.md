# @fossilui/tabs

Animated tabs from [Fossil UI](https://fossilui.buzz) as a standalone package. Live docs and a configurator: https://fossilui.buzz/components/tabs

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4
- `lucide-react` is not required by tabs, and is only a peer so the package matches the rest of the library

## Install

```bash
npm install @fossilui/tabs
npm install -D tailwindcss @tailwindcss/vite
```

### CSS

```css
@import "tailwindcss";

@source "../node_modules/@fossilui/tabs/dist";
```

## Usage

```jsx
import { Tabs } from '@fossilui/tabs'

const items = [
  { value: 'overview', label: 'Overview', content: 'The indicator glides to the selected tab.' },
  { value: 'install', label: 'Install', content: 'Add the Tailwind @source line so the classes ship.' },
]

export default function App() {
  return <Tabs motion="pill" items={items} />
}
```

## Motions

`pill`, `underline`, `dot`, `grow`, `outline`, `glow`, `lift`, `fade`

Use `motion` on `Tabs`, or import a named variant (`PillTabs`, `UnderlineTabs`, `DotTabs`, `GrowTabs`, `OutlineTabs`, `GlowTabs`, `LiftTabs`, `FadeTabs`). `duration`, `easing`, and `delay` time the indicator. Arrow keys, Home, and End move the selection.

## Notes

- Same components as `@fossilui/react` — install one or the other, not both.
- Respects `prefers-reduced-motion`.
