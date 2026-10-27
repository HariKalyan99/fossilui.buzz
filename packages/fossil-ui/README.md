# @fossilui/react

Animated React components from [Fossil UI](https://fossilui.buzz): buttons, cards, modals, inputs, navbars, hero sections, alerts, and toasts. Motions are CSS and the Web Animations API — no animation library to install.

Live docs and configurators: https://fossilui.buzz/components

```jsx
import { Alert, Hero, Input, Modal, ToastProvider, toast } from '@fossilui/react'

<Hero motion="staggerWords" title="Ship polished interfaces faster" primaryLabel="Get started" />
<Input motion="floatingLabel" label="Email" type="email" />
<Alert motion="slide" tone="success" title="Published" description="The template is live." dismissible />
```

## Requirements

- React 18+
- [Tailwind CSS](https://tailwindcss.com) v4 (components use utility classes — they will not render correctly without it)
- `lucide-react` (icons and the button loading spinner)

## Install

```bash
npm install @fossilui/react lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

### Vite

```js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Tailwind

Scan the published package so Tailwind generates the utility classes the components use:

```css
@import "tailwindcss";

@source "../node_modules/@fossilui/react/dist";
```

Monorepo dev, when you import the source directly:

```css
@source "../packages/fossil-ui/src";
```

## Families

Import everything from `@fossilui/react`, or one family from its path. Every family is also published as a standalone package.

| Family | Import | Standalone package | Docs |
| --- | --- | --- | --- |
| Buttons | `@fossilui/react/buttons` | `@fossilui/buttons` | [/components/buttons](https://fossilui.buzz/components/buttons) |
| Cards | `@fossilui/react/cards` | `@fossilui/cards` | [/components/cards](https://fossilui.buzz/components/cards) |
| Modals | `@fossilui/react/modals` | `@fossilui/modals` | [/components/modals](https://fossilui.buzz/components/modals) |
| Inputs | `@fossilui/react/inputs` | `@fossilui/inputs` | [/components/inputs](https://fossilui.buzz/components/inputs) |
| Navbars | `@fossilui/react/navbars` | `@fossilui/navbars` | [/components/navbars](https://fossilui.buzz/components/navbars) |
| Heroes | `@fossilui/react/heroes` | `@fossilui/heroes` | [/components/heroes](https://fossilui.buzz/components/heroes) |
| Alerts | `@fossilui/react/alerts` | `@fossilui/alerts` | [/components/alerts](https://fossilui.buzz/components/alerts) |
| Toasts | `@fossilui/react/toasts` | `@fossilui/toasts` | [/components/toasts](https://fossilui.buzz/components/toasts) |

Each family has a wrapper (`Button`, `Card`, `Modal`, `Input`, `Navbar`, `Hero`, `Alert`) plus a named component for every motion. Pass `motion` on the wrapper, or import the named component.

| Family | `motion` values | Default |
| --- | --- | --- |
| Button | `rollText` `staggerText` `slideFill` `shineSweep` `borderReveal` `iconSlide` `underlineGrow` `liftShadow` `letterSpacing` `skewFill` | `liftShadow` |
| Card | `liftShadow` `borderGlow` `imageZoom` `shineSweep` `gradientShift` `scaleUp` `accentReveal` `tiltHover` | `liftShadow` |
| Modal | `scaleFade` `slideUp` `slideDown` `zoomBounce` `flip` `blurIn` `drawer` `bottomSheet` | `scaleFade` |
| Input | `focusGlow` `floatingLabel` `underlineGrow` `gradientBorder` `iconPop` `fillSweep` `placeholderSlide` `borderDraw` | `focusGlow` |
| Navbar | `slidingPill` `slidingUnderline` `dotIndicator` `growUnderline` `textRoll` `spotlight` `glassFloat` | `slidingPill` |
| Hero | `fadeUp` `staggerWords` `blurReveal` `scaleIn` `letterCascade` `gradientText` `spotlight` `typewriter` | `fadeUp` |
| Alert | `slide` `rise` `slideRight` `shake` `fade` `scale` `pop` `blur` | `slide` |
| Toast | `slide` `rise` `drop` `fade` `scale` `pop` `blur` `stack` | `slide` |

## Timing

Hover, focus, and enter/exit motions are CSS transitions. `duration` and `delay` are milliseconds. `easing` is any CSS timing function the browser accepts (`ease-out`, `linear`, `cubic-bezier(...)`). Leave a prop unset to keep that motion's own default. An easing the browser rejects is ignored.

```jsx
<Button motion="slideFill" duration={600} easing="linear" delay={40}>
  Get started
</Button>
```

Alerts play through with the Web Animations API, so they also take `direction`, `iterationCount`, `fillMode`, and `playState`.

Toasts use `duration` for how long the toast stays on screen (`0` keeps it until dismissed). Time the entrance with `enterDuration`, `easing`, and `delay`.

Every motion respects `prefers-reduced-motion`.

## Cards, modals, alerts, toasts

```jsx
import { useState } from 'react'
import { Alert, Card, Modal, ToastProvider, toast } from '@fossilui/react'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <ToastProvider>
      <Card
        motion="imageZoom"
        title="Field notes"
        description="A quiet study of the coast."
        imageSrc="https://example.com/cover.jpg"
        imageFallback="/cover.jpg"
        imageAlt="Coast at dusk"
      />

      <button type="button" onClick={() => setOpen(true)}>Open modal</button>
      <Modal
        motion="scaleFade"
        open={open}
        onClose={() => setOpen(false)}
        title="Publish this template?"
        description="It will be visible to everyone in your workspace."
        confirmLabel="Publish"
        cancelLabel="Cancel"
      />

      <Alert
        motion="rise"
        tone="success"
        title="Workspace updated"
        description="Teammates can see the latest changes."
        dismissible
      />

      <button type="button" onClick={() => toast.success('Changes saved')}>
        Save
      </button>
    </ToastProvider>
  )
}
```

`imageFallback` is shown when `imageSrc` fails to load. Modals are controlled: pass `open` and `onClose`. `toast()` needs a mounted `ToastProvider`. `toast.success`, `toast.info`, `toast.warning`, and `toast.error` set the tone. Tones for alerts and toasts are `info`, `success`, `warning`, and `error`.

`drawer` and `bottomSheet` also change where the modal sits. Navbar `links` are `{ label, href }`. Heroes take `title`, `description`, `eyebrow`, `primaryLabel`, and `align`.

## Buttons

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

All animated buttons share these props, plus standard `button` / `a` attributes:

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `autoInsertSpace` | Insert space between adjacent CJK characters in the label | `boolean` | `true` |
| `block` | Fit width to parent | `boolean` | `false` |
| `classNames` | Classes per semantic part (`root`, `icon`, `content`) | `object \| (info) => object` | — |
| `color` | `default` `primary` `secondary` `info` `teal` `cyan` `blue` `violet` `purple` `pink` `rose` `lime` `danger` `success` `warning` | `string` | per variant |
| `danger` | Shortcut for the danger color | `boolean` | `false` |
| `disabled` | Disabled state | `boolean` | `false` |
| `ghost` | Transparent background, colored text | `boolean` | `false` |
| `href` | Renders as `<a>` when set | `string` | — |
| `htmlType` | Native button `type` | `submit` `reset` `button` | `button` |
| `icon` | Icon node. `IconSlideButton` also uses this for the slide icon | `ReactNode` | — |
| `iconPlacement` | `start` `end` | `string` | `start` |
| `loading` | Loading state; optional `{ delay, icon }` | `boolean \| object` | `false` |
| `loadingIcon` | Custom loading spinner | `ReactNode` | `<Loader2 />` |
| `motion` | See the family table. Only the `<Button />` wrapper reads this | `string` | `liftShadow` |
| `shape` | `default` (rounded) `square` `round` (pill) | `string` | `default` |
| `size` | `small` `medium` `large` | `string` | `medium` |
| `styles` | Inline styles per semantic part | `object \| (info) => object` | — |
| `target` | Anchor `target` when `href` is set | `string` | — |
| `type` | Legacy Ant type (`primary`, `dashed`, `link`, `text`, `default`) | `string` | — |
| `variant` | `outlined` `dashed` `solid` `filled` `text` `link` | `string` | per component |
| `duration` | Transition length in ms | `number` | motion default |
| `easing` | CSS timing function | `string` | motion default |
| `delay` | Transition delay in ms | `number` | `0` |

`className` merges with the generated styles. Text animations (`rollText`, `staggerText`, `letterSpacing`) work best with string labels. Lighter fills such as `warning` and `lime` pick a contrast-aware foreground.

## Develop

```bash
npm install
npm run build:ui
```
