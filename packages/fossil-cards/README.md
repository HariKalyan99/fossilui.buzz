# @fossilui/cards

Animated card components from Fossil UI as a standalone package.

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes)

## Install

```bash
npm install @fossilui/cards

npm install -D tailwindcss @tailwindcss/vite
```

### CSS

```css
@import "tailwindcss";

@source "../node_modules/@fossilui/cards/dist";
```

## Usage

```jsx
import { Card } from '@fossilui/cards'

export default function App() {
  return (
    <Card
      motion="liftShadow"
      imageSrc="/preview.jpg"
      imageAlt="Preview"
      title="Fossil UI"
      description="Production-ready components for modern developers."
    />
  )
}
```

## Motions

`liftShadow` · `borderGlow` · `imageZoom` · `shineSweep` · `gradientShift` · `scaleUp` · `accentReveal` · `tiltHover`

Or import named variants: `LiftShadowCard`, `ImageZoomCard`, etc.

Full library: `@fossilui/react` also exports cards from `@fossilui/react/cards`.
