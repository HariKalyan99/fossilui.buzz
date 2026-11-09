import {
  MOTION_TIMING_PROPS,
  TAILWIND_BASE_SNIPPET,
  VITE_SNIPPET,
  sharedFaqs,
  tailwindSourceSnippet,
} from './sharedDocs'

export const TOGGLES_PACKAGE = { label: 'Toggles', packageName: '@fossilui/react' }

export const TOGGLES_IMPORT_SNIPPETS = [
  {
    label: 'Install',
    code: `# Full component library
npm install @fossilui/react lucide-react

# Or one control family
npm install @fossilui/switch
npm install @fossilui/checkbox lucide-react
npm install @fossilui/radio

# Required — Tailwind v4 (Vite)
npm install -D tailwindcss @tailwindcss/vite`,
  },
  { label: 'Vite', code: VITE_SNIPPET },
  { label: 'Tailwind — @fossilui/react', code: tailwindSourceSnippet('@fossilui/react') },
  { label: 'Tailwind — base', code: TAILWIND_BASE_SNIPPET },
]

export const TOGGLES_IMPORT_SNIPPET = `// Full library
import { Switch, Checkbox, Radio } from '@fossilui/react'

// Or named variants
import { GlowSwitch, PopCheckbox, PulseRadio } from '@fossilui/react'

// Or a single family package
import { Switch } from '@fossilui/switch'
import { Checkbox } from '@fossilui/checkbox'
import { Radio } from '@fossilui/radio'`

