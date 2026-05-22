# @fossilui/react

Publishable React components from [Fossil UI](https://fossilui.buzz). Buttons are the first category; cards, inputs, and more will land here over time.

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes)
- `lucide-react` (for `IconSlideButton`)

## Install

```bash
npm install @fossilui/react lucide-react
```

## Tailwind

Scan the package so Tailwind picks up class names:

```css
/* app.css */
@import "tailwindcss";
@source "../node_modules/@fossilui/react/dist";
```

When developing inside this monorepo:

```css
@source "../packages/fossil-ui/src";
```

## Usage

```jsx
import { RollTextButton, StaggerTextButton } from '@fossilui/react'
// or
import { ShineSweepButton } from '@fossilui/react/buttons'

export function Demo() {
  return (
    <>
      <RollTextButton>Get started</RollTextButton>
      <StaggerTextButton>Explore</StaggerTextButton>
    </>
  )
}
```

## Button variants

| Export | Effect |
|--------|--------|
| `RollTextButton` | Label rolls upward on hover |
| `StaggerTextButton` | Letters lift with staggered delay |
| `SlideFillButton` | Fill scales up from bottom |
| `ShineSweepButton` | Diagonal shine sweep |
| `BorderRevealButton` | Top/bottom borders grow from center |
| `IconSlideButton` | Arrow slides in from the left |
| `UnderlineGrowButton` | Underline expands from center |
| `LiftShadowButton` | Lifts with indigo shadow |
| `LetterSpacingButton` | Tracking widens on hover |
| `SkewFillButton` | Skewed panel slides in |

All buttons accept standard `button` props plus `className` for overrides.

## Develop in this repo

```bash
# from repository root
npm install
npm run build:ui
```
