# @fossilui/react

Publishable React components from [Fossil UI](https://fossilui.buzz). Buttons are the first category; cards, inputs, and more will land here over time.

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes)
- `lucide-react` (for icons and loading spinner)

## Install

```bash
# Components
npm install @fossilui/react lucide-react

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

## Tailwind

Scan the package so Tailwind picks up class names:

```css
@import "tailwindcss";
@source "../node_modules/@fossilui/react/dist";
```

Monorepo dev:

```css
@source "../packages/fossil-ui/src";
```

## Usage

```jsx
import { Button } from '@fossilui/react'
import { Mail } from 'lucide-react'

export function Demo() {
  return (
    <>
      <Button motion="slideFill" color="primary">
        Explore docs
      </Button>

      <Button motion="rollText" type="primary" size="large" loading>
        Submit
      </Button>

      <Button
        motion="liftShadow"
        danger
        block
        icon={<Mail className="h-3.5 w-3.5" />}
        iconPlacement="end"
        onClick={() => {}}
      >
        Delete
      </Button>

      <Button motion="underlineGrow" href="https://fossilui.buzz" target="_blank" variant="link">
        Visit site
      </Button>
    </>
  )
}
```

## Button props

All animated buttons share these props (plus standard `button` / `a` attributes):

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `autoInsertSpace` | Insert space between adjacent CJK characters in the label | `boolean` | `true` |
| `block` | Fit width to parent | `boolean` | `false` |
| `classNames` | Classes per semantic part (`root`, `icon`, `content`) | `object \| (info) => object` | — |
| `color` | `default` \| `primary` \| `secondary` \| `info` \| `teal` \| `cyan` \| `blue` \| `violet` \| `purple` \| `pink` \| `rose` \| `lime` \| `danger` \| `success` \| `warning` | `string` | per variant |
| `danger` | Shortcut for danger color | `boolean` | `false` |
| `disabled` | Disabled state | `boolean` | `false` |
| `ghost` | Transparent background, colored text | `boolean` | `false` |
| `href` | Renders as `<a>` when set | `string` | — |
| `htmlType` | Native button `type` | `submit` \| `reset` \| `button` | `button` |
| `icon` | Icon node (`IconSlideButton` also uses this for the slide icon) | `ReactNode` | — |
| `iconPlacement` | `start` \| `end` | `string` | `start` |
| `loading` | Loading state; optional `{ delay, icon }` | `boolean \| object` | `false` |
| `loadingIcon` | Custom loading spinner | `ReactNode` | `<Loader2 />` |
| `motion` | Only for `<Button />`: `rollText` \| `staggerText` \| `slideFill` \| `shineSweep` \| `borderReveal` \| `iconSlide` \| `underlineGrow` \| `liftShadow` \| `letterSpacing` \| `skewFill` | `string` | `liftShadow` |
| `shape` | `default` (rounded) \| `square` (no rounded edges) \| `round` (pill) | `string` | `default` |
| `size` | `small` \| `medium` \| `large` | `string` | `medium` |
| `styles` | Inline styles per semantic part | `object \| (info) => object` | — |
| `target` | Anchor `target` when `href` is set | `string` | — |
| `type` | Legacy Ant type (`primary`, `dashed`, `link`, `text`, `default`) | `string` | — |
| `variant` | `outlined` \| `dashed` \| `solid` \| `filled` \| `text` \| `link` | `string` | per component |

`className` merges with generated styles. Text animations (`RollText`, `Stagger`, `LetterSpacing`) work best with string labels.

## Animated variants

| Export | Effect |
|--------|--------|
| `RollTextButton` | Label rolls upward on hover |
| `StaggerTextButton` | Letters lift with staggered delay |
| `SlideFillButton` | Fill scales up from bottom |
| `ShineSweepButton` | Diagonal shine sweep |
| `BorderRevealButton` | Top/bottom borders grow from center |
| `IconSlideButton` | Icon slides in from the left |
| `UnderlineGrowButton` | Underline expands from center |
| `LiftShadowButton` | Lifts with shadow |
| `LetterSpacingButton` | Tracking widens on hover |
| `SkewFillButton` | Skewed panel slides in |

## Notes

- `Button` configurator on docs is two-way synced: control changes update code, and valid code edits update controls + preview.
- Semantic colors include contrast-aware foreground handling for lighter fills (for example `warning` and `lime`) and color-aware hover accents across motions like `slideFill` and `staggerText`.

## Develop

```bash
npm install
npm run build:ui
```
