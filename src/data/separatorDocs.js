import { INSTALL_SNIPPET, motionSnippet } from './sharedDocs'

export const SEPARATOR_IMPORT = `import { FossilSeparator } from '@fossilui/react'
// or: import { HorizontalSeparator, LabeledSeparator } from '@fossilui/react/separators'`

export const SEPARATOR_VARIANTS = [
  {
    id: 'horizontal',
    name: 'Horizontal',
    component: 'HorizontalSeparator',
    description: 'Full-width divider between stacked sections.',
    previewProps: { className: 'w-full max-w-[200px]' },
    snippet: motionSnippet('FossilSeparator', 'variant', 'horizontal', 'className="my-4"'),
  },
  {
    id: 'vertical',
    name: 'Vertical',
    component: 'VerticalSeparator',
    description: 'Column divider for toolbars and split layouts.',
    previewProps: { className: 'min-h-[32px]' },
    snippet: motionSnippet('FossilSeparator', 'variant', 'vertical', 'className="mx-3 min-h-[24px]"'),
  },
  {
    id: 'labeled',
    name: 'Labeled',
    component: 'LabeledSeparator',
    description: 'Center label between two lines — common in auth forms.',
    previewProps: { className: 'w-full max-w-[220px]' },
    snippet: motionSnippet('FossilSeparator', 'variant', 'labeled', 'label="or"\n  className="my-6"'),
  },
]

export const SEPARATOR_PROPS = [
  { property: 'variant', description: 'Orientation and label preset.', type: "'horizontal' | 'vertical' | 'labeled'", default: "'horizontal'" },
  { property: 'label', description: 'Center text for labeled variant.', type: 'string', default: "'or'" },
  { property: 'decorative', description: 'When true, omits separator semantics for purely visual dividers.', type: 'boolean', default: 'true' },
  { property: 'className', description: 'Spacing and sizing utilities.', type: 'string', default: '—' },
]

export const SEPARATOR_FAQS = [
  { q: 'How do I add spacing around separators?', a: 'Use margin utilities on className — e.g. my-4 for horizontal or mx-3 for vertical.' },
  { q: 'Can I change the labeled text?', a: 'Yes — pass label="continue with" or any short string for the centered caption.' },
]

export const SEPARATOR_WHEN_TO_USE = [
  { title: 'Section breaks', body: 'Horizontal separators divide content blocks on docs, settings, and profile pages.' },
  { title: 'Auth and split UI', body: 'Labeled separators work between social login and email forms; vertical ones split toolbar groups.' },
]

export { INSTALL_SNIPPET as SEPARATOR_INSTALL_SNIPPET }
