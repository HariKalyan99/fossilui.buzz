import { MOTION_TIMING_PROPS, importGuideSnippets, importSnippet, sharedFaqs } from './sharedDocs'

export const DROPDOWN_PACKAGE = { label: 'Dropdown', packageName: '@fossilui/dropdown' }

export const DROPDOWN_IMPORT_SNIPPETS = importGuideSnippets(DROPDOWN_PACKAGE)

export const DROPDOWN_IMPORT_SNIPPET = importSnippet({
  names: ['Dropdown'],
  subpath: 'dropdown',
  packageName: DROPDOWN_PACKAGE.packageName,
})

export const DROPDOWN_ITEMS = [
  { value: 'edit', label: 'Edit' },
  { value: 'duplicate', label: 'Duplicate' },
  { value: 'archive', label: 'Archive' },
  { value: 'delete', label: 'Delete', destructive: true },
]

function itemsLiteral(items) {
  const lines = items
    .map((item) => {
      const parts = [`value: '${item.value}'`, `label: '${item.label}'`]
      if (item.destructive) parts.push('destructive: true')
      if (item.disabled) parts.push('disabled: true')
      return `    { ${parts.join(', ')} },`
    })
    .join('\n')
  return `items={[\n${lines}\n  ]}`
}

export function dropdownSnippet(attrs) {
  const lines = [...attrs, itemsLiteral(DROPDOWN_ITEMS)].map((attr) => `  ${attr}`).join('\n')
  return `import { Dropdown } from '@fossilui/react'

<Dropdown
${lines}
/>`
}

export const DROPDOWN_VARIANTS = [
  ['fade', 'FadeDropdown', 'Fade', 'The menu fades in under the trigger.'],
  ['scale', 'ScaleDropdown', 'Scale', 'The panel scales up from the trigger edge.'],
  ['slideDown', 'SlideDownDropdown', 'Slide down', 'The menu drops from above the anchor.'],
  ['slideUp', 'SlideUpDropdown', 'Slide up', 'The menu rises from below when opened upward.'],
  ['blur', 'BlurDropdown', 'Blur', 'A soft blur clears as the menu appears.'],
  ['pop', 'PopDropdown', 'Pop', 'The panel pops in with a springy scale.'],
  ['rise', 'RiseDropdown', 'Rise', 'The menu lifts into place with a short travel.'],
  ['wipe', 'WipeDropdown', 'Wipe', 'A vertical wipe reveals the items.'],
].map(([motion, component, name, description]) => ({
  id: motion,
  name,
  description,
  component,
  motion,
  snippet: dropdownSnippet([`motion="${motion}"`, 'label="Actions"']),
}))

export const DROPDOWN_WHEN_TO_USE = [
  {
    title: 'Secondary actions',
    body: 'Use a dropdown when several actions share one trigger and only one runs at a time.',
  },
  {
    title: 'Toolbar menus',
    body: 'Keep destructive actions at the bottom with `destructive: true` so the tone matches the risk.',
  },
  {
    title: 'Keyboard parity',
    body: 'Arrow keys move the highlight, Enter chooses, Escape closes. The trigger stays in the tab order.',
  },
  {
    title: 'When not to use',
    body: 'Do not hide required navigation in a menu. Prefer tabs or a navbar when every destination should stay visible.',
  },
]

export const DROPDOWN_PROPS = [
  {
    property: 'motion',
    description: 'fade, scale, slideDown, slideUp, blur, pop, rise, or wipe.',
    type: "'fade' | 'scale' | 'slideDown' | 'slideUp' | 'blur' | 'pop' | 'rise' | 'wipe'",
    default: "'fade'",
  },
  {
    property: 'items',
    description: 'Menu rows in order. Each item is { value, label, disabled?, destructive? }.',
    type: 'Array',
    default: '[]',
  },
  {
    property: 'label',
    description: 'Text on the trigger button.',
    type: 'string',
    default: "'Actions'",
  },
  {
    property: 'align',
    description: 'Horizontal alignment against the trigger.',
    type: "'start' | 'center' | 'end'",
    default: "'start'",
  },
  {
    property: 'side',
    description: 'Which side of the trigger the menu opens toward.',
    type: "'bottom' | 'top'",
    default: "'bottom'",
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
    description: 'Called when the menu opens or closes.',
    type: '(open: boolean) => void',
    default: '—',
  },
  {
    property: 'onSelect',
    description: 'Called with the item value when a row is chosen.',
    type: '(value: string, item) => void',
    default: '—',
  },
  {
    property: 'contained',
    description: 'Position the menu inside the root instead of the document body. Docs previews use this.',
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

export const DROPDOWN_MOTION_COMPATIBILITY = DROPDOWN_VARIANTS.map(({ motion, name, description }) => ({
  motion,
  bestWith: 'toolbars and row actions',
  limited: 'menus with more than eight items without scroll',
  notes: description.split('.')[0] + '.',
}))

export const DROPDOWN_FAQS = [
  {
    q: 'Does the menu work on touch?',
    a: 'Yes. Tap the trigger to open. Tap outside or choose a row to close. Arrow keys still work when the menu is open.',
  },
  {
    q: 'Can I control the open state?',
    a: 'Pass open and onOpenChange, or leave them unset and use defaultOpen for the first paint.',
  },
  ...sharedFaqs('dropdown menus', '@fossilui/dropdown'),
]
