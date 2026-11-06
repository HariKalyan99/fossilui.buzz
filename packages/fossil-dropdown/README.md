# @fossilui/dropdown

Animated dropdown menus from [Fossil UI](https://fossilui.buzz) as a standalone package. Live docs and a configurator: https://fossilui.buzz/components/dropdown

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4
- `lucide-react` (chevron on the trigger)

## Install

```bash
npm install @fossilui/dropdown lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

### CSS

```css
@import "tailwindcss";

@source "../node_modules/@fossilui/dropdown/dist";
```

## Usage

```jsx
import { Dropdown } from '@fossilui/dropdown'

const items = [
  { value: 'edit', label: 'Edit' },
  { value: 'duplicate', label: 'Duplicate' },
  { value: 'delete', label: 'Delete', destructive: true },
]

export default function App() {
  return <Dropdown motion="fade" label="Actions" items={items} />
}
```

## Motions

`fade`, `scale`, `slideDown`, `slideUp`, `blur`, `pop`, `rise`, `wipe`

Use `motion` on `Dropdown`, or import a named variant (`FadeDropdown`, `ScaleDropdown`, `SlideDownDropdown`, `SlideUpDropdown`, `BlurDropdown`, `PopDropdown`, `RiseDropdown`, `WipeDropdown`). `duration`, `easing`, and `delay` time the panel. Arrow keys, Home, and End move the highlight while open; Escape closes.

## Notes

- Same components as `@fossilui/react` — install one or the other, not both.
- Respects `prefers-reduced-motion`.
