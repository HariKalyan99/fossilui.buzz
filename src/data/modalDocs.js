import { importGuideSnippets, importSnippet, sharedFaqs } from './sharedDocs'

export const MODAL_PACKAGE = { label: 'Modals', packageName: '@fossilui/modals' }

export const MODAL_IMPORT_SNIPPETS = importGuideSnippets(MODAL_PACKAGE)

export const MODAL_IMPORT_SNIPPET = importSnippet({
  names: ['Modal'],
  subpath: 'modals',
  packageName: MODAL_PACKAGE.packageName,
})

export const MODAL_DEMO = {
  title: 'Publish this template?',
  description: 'It will be visible to everyone in your workspace. You can unpublish it at any time.',
  confirmLabel: 'Publish',
  cancelLabel: 'Cancel',
}

/** Full copy-paste example: modals are controlled, so snippets include the open state. */
export function modalSnippet(attrs) {
  const lines = attrs.map((attr) => `        ${attr}`).join('\n')
  return `import { useState } from 'react'
import { Modal } from '@fossilui/react'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal
${lines}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}`
}

function demoSnippet(motion) {
  return modalSnippet([
    `motion="${motion}"`,
    `title="${MODAL_DEMO.title}"`,
    `description="${MODAL_DEMO.description}"`,
    `confirmLabel="${MODAL_DEMO.confirmLabel}"`,
    `cancelLabel="${MODAL_DEMO.cancelLabel}"`,
  ])
}

export const MODAL_VARIANTS = [
  {
    id: 'scale-fade',
    name: 'Scale fade',
    description: 'Panel grows from 95% while the backdrop fades in.',
    component: 'ScaleFadeModal',
    snippet: demoSnippet('scaleFade'),
  },
  {
    id: 'slide-up',
    name: 'Slide up',
    description: 'Rises from below with a soft ease-out.',
    component: 'SlideUpModal',
    snippet: demoSnippet('slideUp'),
  },
  {
    id: 'slide-down',
    name: 'Slide down',
    description: 'Drops in from the top, like a system prompt.',
    component: 'SlideDownModal',
    snippet: demoSnippet('slideDown'),
  },
  {
    id: 'zoom-bounce',
    name: 'Zoom bounce',
    description: 'Springy overshoot for celebratory moments.',
    component: 'ZoomBounceModal',
    snippet: demoSnippet('zoomBounce'),
  },
  {
    id: 'flip',
    name: 'Flip',
    description: 'Tilts forward in 3D perspective as it opens.',
    component: 'FlipModal',
    snippet: demoSnippet('flip'),
  },
  {
    id: 'blur-in',
    name: 'Blur in',
    description: 'Comes into focus from a soft blur.',
    component: 'BlurInModal',
    snippet: demoSnippet('blurIn'),
  },
  {
    id: 'drawer',
    name: 'Drawer',
    description: 'Full-height side panel that slides in from the right.',
    component: 'DrawerModal',
    snippet: demoSnippet('drawer'),
  },
  {
    id: 'bottom-sheet',
    name: 'Bottom sheet',
    description: 'Sheet anchored to the bottom edge — ideal on mobile.',
    component: 'BottomSheetModal',
    snippet: demoSnippet('bottomSheet'),
  },
]

export const MODAL_WHEN_TO_USE = [
  {
    title: 'Confirmations',
    body: 'ScaleFadeModal and BlurInModal keep focus on a single decision — publishing, deleting, or leaving with unsaved changes. Use tone="danger" for destructive actions.',
  },
  {
    title: 'Secondary workflows',
    body: 'DrawerModal suits settings, filters, and detail views that need more room while keeping the page visible behind it.',
  },
  {
    title: 'Mobile-first actions',
    body: 'BottomSheetModal and SlideUpModal sit within thumb reach on phones and feel native on touch devices.',
  },
  {
    title: 'Moments of delight',
    body: 'ZoomBounceModal and FlipModal work for success states, onboarding, and announcements — places where a bit of personality is welcome.',
  },
  {
    title: 'When not to use',
    body: 'Avoid modals for content users need to compare with the page, for long forms, or for non-blocking messages. Prefer inline panels or toasts there.',
  },
]

