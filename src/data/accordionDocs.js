import { MOTION_TIMING_PROPS, importGuideSnippets, importSnippet, sharedFaqs } from './sharedDocs'

export const ACCORDION_PACKAGE = { label: 'Accordion', packageName: '@fossilui/accordion' }

export const ACCORDION_IMPORT_SNIPPETS = importGuideSnippets(ACCORDION_PACKAGE)

export const ACCORDION_IMPORT_SNIPPET = importSnippet({
  names: ['Accordion'],
  subpath: 'accordion',
  packageName: ACCORDION_PACKAGE.packageName,
})

export const ACCORDION_ITEMS = [
  { value: 'shipping', title: 'Shipping', content: 'Orders leave the studio within two business days.' },
  { value: 'returns', title: 'Returns', content: 'Unused items can come back within 30 days.' },
  { value: 'care', title: 'Care', content: 'Wipe with a dry cloth. Keep the piece out of prolonged sun.' },
]

function itemsLiteral() {
  const lines = ACCORDION_ITEMS.map(
    (item) => `    { value: '${item.value}', title: '${item.title}', content: '${item.content}' },`,
  ).join('\n')
  return `items={[\n${lines}\n  ]}`
}

export function accordionSnippet(attrs) {
  const lines = [...attrs, itemsLiteral()].map((attr) => `  ${attr}`).join('\n')
  return `import { Accordion } from '@fossilui/react'

<Accordion
${lines}
/>`
}

export const ACCORDION_VARIANTS = [
  ['height', 'HeightAccordion', 'Height', 'One bordered list. A chevron turns as the panel grows.'],
  ['fade', 'FadeAccordion', 'Fade', 'Bare rows and a plus that becomes a close mark. The open row tints indigo.'],
  ['slide', 'SlideAccordion', 'Slide', 'Separate bars. The open one grows an indigo rail and the arrow turns down.'],
  ['rise', 'RiseAccordion', 'Rise', 'Each question is its own card. The open card lifts off the page.'],
  ['scale', 'ScaleAccordion', 'Scale', 'The open question stays full size. The others shrink and fade back.'],
  ['blur', 'BlurAccordion', 'Blur', 'A dark stack. Closed questions stay blurred until one snaps into focus.'],
  ['pop', 'PopAccordion', 'Pop', 'Closed questions are pills. The open one pops into a dark card.'],
  ['wipe', 'WipeAccordion', 'Wipe', 'Numbered steps. The active number fills and the answer wipes open beside it.'],
].map(([motion, component, name, description]) => ({
  id: motion,
  name,
  description,
  component,
  motion,
  snippet: accordionSnippet([`motion="${motion}"`, 'defaultValue="shipping"']),
}))

export const ACCORDION_WHEN_TO_USE = [
  {
    title: 'Questions and details',
    body: 'Use an accordion for FAQs, shipping notes, and settings groups where most of the copy can stay closed.',
  },
  {
    title: 'One answer at a time',
    body: 'Single mode keeps the page short. The open panel is the one the reader is comparing against the heading.',
  },
  {
    title: 'Several answers at once',
    body: 'Multiple mode fits a comparison, such as plan details the reader wants to leave open side by side.',
  },
  {
    title: 'When not to use',
    body: 'Do not hide the primary action or a short form inside a panel. If every section should be visible, use headings instead.',
  },
]

export const ACCORDION_PROPS = [
  {
    property: 'motion',
    description: 'How the panel content arrives while the height opens. The chevron turns with the same timing.',
    type: "'height' | 'fade' | 'slide' | 'rise' | 'scale' | 'blur' | 'pop' | 'wipe'",
    default: "'height'",
  },
  {
    property: 'type',
    description: 'single keeps one panel open. multiple lets any combination stay open.',
    type: "'single' | 'multiple'",
    default: "'single'",
  },
  {
    property: 'collapsible',
    description: 'In single mode, the open panel can close. Ignored when type is multiple.',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'items',
    description: 'Panels in order. Each item is { value, title, content, disabled }.',
    type: 'Array',
    default: '[]',
  },
  {
    property: 'value',
    description: 'Controlled open value. A string in single mode, an array of strings in multiple mode.',
    type: 'string | string[]',
    default: '—',
  },
  {
    property: 'defaultValue',
    description: 'Initial open value. Single mode opens the first enabled panel when this is omitted.',
    type: 'string | string[]',
    default: 'First item',
  },
  {
    property: 'onValueChange',
    description: 'Called with the next open value.',
    type: '(value: string | string[]) => void',
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

export const ACCORDION_MOTION_COMPATIBILITY = [
  { motion: 'height', bestWith: 'FAQs and specs', limited: 'A reveal that should feel like new content arriving', notes: 'Default. Only the panel height and the chevron move.' },
  { motion: 'fade', bestWith: 'quiet settings groups', limited: 'Short panels where the fade is easy to miss', notes: 'Opacity rides along with the height.' },
  { motion: 'slide', bestWith: 'a section that continues the heading', limited: 'Very tall panels', notes: 'The copy starts slightly above and settles down.' },
  { motion: 'rise', bestWith: 'notes under a form field', limited: 'Panels pinned to the bottom of a card', notes: 'The copy comes up into the opening.' },
  { motion: 'scale', bestWith: 'a single featured answer', limited: 'A long list of equal questions', notes: 'Scale is anchored to the top of the panel.' },
  { motion: 'blur', bestWith: 'editorial details and product notes', limited: 'Dense data the reader is scanning', notes: 'The copy sharpens as the height opens.' },
  { motion: 'pop', bestWith: 'a confirmation or a short highlight', limited: 'Repeated toggling', notes: 'A tighter scale than the scale motion.' },
  { motion: 'wipe', bestWith: 'step-by-step details', limited: 'Content that should all appear at once', notes: 'The copy is uncovered from the top edge.' },
]

export const ACCORDION_FAQS = [
  {
    q: 'Can every panel start closed?',
    a: 'Yes. Pass defaultValue="" in single mode, or defaultValue={[]} in multiple mode. Omit defaultValue in single mode and the first panel opens.',
  },
  {
    q: 'Does the panel stay in the DOM while it is closed?',
    a: 'Yes. The content stays mounted and the height animates to zero, so a form field inside a panel keeps its state.',
  },
  ...sharedFaqs('accordions', '@fossilui/accordion'),
]
