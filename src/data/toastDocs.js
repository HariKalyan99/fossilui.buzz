import { importGuideSnippets, importSnippet, sharedFaqs } from './sharedDocs'

export const TOAST_PACKAGE = { label: 'Toasts', packageName: '@fossilui/toasts' }

export const TOAST_IMPORT_SNIPPETS = importGuideSnippets(TOAST_PACKAGE)

export const TOAST_IMPORT_SNIPPET = importSnippet({
  names: ['ToastProvider', 'toast'],
  subpath: 'toasts',
  packageName: TOAST_PACKAGE.packageName,
})

export const TOAST_DEMO = {
  title: 'Changes saved',
  description: 'Your draft is up to date.',
  tone: 'success',
  duration: 4500,
}

export function toastSnippet({ motion, title, description, tone, duration, enterDuration, easing, delay }) {
  const fields = [
    `title: '${String(title).replace(/'/g, "\\'")}'`,
    description ? `description: '${String(description).replace(/'/g, "\\'")}'` : null,
    `tone: '${tone}'`,
    Number(duration) !== TOAST_DEMO.duration ? `duration: ${Number(duration) || 0}` : null,
    enterDuration != null && enterDuration !== '' && Number.isFinite(Number(enterDuration))
      ? `enterDuration: ${Number(enterDuration)}`
      : null,
    easing ? `easing: '${String(easing).replace(/'/g, "\\'")}'` : null,
    delay != null && delay !== '' && Number(delay) !== 0 && Number.isFinite(Number(delay)) ? `delay: ${Number(delay)}` : null,
  ].filter(Boolean)

  return `import { ToastProvider, toast } from '@fossilui/react'

export function Example() {
  return (
    <ToastProvider motion="${motion}">
      <button
        onClick={() =>
          toast({
            ${fields.join(',\n            ')}
          })
        }
      >
        Show toast
      </button>
    </ToastProvider>
  )
}`
}

export const TOAST_VARIANTS = [
  {
    id: 'slide',
    name: 'Slide',
    description: 'Slides in from the right and lists downward. A bar counts down to dismiss.',
    motion: 'slide',
    tone: 'success',
    title: TOAST_DEMO.title,
    snippet: toastSnippet({ motion: 'slide', ...TOAST_DEMO }),
  },
  {
    id: 'rise',
    name: 'Rise',
    description: 'Lifts up into the corner, like a message leaving the page.',
    motion: 'rise',
    tone: 'info',
    title: 'Link copied',
    snippet: toastSnippet({ motion: 'rise', ...TOAST_DEMO, tone: 'info', title: 'Link copied' }),
  },
  {
    id: 'drop',
    name: 'Drop',
    description: 'Drops in from above the corner.',
    motion: 'drop',
    tone: 'warning',
    title: 'Storage almost full',
    snippet: toastSnippet({ motion: 'drop', ...TOAST_DEMO, tone: 'warning', title: 'Storage almost full' }),
  },
  {
    id: 'fade',
    name: 'Fade',
    description: 'Appears in place. The quietest toast.',
    motion: 'fade',
    tone: 'info',
    title: TOAST_DEMO.title,
    snippet: toastSnippet({ motion: 'fade', ...TOAST_DEMO, tone: 'info' }),
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'Grows from 95% as it fades in.',
    motion: 'scale',
    tone: 'success',
    title: TOAST_DEMO.title,
    snippet: toastSnippet({ motion: 'scale', ...TOAST_DEMO }),
  },
  {
    id: 'pop',
    name: 'Pop',
    description: 'Springs in with a small overshoot.',
    motion: 'pop',
    tone: 'success',
    title: 'Invite sent',
    snippet: toastSnippet({ motion: 'pop', ...TOAST_DEMO, title: 'Invite sent' }),
  },
  {
    id: 'blur',
    name: 'Blur',
    description: 'Sharpens into focus from a soft blur.',
    motion: 'blur',
    tone: 'info',
    title: 'Syncing finished',
    snippet: toastSnippet({ motion: 'blur', ...TOAST_DEMO, tone: 'info', title: 'Syncing finished' }),
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'Newest toast sits in front. Older ones scale back and peek out underneath.',
    motion: 'stack',
    tone: 'info',
    title: 'Invite sent',
    snippet: toastSnippet({ motion: 'stack', ...TOAST_DEMO, tone: 'info', title: 'Invite sent' }),
  },
]