export const MODAL_PROPS = [
  {
    property: 'motion',
    description: 'Open/close animation when using the standard <Modal /> wrapper.',
    type: "'scaleFade' | 'slideUp' | 'slideDown' | 'zoomBounce' | 'flip' | 'blurIn' | 'drawer' | 'bottomSheet'",
    default: "'scaleFade'",
  },
  {
    property: 'open',
    description: 'Controls visibility. The modal stays mounted until its exit animation finishes.',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'onClose',
    description: 'Called on Escape, overlay click, the close button, and the cancel action.',
    type: '() => void',
    default: '—',
  },
  {
    property: 'onConfirm',
    description: 'Called by the confirm action. Falls back to onClose when omitted.',
    type: '() => void',
    default: '—',
  },
  {
    property: 'title',
    description: 'Dialog heading, wired to aria-labelledby.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'description',
    description: 'Supporting copy, wired to aria-describedby.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'children',
    description: 'Custom body content rendered between the description and the actions.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'confirmLabel',
    description: 'Shows the primary action button when set.',
    type: 'string',
    default: '—',
  },
  {
    property: 'cancelLabel',
    description: 'Shows the secondary action button when set.',
    type: 'string',
    default: '—',
  },
  {
    property: 'size',
    description: 'Max width of the panel. Ignored by the drawer, which is always full height.',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
  },
  {
    property: 'tone',
    description: 'Use danger for destructive confirmations — paints the confirm button rose.',
    type: "'default' | 'danger'",
    default: "'default'",
  },
  {
    property: 'closeOnOverlay',
    description: 'Close when the backdrop is clicked.',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'showClose',
    description: 'Show the animated close (×) button in the corner.',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'contained',
    description: 'Render inside the nearest positioned parent instead of a portal. Skips scroll lock and focus moves — for previews and embedded demos.',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'className',
    description: 'Extra classes merged onto the dialog panel.',
    type: 'string',
    default: '—',
  },
  {
    property: 'overlayClassName',
    description: 'Extra classes merged onto the backdrop, e.g. a darker tint.',
    type: 'string',
    default: '—',
  },
]

export const MODAL_MOTION_COMPATIBILITY = [
  {
    motion: 'scaleFade',
    bestWith: 'confirmations; any size; default and danger tones',
    limited: '—',
    notes: 'Safest default — subtle on every screen size.',
  },
  {
    motion: 'slideUp',
    bestWith: 'forms and multi-step flows',
    limited: 'Very tall panels on short screens',
    notes: 'Feels like content arriving from the page.',
  },
  {
    motion: 'slideDown',
    bestWith: 'system notices; command palettes',
    limited: 'Bottom-heavy layouts',
    notes: 'Pairs well with size="lg" search panels.',
  },
  {
    motion: 'zoomBounce',
    bestWith: 'success states; onboarding; announcements',
    limited: 'Destructive confirmations',
    notes: 'The overshoot reads as playful — keep it for positive moments.',
  },
  {
    motion: 'flip',
    bestWith: 'feature reveals; marketing pages',
    limited: 'Frequently opened dialogs',
    notes: 'Uses 3D perspective; opens instantly when reduced motion is on.',
  },
  {
    motion: 'blurIn',
    bestWith: 'focus moments; light backgrounds',
    limited: 'Low-end devices (blur is GPU heavy)',
    notes: 'Elegant on image-rich pages.',
  },
  {
    motion: 'drawer',
    bestWith: 'settings, filters, record details',
    limited: 'size prop (always full height)',
    notes: 'Use children for long content; it scrolls inside the panel.',
  },
  {
    motion: 'bottomSheet',
    bestWith: 'mobile actions; share menus',
    limited: 'Wide desktop layouts',
    notes: 'Width follows the size prop and stays centered on wide screens.',
  },
]

export const MODAL_FAQS = [
  {
    q: 'Is the modal accessible?',
    a: 'Yes. It renders role="dialog" with aria-modal, labels itself from title and description, closes on Escape, moves focus into the panel when opened, and restores focus to the trigger on close.',
  },
  {
    q: 'Why does the exit animation still play after open becomes false?',
    a: 'The modal keeps itself mounted for ~320ms after closing so the exit transition can finish, then unmounts. You only manage the open boolean.',
  },
  {
    q: 'Can I put a form inside?',
    a: 'Yes. Pass any JSX as children. Omit confirmLabel/cancelLabel and render your own submit buttons if the form needs custom actions.',
  },
  {
    q: 'How do I preview a modal inside a card or iframe-like area?',
    a: 'Set contained and give the parent position: relative. The overlay then covers just that box and page scroll is left alone.',
  },
  ...sharedFaqs('modals', MODAL_PACKAGE.packageName),
]
