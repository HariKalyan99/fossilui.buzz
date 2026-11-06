import { MOTION_TIMING_PROPS, importGuideSnippets, importSnippet, sharedFaqs } from './sharedDocs'

export const TOOLTIP_PACKAGE = { label: 'Tooltip', packageName: '@fossilui/tooltip' }

export const TOOLTIP_IMPORT_SNIPPETS = importGuideSnippets(TOOLTIP_PACKAGE)

export const TOOLTIP_IMPORT_SNIPPET = importSnippet({
  names: ['Tooltip'],
  subpath: 'tooltip',
  packageName: TOOLTIP_PACKAGE.packageName,
})

export const TOOLTIP_DEMO_LABEL = 'Share'

export function tooltipSnippet(attrs) {
  const lines = attrs.map((attr) => `  ${attr}`).join('\n')
  return `import { Tooltip } from '@fossilui/react'

<Tooltip
${lines}
>
  <button type="button">${TOOLTIP_DEMO_LABEL}</button>
</Tooltip>`
}

export const TOOLTIP_VARIANTS = [
  ['fade', 'FadeTooltip', 'Fade', 'The tip fades in after a short hover delay.'],
  ['scale', 'ScaleTooltip', 'Scale', 'The bubble scales up from the anchor point.'],
  ['slide', 'SlideTooltip', 'Slide', 'The tip slides a few pixels into place.'],
  ['rise', 'RiseTooltip', 'Rise', 'The bubble rises slightly as it appears.'],
  ['blur', 'BlurTooltip', 'Blur', 'Blur clears as the tooltip sharpens.'],
  ['pop', 'PopTooltip', 'Pop', 'A quick pop scale draws attention.'],
  ['grow', 'GrowTooltip', 'Grow', 'The label grows horizontally from the center.'],
  ['lift', 'LiftTooltip', 'Lift', 'The tip lifts with a soft shadow.'],
].map(([motion, component, name, description]) => ({
  id: motion,
  name,
  description,
  component,
  motion,
  snippet: tooltipSnippet([`motion="${motion}"`, 'content="Copy link to clipboard"']),
}))

export const TOOLTIP_WHEN_TO_USE = [
  {
    title: 'Icon-only controls',
    body: 'Add a tooltip when the control has no visible label but still needs a short explanation.',
  },
  {
    title: 'Hover and focus',
    body: 'The tip opens on pointer hover and keyboard focus so both mouse and tab users get the same hint.',
  },
  {
    title: 'Touch screens',
    body: 'On touch, tap the trigger to toggle the tip. Tap elsewhere to dismiss when using sticky preview modes.',
  },
  {
    title: 'When not to use',
    body: 'Do not put essential instructions only in a tooltip. Use visible helper text for required form guidance.',
  },
]

export const TOOLTIP_PROPS = [
  {
    property: 'motion',
    description: 'fade, scale, slide, rise, blur, pop, grow, or lift.',
    type: "'fade' | 'scale' | 'slide' | 'rise' | 'blur' | 'pop' | 'grow' | 'lift'",
    default: "'fade'",
  },
  {
    property: 'content',
    description: 'Text or node shown in the bubble.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'children',
    description: 'Single focusable trigger element.',
    type: 'ReactElement',
    default: '—',
  },
  {
    property: 'side',
    description: 'Preferred placement relative to the trigger.',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
  },
  {
    property: 'delayDuration',
    description: 'Milliseconds to wait before showing on hover or focus.',
    type: 'number',
    default: '400',
  },
  {
    property: 'contained',
    description: 'Keep the tip inside the root for contained previews.',
    type: 'boolean',
    default: 'false',
  },
  ...MOTION_TIMING_PROPS,
  {
    property: 'className',
    description: 'Extra classes on the tooltip bubble.',
    type: 'string',
    default: '—',
  },
]

export const TOOLTIP_MOTION_COMPATIBILITY = TOOLTIP_VARIANTS.map(({ motion, description }) => ({
  motion,
  bestWith: 'icon buttons and compact toolbars',
  limited: 'long paragraphs of help text',
  notes: description.split('.')[0] + '.',
}))

export const TOOLTIP_FAQS = [
  {
    q: 'Why does the tooltip wait before showing?',
    a: 'delayDuration prevents tips from flashing when the pointer crosses the trigger. Focus shows the same delay unless reduced motion is enabled.',
  },
  {
    q: 'Can I put rich content inside?',
    a: 'content accepts React nodes, but keep tooltips short. Use a popover or modal for longer content.',
  },
  ...sharedFaqs('tooltips', '@fossilui/tooltip'),
]
