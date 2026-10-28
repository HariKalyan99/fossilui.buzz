import { MOTION_TIMING_PROPS, importGuideSnippets, importSnippet, sharedFaqs } from './sharedDocs'

export const TAB_PACKAGE = { label: 'Tabs', packageName: '@fossilui/tabs' }

export const TAB_IMPORT_SNIPPETS = importGuideSnippets(TAB_PACKAGE)

export const TAB_IMPORT_SNIPPET = importSnippet({
  names: ['Tabs'],
  subpath: 'tabs',
  packageName: TAB_PACKAGE.packageName,
})

export const TAB_ITEMS = [
  { value: 'overview', label: 'Overview', content: 'Ship the pieces you import. The indicator glides to the selected tab.' },
  { value: 'install', label: 'Install', content: 'npm install @fossilui/react lucide-react, then add the Tailwind @source line.' },
  { value: 'motion', label: 'Motion', content: 'Pill fills the active tab. Underline draws a line under it. Arrow keys move between them.' },
]

function itemsLiteral(items, labelKey) {
  const lines = items
    .map(
      (item) =>
        `    { value: '${item.value}', ${labelKey}: '${item[labelKey]}', content: '${item.content}' },`,
    )
    .join('\n')
  return `items={[\n${lines}\n  ]}`
}

export function tabSnippet(attrs) {
  const lines = [...attrs, itemsLiteral(TAB_ITEMS, 'label')].map((attr) => `  ${attr}`).join('\n')
  return `import { Tabs } from '@fossilui/react'

<Tabs
${lines}
/>`
}

export const TAB_VARIANTS = [
  ['pill', 'PillTabs', 'Sliding pill', 'A filled thumb glides behind the label and the text turns white.'],
  ['underline', 'UnderlineTabs', 'Underline', 'A line slides along the baseline of the tab list.'],
  ['dot', 'DotTabs', 'Dot', 'A small dot settles under the selected label.'],
  ['grow', 'GrowTabs', 'Grow', 'The active label steps up, and a short mark grows under the word.'],
  ['outline', 'OutlineTabs', 'Outline', 'A ring slides onto the selected tab. The label stays dark.'],
  ['glow', 'GlowTabs', 'Glow', 'A soft indigo wash follows the selection.'],
  ['lift', 'LiftTabs', 'Lift', 'A white chip lifts under the active label.'],
  ['fade', 'FadeTabs', 'Fade', 'The active tab fades in place. Nothing slides.'],
].map(([motion, component, name, description]) => ({
  id: motion,
  name,
  description,
  component,
  motion,
  snippet: tabSnippet([`motion="${motion}"`]),
}))

export const TAB_WHEN_TO_USE = [
  {
    title: 'A few peer views',
    body: 'Use tabs when two to five panels share the same space and the user needs to compare them without leaving the page.',
  },
  {
    title: 'Pill inside a tool',
    body: 'The sliding pill reads as a segmented control. Use it for filters, billing periods, and settings that stay on one screen.',
  },
  {
    title: 'Underline on a page',
    body: 'The underline is quieter. Use it for documentation sections, profile pages, and anywhere a heavy thumb would compete with the content.',
  },
  {
    title: 'When not to use',
    body: 'Do not use tabs for a sequence of steps, or when every panel should stay visible. Prefer an accordion when the headings are the navigation.',
  },
]

export const TAB_PROPS = [
  {
    property: 'motion',
    description: 'pill, underline, dot, grow, outline, glow, lift, or fade.',
    type: "'pill' | 'underline' | 'dot' | 'grow' | 'outline' | 'glow' | 'lift' | 'fade'",
    default: "'pill'",
  },
  {
    property: 'items',
    description: 'Tabs in order. Each item is { value, label, content, disabled }.',
    type: 'Array',
    default: '[]',
  },
  {
    property: 'value',
    description: 'Controlled selected value. Leave it unset and the tabs manage their own selection.',
    type: 'string',
    default: '—',
  },
  {
    property: 'defaultValue',
    description: 'Initial selection when value is unset. Falls back to the first enabled tab.',
    type: 'string',
    default: 'First item',
  },
  {
    property: 'onValueChange',
    description: 'Called with the next value after a click or arrow key.',
    type: '(value: string) => void',
    default: '—',
  },
  ...MOTION_TIMING_PROPS,
  {
    property: 'className',
    description: 'Extra classes merged onto the root.',
    type: 'string',
    default: '—',
  },
]

export const TAB_MOTION_COMPATIBILITY = [
  { motion: 'pill', bestWith: 'filters and short toolbars', limited: 'Long labels that wrap', notes: 'Default. The thumb and the label color move together.' },
  { motion: 'underline', bestWith: 'page sections and documentation', limited: 'Dense toolbars', notes: 'The line sits on the baseline.' },
  { motion: 'dot', bestWith: 'short labels in a quiet header', limited: 'Tabs that need a large hit target to read as selected', notes: 'The dot is centered under the label.' },
  { motion: 'grow', bestWith: 'a section change that should feel planted', limited: 'Rapid switching, where a slide is easier to follow', notes: 'The label steps up and a short mark grows under the word. It does not slide.' },
  { motion: 'outline', bestWith: 'light surfaces next to form controls', limited: 'Dark page backgrounds', notes: 'The ring moves. The label stays dark.' },
  { motion: 'glow', bestWith: 'a single featured control in a settings row', limited: 'Long rows of equal tabs', notes: 'The wash is indigo and stays behind the label.' },
  { motion: 'lift', bestWith: 'cards and panels that already use a soft shadow', limited: 'Flat documentation pages', notes: 'A white chip slides under the label.' },
  { motion: 'fade', bestWith: 'places where sliding would feel busy', limited: 'Users who need a moving cue to see what changed', notes: 'The fill fades in place. Arrow keys still move the selection.' },
]

export const TAB_FAQS = [
  {
    q: 'How does keyboard navigation work?',
    a: 'The selected tab is in the tab order. Arrow keys move the selection, and Home and End jump to the ends. Disabled tabs are skipped.',
  },
  {
    q: 'Can I control the selected tab?',
    a: 'Yes. Pass value and onValueChange. Leave value unset to let the component keep the selection itself, and use defaultValue for the first paint.',
  },
  ...sharedFaqs('tabs', '@fossilui/tabs'),
]