export const RADIO_ITEMS = [
  { value: 'starter', label: 'Starter' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
]

function itemsLiteral(items) {
  const lines = items.map((item) => `    { value: '${item.value}', label: '${item.label}' },`).join('\n')
  return `items={[\n${lines}\n  ]}`
}

export function switchSnippet(attrs) {
  const lines = attrs.map((attr) => `  ${attr}`).join('\n')
  return `import { Switch } from '@fossilui/react'

<Switch
${lines}
/>`
}

export function checkboxSnippet(attrs) {
  const lines = attrs.map((attr) => `  ${attr}`).join('\n')
  return `import { Checkbox } from '@fossilui/react'

<Checkbox
${lines}
/>`
}

export function radioSnippet(attrs) {
  const lines = [...attrs, itemsLiteral(RADIO_ITEMS)].map((attr) => `  ${attr}`).join('\n')
  return `import { Radio } from '@fossilui/react'

<Radio
${lines}
/>`
}

/** Eight curated toggle variants across Switch, Checkbox, and Radio. */
export const TOGGLES_VARIANTS = [
  {
    id: 'switch-slide',
    group: 'Switch',
    kind: 'switch',
    motion: 'slide',
    component: 'SlideSwitch',
    name: 'Slide switch',
    description: 'The thumb glides across the track.',
    snippet: switchSnippet(['motion="slide"', 'defaultChecked', 'label="Airplane mode"']),
  },
  {
    id: 'switch-bounce',
    group: 'Switch',
    kind: 'switch',
    motion: 'bounce',
    component: 'BounceSwitch',
    name: 'Bounce switch',
    description: 'A lifted track and springy thumb overshoot.',
    snippet: switchSnippet(['motion="bounce"', 'defaultChecked', 'label="Airplane mode"']),
  },
  {
    id: 'switch-glow',
    group: 'Switch',
    kind: 'switch',
    motion: 'glow',
    component: 'GlowSwitch',
    name: 'Glow switch',
    description: 'An indigo glow marks the on state.',
    snippet: switchSnippet(['motion="glow"', 'defaultChecked', 'label="Airplane mode"']),
  },
  {
    id: 'checkbox-check',
    group: 'Checkbox',
    kind: 'checkbox',
    motion: 'check',
    component: 'CheckCheckbox',
    name: 'Check',
    description: 'The mark settles into the box.',
    snippet: checkboxSnippet(['motion="check"', 'defaultChecked', 'label="Send me product updates"']),
  },
  {
    id: 'checkbox-pop',
    group: 'Checkbox',
    kind: 'checkbox',
    motion: 'pop',
    component: 'PopCheckbox',
    name: 'Pop checkbox',
    description: 'A circular indigo pop confirms the selection.',
    snippet: checkboxSnippet(['motion="pop"', 'defaultChecked', 'label="Send me product updates"']),
  },
  {
    id: 'radio-scale',
    group: 'Radio',
    kind: 'radio',
    motion: 'scale',
    component: 'ScaleRadio',
    name: 'Scale radio',
    description: 'The dot scales into the ring.',
    snippet: radioSnippet(['motion="scale"', 'defaultValue="pro"']),
  },
  {
    id: 'radio-pulse',
    group: 'Radio',
    kind: 'radio',
    motion: 'pulse',
    component: 'PulseRadio',
    name: 'Pulse radio',
    description: 'A soft ring pulse marks the active choice.',
    snippet: radioSnippet(['motion="pulse"', 'defaultValue="pro"']),
  },
  {
    id: 'radio-glow',
    group: 'Radio',
    kind: 'radio',
    motion: 'glow',
    component: 'GlowRadio',
    name: 'Glow radio',
    description: 'An indigo glow highlights the selection.',
    snippet: radioSnippet(['motion="glow"', 'defaultValue="pro"']),
  },
]

export const TOGGLES_WHEN_TO_USE = [
  {
    title: 'Switch for immediate settings',
    body: 'Flip notifications, dark mode, or airplane mode — the change takes effect right away.',
  },
  {
    title: 'Checkbox for form choices',
    body: 'Pick zero or more options and submit later. Each box stands alone.',
  },
  {
    title: 'Radio for one of many',
    body: 'Exactly one option from a short list. Prefer a select when the list is long.',
  },
  {
    title: 'Motion confirms, not decorates',
    body: 'Use slide/check/scale for quiet UIs. Reach for bounce, pop, pulse, or glow when the change should feel louder.',
  },
]

export const TOGGLES_PROPS = [
  {
    property: 'motion (Switch)',
    description: 'slide, bounce, or glow.',
    type: "'slide' | 'bounce' | 'glow'",
    default: "'slide'",
  },
  {
    property: 'motion (Checkbox)',
    description: 'check or pop.',
    type: "'check' | 'pop'",
    default: "'check'",
  },
  {
    property: 'motion (Radio)',
    description: 'scale, pulse, or glow.',
    type: "'scale' | 'pulse' | 'glow'",
    default: "'scale'",
  },
  {
    property: 'checked / defaultChecked',
    description: 'Switch and Checkbox on/off state. Use onCheckedChange when controlled.',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'value / defaultValue',
    description: 'Radio selected value. Use onValueChange when controlled.',
    type: 'string',
    default: 'First item',
  },
  {
    property: 'items',
    description: 'Radio options: { value, label, disabled }.',
    type: 'Array',
    default: '[]',
  },
  {
    property: 'label',
    description: 'Visible label beside Switch or Checkbox.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'orientation',
    description: 'Radio layout: vertical stacks, horizontal wraps.',
    type: "'vertical' | 'horizontal'",
    default: "'vertical'",
  },
  {
    property: 'disabled',
    description: 'Prevents interaction and dims the control or group.',
    type: 'boolean',
    default: 'false',
  },
  ...MOTION_TIMING_PROPS,
]

export const TOGGLES_MOTION_COMPATIBILITY = [
  { motion: 'slide / check / scale', bestWith: 'settings and forms', limited: 'Marketing surfaces that need a louder confirm', notes: 'Quiet defaults.' },
  { motion: 'bounce / pop', bestWith: 'onboarding and product settings', limited: 'Dense admin tables', notes: 'Bounce lifts the track; pop is a circular indigo hit.' },
  { motion: 'pulse / glow', bestWith: 'branded product flows', limited: 'Print-like docs UIs', notes: 'Indigo draws the eye once.' },
]

export const TOGGLES_FAQS = [
  {
    q: 'Why are switches, checkboxes, and radios grouped?',
    a: 'They are small binary controls. The docs show eight curated variants across the three types instead of padding each family with filler motions.',
  },
  {
    q: 'Can I still install them separately?',
    a: 'Yes. Use @fossilui/switch, @fossilui/checkbox, or @fossilui/radio — or import all three from @fossilui/react.',
  },
  {
    q: 'Does Checkbox support indeterminate?',
    a: 'Not in this release. Use checked and unchecked for now.',
  },
  ...sharedFaqs('toggles', '@fossilui/react'),
]
