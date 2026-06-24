import { INSTALL_SNIPPET, motionSnippet } from './sharedDocs'

export const INPUT_IMPORT = `import { FossilInput } from '@fossilui/react'
// or: import { FossilInput, DefaultInput, UnderlineInput } from '@fossilui/react/inputs'`

export const INPUT_VARIANTS = [
  {
    id: 'default',
    name: 'Default',
    component: 'DefaultInput',
    description: 'Standard bordered text field with focus ring.',
    previewProps: { placeholder: 'Enter your name' },
    snippet: motionSnippet('FossilInput', 'motion', 'default', 'placeholder="Enter your name"'),
  },
  {
    id: 'underline',
    name: 'Underline',
    component: 'UnderlineInput',
    description: 'Bottom-border only — minimal forms and auth screens.',
    previewProps: { placeholder: 'Email address' },
    snippet: motionSnippet('FossilInput', 'motion', 'underline', 'placeholder="Email address"'),
  },
  {
    id: 'filled',
    name: 'Filled',
    component: 'FilledInput',
    description: 'Soft background fill for dense settings panels.',
    previewProps: { placeholder: 'Search settings…' },
    snippet: motionSnippet('FossilInput', 'motion', 'filled', 'placeholder="Search settings…"'),
  },
  {
    id: 'ghost',
    name: 'Ghost',
    component: 'GhostInput',
    description: 'Borderless until focus — inline edits and toolbars.',
    previewProps: { placeholder: 'Rename project' },
    snippet: motionSnippet('FossilInput', 'motion', 'ghost', 'placeholder="Rename project"'),
  },
  {
    id: 'ringGlow',
    name: 'Ring glow',
    component: 'RingGlowInput',
    description: 'Indigo glow on focus for hero signup forms.',
    previewProps: { placeholder: 'you@email.com', type: 'email' },
    snippet: motionSnippet('FossilInput', 'motion', 'ringGlow', 'type="email"\n  placeholder="you@email.com"'),
  },
  {
    id: 'compact',
    name: 'Compact',
    component: 'CompactInput',
    description: 'Smaller padding for tables and filter bars.',
    previewProps: { placeholder: 'Filter…' },
    snippet: motionSnippet('FossilInput', 'motion', 'compact', 'placeholder="Filter…"'),
  },
  {
    id: 'search',
    name: 'Search',
    component: 'SearchInput',
    description: 'Leading search icon with extra left padding.',
    previewProps: { placeholder: 'Search components…' },
    snippet: motionSnippet('FossilInput', 'motion', 'search', 'placeholder="Search components…"'),
  },
  {
    id: 'textarea',
    name: 'Textarea',
    component: 'TextareaInput',
    description: 'Multi-line field with matching chrome.',
    previewProps: { placeholder: 'Tell us more…', rows: 3 },
    snippet: motionSnippet('FossilInput', 'motion', 'textarea', 'placeholder="Tell us more…"\n  rows={4}'),
  },
  {
    id: 'select',
    name: 'Select',
    component: 'SelectInput',
    description: 'Native select with custom chevron styling.',
    previewProps: { defaultValue: 'starter' },
    snippet: `<FossilInput motion="select" defaultValue="starter">
  <option value="starter">Starter</option>
  <option value="pro">Pro</option>
</FossilInput>`,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    component: 'CheckboxInput',
    description: 'Accessible checkbox with optional label.',
    previewProps: { label: 'Remember me' },
    snippet: motionSnippet('FossilInput', 'motion', 'checkbox', 'label="Remember me"'),
  },
  {
    id: 'switch',
    name: 'Switch',
    component: 'SwitchInput',
    description: 'Toggle control for boolean preferences.',
    previewProps: { label: 'Email notifications' },
    snippet: motionSnippet('FossilInput', 'motion', 'switch', 'label="Email notifications"'),
  },
  {
    id: 'field',
    name: 'Field',
    component: 'FieldInput',
    description: 'Label, control, and hint wrapper.',
    previewProps: { label: 'Email', placeholder: 'you@email.com', hint: 'We never share your email.' },
    snippet: motionSnippet('FossilInput', 'motion', 'field', 'label="Email"\n  placeholder="you@email.com"\n  hint="We never share your email."'),
  },
  {
    id: 'error',
    name: 'Error',
    component: 'ErrorInput',
    description: 'Validation state with rose border and ring.',
    previewProps: { placeholder: 'Username', defaultValue: 'taken' },
    snippet: motionSnippet('FossilInput', 'motion', 'error', 'placeholder="Username"\n  defaultValue="taken"'),
  },
  {
    id: 'success',
    name: 'Success',
    component: 'SuccessInput',
    description: 'Positive validation feedback styling.',
    previewProps: { placeholder: 'Username', defaultValue: 'fossil-dev' },
    snippet: motionSnippet('FossilInput', 'motion', 'success', 'placeholder="Username"\n  defaultValue="fossil-dev"'),
  },
]

export const INPUT_PROPS = [
  { property: 'motion', description: 'Visual style preset for the control.', type: "'default' | 'underline' | 'filled' | 'ghost' | 'ringGlow' | 'compact' | 'search' | 'textarea' | 'select' | 'checkbox' | 'switch' | 'field' | 'error' | 'success'", default: "'default'" },
  { property: 'placeholder', description: 'Placeholder text for text-based controls.', type: 'string', default: '—' },
  { property: 'label', description: 'Label for checkbox, switch, and field variants.', type: 'string', default: '—' },
  { property: 'hint', description: 'Helper text below field variant controls.', type: 'string', default: '—' },
  { property: 'error', description: 'Forces error styling on Input and Textarea.', type: 'boolean', default: 'false' },
  { property: 'disabled', description: 'Disables interaction and dims the control.', type: 'boolean', default: 'false' },
]

export const INPUT_FAQS = [
  { q: 'Can I use FossilInput with react-hook-form?', a: 'Yes — pass ref and standard input props. Named variants like DefaultInput are thin wrappers if you prefer explicit imports.' },
  { q: 'Do I need separate imports for each style?', a: 'No — FossilInput accepts a motion prop. Import named variants only when tree-shaking or readability matters.' },
]

export const INPUT_WHEN_TO_USE = [
  { title: 'Auth and onboarding', body: 'Use underline or ringGlow for signup flows where focus states should feel polished without heavy custom CSS.' },
  { title: 'Settings and dashboards', body: 'Filled and compact variants fit dense filter bars, table headers, and admin panels.' },
]

export { INSTALL_SNIPPET as INPUT_INSTALL_SNIPPET }