export const TOAST_WHEN_TO_USE = [
  {
    title: 'Background results',
    body: 'Saved, copied, sent, failed. The page stays put and the toast leaves on its own.',
  },
  {
    title: 'A burst of events',
    body: 'Stack keeps a pile readable when several things finish together. Slide is clearer when each message should be read in full.',
  },
  {
    title: 'Sticky errors',
    body: 'Pass duration={0} when the user must dismiss it — a failed payment, a lost connection. Hover pauses the countdown on the others.',
  },
  {
    title: 'When not to use',
    body: 'Do not use a toast for a choice (use a modal) or for an error that must stay next to a field (use an alert).',
  },
]

export const TOAST_PROPS = [
  {
    property: 'motion',
    description: 'How the viewport arranges toasts. Set on ToastProvider, not on each toast.',
    type: "'slide' | 'rise' | 'drop' | 'fade' | 'scale' | 'pop' | 'blur' | 'stack'",
    default: "'slide'",
  },
  {
    property: 'contained',
    description: 'Draw inside the nearest positioned parent instead of a portal. For previews and embedded demos.',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'title',
    description: 'Passed to toast(). Also accepts a string: toast("Saved") or toast.success("Saved").',
    type: 'string',
    default: '—',
  },
  {
    property: 'description',
    description: 'Second line under the title.',
    type: 'string',
    default: '—',
  },
  {
    property: 'tone',
    description: 'Color and icon. toast.success, toast.error, toast.warning, and toast.info set this for you.',
    type: "'info' | 'success' | 'warning' | 'error'",
    default: "'info'",
  },
  {
    property: 'duration',
    description: 'Milliseconds the toast stays visible. 0 keeps it until it is closed. Hover pauses the timer. This is not the entrance length.',
    type: 'number',
    default: '4500',
  },
  {
    property: 'enterDuration',
    description: 'Entrance transition length, in milliseconds. Capped at 30000. Invalid values are ignored and the motion default is kept.',
    type: 'number',
    default: 'Per motion',
  },
  {
    property: 'easing',
    description: 'CSS timing function for the entrance. An easing the browser rejects is ignored.',
    type: 'string',
    default: 'Per motion',
  },
  {
    property: 'delay',
    description: 'Entrance delay in milliseconds. A negative delay starts the entrance part-way through.',
    type: 'number',
    default: '0',
  },
  {
    property: 'children',
    description: 'ToastProvider renders this app content and portals the viewport beside it.',
    type: 'ReactNode',
    default: '—',
  },
]

export const TOAST_MOTION_COMPATIBILITY = [
  {
    motion: 'slide',
    bestWith: 'one or two messages that should be read in full',
    limited: 'A long burst — the list grows down the screen',
    notes: 'Default. Newest first. The viewport scrolls after about 70% of the screen height.',
  },
  {
    motion: 'rise',
    bestWith: 'confirmations tied to a control near the bottom',
    limited: 'A tall list — each one still takes a full row',
    notes: 'Same list layout as slide. Only the entrance changes.',
  },
  {
    motion: 'drop',
    bestWith: 'warnings that should feel like they arrived from the top',
    limited: 'Bottom-of-screen layouts',
    notes: 'Pairs well with tone="warning".',
  },
  {
    motion: 'fade',
    bestWith: 'quiet status, like "copied" or "saved"',
    limited: 'Urgent failures',
    notes: 'No travel, so it is the safest motion next to a text cursor.',
  },
  {
    motion: 'scale',
    bestWith: 'a single success after a button press',
    limited: 'Rapid repeated toasts',
    notes: 'Stops at full size. Use pop for overshoot.',
  },
  {
    motion: 'pop',
    bestWith: 'celebratory saves and invites',
    limited: 'Error toasts',
    notes: 'The spring is skipped when reduced motion is on.',
  },
  {
    motion: 'blur',
    bestWith: 'short copy on a light page',
    limited: 'Low-end devices',
    notes: 'Falls back to a plain fade when reduced motion is on.',
  },
  {
    motion: 'stack',
    bestWith: 'repeated actions, like inviting several people',
    limited: 'Long descriptions — only the front toast is readable',
    notes: 'Only the front toast receives clicks and shows the countdown. Closing it eases the next one forward.',
  },
]

export const TOAST_FAQS = [
  {
    q: 'Where do I put ToastProvider?',
    a: 'Once, around the part of the app that calls toast() — usually the root. toast() talks to the latest provider that is not contained. Contained providers are only for previews.',
  },
  {
    q: 'Can I fire a toast from outside a component?',
    a: 'Yes. Import toast and call it from an event handler, a loader, or a promise callback. The provider has to be mounted first. useToast() is the same API, scoped to the nearest provider.',
  },
  {
    q: 'How do I close one from code?',
    a: 'toast() returns an id. Pass it to toast.dismiss(id). toast.dismiss() with no id closes every toast on the active provider.',
  },
  ...sharedFaqs('toasts', '@fossilui/toasts'),
]
