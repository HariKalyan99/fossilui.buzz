import { INSTALL_SNIPPET, motionSnippet } from './sharedDocs'

export const MODAL_IMPORT = `import { Modal } from '@fossilui/react'
// or: import { Modal } from '@fossilui/react/modals'`

export const MODAL_VARIANTS = [
  { id: 'fade', name: 'Fade', component: 'FadeModal', description: 'Simple opacity transition.', snippet: motionSnippet('Modal', 'motion', 'fade', 'open={open}\n  onOpenChange={setOpen}\n  title="Confirm"\n  description="This action cannot be undone."') },
  { id: 'slideUp', name: 'Slide up', component: 'SlideUpModal', description: 'Panel rises from below.', snippet: motionSnippet('Modal', 'motion', 'slideUp', 'open={open}\n  onOpenChange={setOpen}\n  title="Invite teammate"') },
  { id: 'slideDown', name: 'Slide down', component: 'SlideDownModal', description: 'Panel drops from above.', snippet: motionSnippet('Modal', 'motion', 'slideDown', 'open={open}\n  onOpenChange={setOpen}\n  title="Announcement"') },
  { id: 'scale', name: 'Scale', component: 'ScaleModal', description: 'Subtle zoom-in entrance.', snippet: motionSnippet('Modal', 'motion', 'scale', 'open={open}\n  onOpenChange={setOpen}\n  title="Upgrade plan"') },
  { id: 'blurOverlay', name: 'Blur overlay', component: 'BlurOverlayModal', description: 'Stronger backdrop blur.', snippet: motionSnippet('Modal', 'motion', 'blurOverlay', 'open={open}\n  onOpenChange={setOpen}\n  title="Focus mode"') },
  { id: 'drawerRight', name: 'Drawer right', component: 'DrawerRightModal', description: 'Edge drawer for settings.', snippet: motionSnippet('Modal', 'motion', 'drawerRight', 'open={open}\n  onOpenChange={setOpen}\n  title="Settings"') },
]

export const MODAL_PROPS = [
  { property: 'motion', description: 'Enter/exit animation preset.', type: "'fade' | 'slideUp' | 'slideDown' | 'scale' | 'blurOverlay' | 'drawerRight'", default: "'fade'" },
  { property: 'open', description: 'Controlled open state.', type: 'boolean', default: 'false' },
  { property: 'onOpenChange', description: 'Called when open state should change.', type: '(open: boolean) => void', default: '—' },
  { property: 'title', description: 'Dialog heading.', type: 'string', default: '—' },
  { property: 'description', description: 'Supporting copy below the title.', type: 'string', default: '—' },
  { property: 'size', description: 'Max width preset.', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'" },
]

export const MODAL_FAQS = [
  { q: 'Does Modal trap focus?', a: 'The overlay blocks background scroll and Escape closes the dialog. Add your own focus trap if you need strict keyboard cycling.' },
  { q: 'Can I use custom content?', a: 'Yes — pass children for body content and footer for action rows.' },
]

export const MODAL_WHEN_TO_USE = [
  { title: 'Confirmations', body: 'Use slideUp or scale for delete and publish confirmations.' },
  { title: 'Settings panels', body: 'Drawer right works well for filters, preferences, and mobile-friendly panels.' },
]

export { INSTALL_SNIPPET as MODAL_INSTALL_SNIPPET }
