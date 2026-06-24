import { INSTALL_SNIPPET } from './sharedDocs'

export const ALERT_IMPORT = `import { FossilAlert } from '@fossilui/react'
// or: import { FossilAlert, InfoAlert, SuccessAlert } from '@fossilui/react/alerts'`

export const ALERT_VARIANTS = [
  {
    id: 'info',
    name: 'Info',
    component: 'InfoAlert',
    description: 'Neutral guidance and contextual tips.',
    previewProps: { title: 'Heads up', children: 'Your trial ends in 3 days.' },
    snippet: `<FossilAlert variant="info" title="Heads up">
  Your trial ends in 3 days.
</FossilAlert>`,
  },
  {
    id: 'success',
    name: 'Success',
    component: 'SuccessAlert',
    description: 'Confirm completed actions.',
    previewProps: { title: 'Saved', children: 'Your changes were published.' },
    snippet: `<FossilAlert variant="success" title="Saved">
  Your changes were published.
</FossilAlert>`,
  },
  {
    id: 'warning',
    name: 'Warning',
    component: 'WarningAlert',
    description: 'Caution before irreversible steps.',
    previewProps: { title: 'Review required', children: 'Some fields need attention before submit.' },
    snippet: `<FossilAlert variant="warning" title="Review required">
  Some fields need attention before submit.
</FossilAlert>`,
  },
  {
    id: 'danger',
    name: 'Danger',
    component: 'DangerAlert',
    description: 'Errors and destructive action feedback.',
    previewProps: { title: 'Payment failed', children: 'Update your card to restore access.' },
    snippet: `<FossilAlert variant="danger" title="Payment failed">
  Update your card to restore access.
</FossilAlert>`,
  },
]

export const ALERT_PROPS = [
  { property: 'variant', description: 'Semantic color and tone preset.', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'" },
  { property: 'title', description: 'Bold heading line.', type: 'string', default: '—' },
  { property: 'children', description: 'Supporting body copy.', type: 'ReactNode', default: '—' },
  { property: 'motion', description: 'Optional entrance or accent styling.', type: "'default' | 'slideIn' | 'borderGlow' | 'accentBar'", default: "'default'" },
]

export const ALERT_FAQS = [
  { q: 'Should alerts be dismissible?', a: 'The base Alert is static. Wrap it with your own close button and conditional render for dismissible banners.' },
  { q: 'Can I use alerts inside forms?', a: 'Yes — place them above the form or inline next to fields for validation summaries.' },
]

export const ALERT_WHEN_TO_USE = [
  { title: 'Inline feedback', body: 'Use success and danger variants after form submit or API responses.' },
  { title: 'Proactive guidance', body: 'Info and warning alerts work well above settings sections or checkout steps.' },
]

export { INSTALL_SNIPPET as ALERT_INSTALL_SNIPPET }
