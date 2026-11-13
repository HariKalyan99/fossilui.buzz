# @fossilui/select

Animated select / listbox for React + Tailwind CSS v4. Same eight panel motions as `@fossilui/dropdown`.

## Install

```bash
npm install @fossilui/select lucide-react
```

Add the Tailwind `@source` line:

```css
@import "tailwindcss";
@source "../node_modules/@fossilui/select/dist";
```

## Usage

```jsx
import { Select } from '@fossilui/select'

const items = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
]

export function Example() {
  return (
    <Select
      motion="fade"
      placeholder="Pick a framework"
      defaultValue="react"
      items={items}
      onValueChange={(value) => console.log(value)}
    />
  )
}
```

## Motions

`fade` · `scale` · `slideDown` · `slideUp` · `blur` · `pop` · `rise` · `wipe`

Or import a named component: `FadeSelect`, `ScaleSelect`, `SlideDownSelect`, `SlideUpSelect`, `BlurSelect`, `PopSelect`, `RiseSelect`, `WipeSelect`.

## Docs

https://fossilui.buzz/components/select
