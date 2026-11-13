import { MOTION_TIMING_PROPS, importGuideSnippets, importSnippet, sharedFaqs } from './sharedDocs'

export const SELECT_PACKAGE = { label: 'Select', packageName: '@fossilui/select' }

export const SELECT_IMPORT_SNIPPETS = importGuideSnippets(SELECT_PACKAGE)

export const SELECT_IMPORT_SNIPPET = importSnippet({
  names: ['Select'],
  subpath: 'select',
  packageName: SELECT_PACKAGE.packageName,
})

export const SELECT_ITEMS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid', disabled: true },
]

function itemsLiteral(items) {
  const lines = items
    .map((item) => {
      const parts = [`value: '${item.value}'`, `label: '${item.label}'`]
      if (item.disabled) parts.push('disabled: true')
      return `    { ${parts.join(', ')} },`
    })
    .join('\n')
  return `items={[\n${lines}\n  ]}`
}

export function selectSnippet(attrs) {
  const lines = [...attrs, itemsLiteral(SELECT_ITEMS)].map((attr) => `  ${attr}`).join('\n')
  return `import { Select } from '@fossilui/react'

<Select
${lines}
/>`
}

export const SELECT_VARIANTS = [
  ['fade', 'FadeSelect', 'Fade', 'The list fades in under the trigger.'],
  ['scale', 'ScaleSelect', 'Scale', 'The panel scales up from the trigger edge.'],
  ['slideDown', 'SlideDownSelect', 'Slide down', 'The list drops from above the anchor.'],
  ['slideUp', 'SlideUpSelect', 'Slide up', 'The list rises from below when opened upward.'],
  ['blur', 'BlurSelect', 'Blur', 'A soft blur clears as the options appear.'],
  ['pop', 'PopSelect', 'Pop', 'The panel pops in with a springy scale.'],
  ['rise', 'RiseSelect', 'Rise', 'The list lifts into place with a short travel.'],
  ['wipe', 'WipeSelect', 'Wipe', 'A vertical wipe reveals the options.'],
].map(([motion, component, name, description]) => ({
  id: motion,
  name,
  description,
  component,
  motion,
  snippet: selectSnippet([`motion="${motion}"`, 'placeholder="Pick a framework"', 'defaultValue="react"']),
}))

export const SELECT_WHEN_TO_USE = [
  {
    title: 'Single choice from a list',
    body: 'Use Select when the user must pick one option and the list is longer than a few radios.',
  },
  {
    title: 'Forms and filters',
    body: 'Pair with Input for settings screens. Pass value and onValueChange when the parent owns the selection.',
  },
  {
    title: 'Keyboard parity',
    body: 'Arrow keys move the highlight, Enter chooses, Escape closes. The checkmark marks the current value.',
  },
  {
    title: 'When not to use',
    body: 'Do not use Select for actions (use Dropdown) or for yes/no (use Switch / Checkbox). Prefer Tabs when every choice should stay visible.',
  },
]

export const SELECT_PROPS = [
  {
    property: 'motion',
    description: 'fade, scale, slideDown, slideUp, blur, pop, rise, or wipe.',
    type: "'fade' | 'scale' | 'slideDown' | 'slideUp' | 'blur' | 'pop' | 'rise' | 'wipe'",
    default: "'fade'",
  },
  {
    property: 'items',
    description: 'Options in order. Each item is { value, label, disabled? }.',
    type: 'Array',
    default: '[]',
  },
  {
    property: 'value',
    description: 'Controlled selected value.',
    type: 'string',
    default: '—',
  },
  {
    property: 'defaultValue',
    description: 'Initial selection when `value` is unset.',
    type: 'string',
    default: "''",
  },
  {
    property: 'onValueChange',
    description: 'Called with the value (and item) when a row is chosen.',
    type: '(value: string, item) => void',
    default: '—',
  },
  {
    property: 'placeholder',
    description: 'Trigger text when nothing is selected.',
    type: 'string',
    default: "'Select…'",
  },
  {
    property: 'align',
    description: 'Horizontal alignment against the trigger.',
    type: "'start' | 'center' | 'end'",
    default: "'start'",
  },
  {
    property: 'open',
    description: 'Controlled open state.',
    type: 'boolean',
    default: '—',
  },
  {
    property: 'defaultOpen',
    description: 'Initial open state when `open` is unset.',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'onOpenChange',
    description: 'Called when the list opens or closes.',
    type: '(open: boolean) => void',
    default: '—',
  },
  {
    property: 'disabled',
    description: 'Disables the trigger and blocks open.',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'contained',
    description: 'Position the list inside the root instead of the document body. Docs previews use this.',
    type: 'boolean',
    default: 'false',
  },
  ...MOTION_TIMING_PROPS,
  {
    property: 'className',
    description: 'Extra classes on the root wrapper.',
    type: 'string',
    default: '—',
  },
]

export const SELECT_MOTION_COMPATIBILITY = SELECT_VARIANTS.map(({ motion, name, description }) => ({
  motion,
  bestWith: 'forms and filter bars',
  limited: 'lists with more than a dozen options without scroll',
  notes: description.split('.')[0] + '.',
}))

export const SELECT_FAQS = [
  {
    q: 'How is this different from Dropdown?',
    a: 'Dropdown is for actions. Select is for picking one value — the trigger shows the selection and options use role="option" with a checkmark.',
  },
  {
    q: 'Can I control the value?',
    a: 'Pass value and onValueChange, or leave them unset and use defaultValue for the first paint.',
  },
  ...sharedFaqs('selects', '@fossilui/select'),
]
