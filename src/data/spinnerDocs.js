import { INSTALL_SNIPPET, motionSnippet } from './sharedDocs'

export const SPINNER_IMPORT = `import { FossilSpinner } from '@fossilui/react'
// or: import { FossilSpinner, RingSpinner, DotsSpinner } from '@fossilui/react/spinners'`

export const SPINNER_VARIANTS = [
  {
    id: 'default',
    name: 'Default',
    component: 'DefaultSpinner',
    description: 'Classic spinning ring with indigo accent.',
    previewProps: { size: 'md', label: 'Loading' },
    snippet: motionSnippet('FossilSpinner', 'motion', 'default', 'size="md"\n  label="Loading content"'),
  },
  {
    id: 'ring',
    name: 'Ring',
    component: 'RingSpinner',
    description: 'Dual-tone ring for buttons and inline states.',
    previewProps: { size: 'md', label: 'Saving' },
    snippet: motionSnippet('FossilSpinner', 'motion', 'ring', 'size="md"\n  label="Saving changes"'),
  },
  {
    id: 'dots',
    name: 'Dots',
    component: 'DotsSpinner',
    description: 'Radial dot pattern for compact placeholders.',
    previewProps: { size: 'md', label: 'Loading' },
    snippet: motionSnippet('FossilSpinner', 'motion', 'dots', 'size="md"\n  label="Loading feed"'),
  },
]

export const SPINNER_PROPS = [
  { property: 'motion', description: 'Animation style preset.', type: "'default' | 'ring' | 'dots'", default: "'default'" },
  { property: 'size', description: 'Visual scale.', type: "'sm' | 'md' | 'lg'", default: "'md'" },
  { property: 'label', description: 'Accessible status text (aria-label).', type: 'string', default: "'Loading'" },
]

export const SPINNER_FAQS = [
  { q: 'Where should spinners appear?', a: 'Use inline spinners inside buttons or centered in content areas. Pair with skeleton loaders for page-level loading.' },
  { q: 'Are spinners accessible?', a: 'Each spinner exposes role="status" and aria-label from the label prop.' },
]

export const SPINNER_WHEN_TO_USE = [
  { title: 'Async actions', body: 'Ring and default spinners fit button loading states and form submissions.' },
  { title: 'Content placeholders', body: 'Dots work well in cards and list rows where a full ring would feel heavy.' },
]

export { INSTALL_SNIPPET as SPINNER_INSTALL_SNIPPET }
