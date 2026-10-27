import { importGuideSnippets, importSnippet, sharedFaqs } from './sharedDocs'

export const ALERT_PACKAGE = { label: 'Alerts', packageName: '@fossilui/alerts' }

export const ALERT_IMPORT_SNIPPETS = importGuideSnippets(ALERT_PACKAGE)

export const ALERT_IMPORT_SNIPPET = importSnippet({
  names: ['Alert'],
  subpath: 'alerts',
  packageName: ALERT_PACKAGE.packageName,
})

export const ALERT_DEMO = {
  title: 'Workspace updated',
  description: 'Teammates can see the latest changes.',
}

export function alertSnippet(attrs) {
  const lines = attrs.map((attr) => `  ${attr}`).join('\n')
  return `import { Alert } from '@fossilui/react'

<Alert
${lines}
/>`
}

function demoSnippet(motion, tone) {
  return alertSnippet([
    `motion="${motion}"`,
    `tone="${tone}"`,
    `title="${ALERT_DEMO.title}"`,
    `description="${ALERT_DEMO.description}"`,
  ])
}

export const ALERT_VARIANTS = [
  {
    id: 'slide',
    name: 'Slide',
    description: 'Drops in from above and lifts away on dismiss.',
    component: 'SlideAlert',
    motion: 'slide',
    tone: 'info',
    snippet: demoSnippet('slide', 'info'),
  },
  {
    id: 'rise',
    name: 'Rise',
    description: 'Lifts up from below, as if the notice grew out of the form.',
    component: 'RiseAlert',
    motion: 'rise',
    tone: 'success',
    snippet: demoSnippet('rise', 'success'),
  },
  {
    id: 'slide-right',
    name: 'Slide right',
    description: 'Enters from the left edge. Useful in a sidebar or a narrow column.',
    component: 'SlideRightAlert',
    motion: 'slideRight',
    tone: 'warning',
    snippet: demoSnippet('slideRight', 'warning'),
  },
  {
    id: 'shake',
    name: 'Shake',
    description: 'Fades in, then a short horizontal shake. Built for errors.',
    component: 'ShakeAlert',
    motion: 'shake',
    tone: 'error',
    snippet: demoSnippet('shake', 'error'),
  },
  {
    id: 'fade',
    name: 'Fade',
    description: 'Opacity only — the quietest way to show a status.',
    component: 'FadeAlert',
    motion: 'fade',
    tone: 'info',
    snippet: demoSnippet('fade', 'info'),
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'Grows from 95% while fading in. A small emphasis without a bounce.',
    component: 'ScaleAlert',
    motion: 'scale',
    tone: 'success',
    snippet: demoSnippet('scale', 'success'),
  },
  {
    id: 'pop',
    name: 'Pop',
    description: 'Springs in with a slight overshoot. For confirmations worth a smile.',
    component: 'PopAlert',
    motion: 'pop',
    tone: 'success',
    snippet: demoSnippet('pop', 'success'),
  },
  {
    id: 'blur',
    name: 'Blur',
    description: 'Comes into focus from a soft blur.',
    component: 'BlurAlert',
    motion: 'blur',
    tone: 'info',
    snippet: demoSnippet('blur', 'info'),
  },
]

export const ALERT_WHEN_TO_USE = [
  {
    title: 'Inline status',
    body: 'SlideAlert and FadeAlert sit in the page — form errors, billing notices, and save confirmations the user may need to re-read.',
  },
  {
    title: 'Failed actions',
    body: 'ShakeAlert with tone="error" draws the eye once without taking over the screen. Pair it with text that says what to do next.',
  },
  {
    title: 'Dismissible notices',
    body: 'Set dismissible (or pass onClose) when the message is done after reading. The alert animates out, then unmounts.',
  },
  {
    title: 'When not to use',
    body: 'For messages that should float and disappear on their own, use a toast. For a decision that blocks the page, use a modal.',
  },
]

export const ALERT_PROPS = [
  {
    property: 'motion',
    description: 'Enter and exit animation when using the standard <Alert /> wrapper.',
    type: "'slide' | 'rise' | 'slideRight' | 'shake' | 'fade' | 'scale' | 'pop' | 'blur'",
    default: "'slide'",
  },
  {
    property: 'duration',
    description: 'animation-duration, in milliseconds. Values below 0 become 0. Values above 30000 are capped.',
    type: 'number',
    default: '300',
  },
  {
    property: 'easing',
    description: 'animation-timing-function. Any CSS easing, including cubic-bezier() and steps(). An invalid value falls back to the motion default (a spring for pop).',
    type: 'string',
    default: 'motion default',
  },
  {
    property: 'delay',
    description: 'animation-delay, in milliseconds. A negative delay starts the entrance part-way through, same as CSS. Limited to ±30000.',
    type: 'number',
    default: '0',
  },
  {
    property: 'direction',
    description: 'animation-direction for the entrance. alternate and alternate-reverse need iterationCount of at least 2 before the reverse pass plays.',
    type: "'normal' | 'reverse' | 'alternate' | 'alternate-reverse'",
    default: "'normal'",
  },
  {
    property: 'iterationCount',
    description: 'animation-iteration-count. Use "infinite" to loop while the alert is open. Counts above 100 are capped. The exit always plays once.',
    type: "number | 'infinite'",
    default: '1',
  },
  {
    property: 'fillMode',
    description: 'animation-fill-mode for the entrance. both (the default) holds the first frame during delay and the last frame after it ends.',
    type: "'none' | 'forwards' | 'backwards' | 'both'",
    default: "'both'",
  },
  {
    property: 'playState',
    description: 'animation-play-state. paused holds the alert on its first frame until you set it back to running.',
    type: "'running' | 'paused'",
    default: "'running'",
  },
  {
    property: 'tone',
    description: 'Color, icon, and live-region role. Warning and error use role="alert".',
    type: "'info' | 'success' | 'warning' | 'error'",
    default: "'info'",
  },
  {
    property: 'title',
    description: 'Short heading. Wired to aria-labelledby.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'description',
    description: 'Supporting sentence under the title.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'children',
    description: 'Extra content under the description, such as a link or action.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'dismissible',
    description: 'Shows a close button. The alert hides itself unless open is controlled.',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'open',
    description: 'Controlled visibility. Leave it unset and the alert manages its own open state.',
    type: 'boolean',
    default: '—',
  },
  {
    property: 'onClose',
    description: 'Called when the close button is pressed. Also reveals the close button.',
    type: '() => void',
    default: '—',
  },
  {
    property: 'icon',
    description: 'Replaces the tone icon.',
    type: 'ReactNode',
    default: '—',
  },
  {
    property: 'className',
    description: 'Extra classes merged onto the alert.',
    type: 'string',
    default: '—',
  },
]

export const ALERT_MOTION_COMPATIBILITY = [
  {
    motion: 'slide',
    bestWith: 'banners at the top of a page or form',
    limited: '—',
    notes: 'Default. The movement makes the notice arrive without a shake.',
  },
  {
    motion: 'rise',
    bestWith: 'notices placed under a field or action',
    limited: 'Banners pinned to the top of the viewport',
    notes: 'Reads as the message coming from the control above it.',
  },
  {
    motion: 'slideRight',
    bestWith: 'sidebars and narrow columns',
    limited: 'Full-width page banners',
    notes: 'The travel is short so it still feels inline.',
  },
  {
    motion: 'shake',
    bestWith: 'tone="error" after a failed submit',
    limited: 'Repeated notices — the shake plays once per mount',
    notes: 'Skipped entirely when the OS asks for reduced motion.',
  },
  {
    motion: 'fade',
    bestWith: 'success and info placed next to quiet UI',
    limited: 'Urgent failures',
    notes: 'Same exit as the others: it fades out before unmounting.',
  },
  {
    motion: 'scale',
    bestWith: 'a single notice that should feel placed, not thrown',
    limited: 'Long lists of alerts',
    notes: 'Stops at full size. Use pop when you want overshoot.',
  },
  {
    motion: 'pop',
    bestWith: 'success states and first-run tips',
    limited: 'Destructive errors',
    notes: 'The spring is skipped when reduced motion is on.',
  },
  {
    motion: 'blur',
    bestWith: 'light backgrounds and short copy',
    limited: 'Low-end devices — blur is heavier than a fade',
    notes: 'Opens as a plain fade when reduced motion is on.',
  },
]

export const ALERT_FAQS = [
  {
    q: 'How do I show the alert again after it is dismissed?',
    a: 'Leave open unset and remount the alert (change its key), or control open yourself and set it back to true.',
  },
  {
    q: 'Does the shake repeat while the alert stays open?',
    a: 'No. It plays once when the alert enters. Remount it, or switch the motion, to play it again.',
  },
  {
    q: 'Can I set animation-timeline?',
    a: 'No. These motions play when the alert mounts, so there is no scroll or view timeline to attach. The configurable properties are duration, easing, delay, direction, iteration count, fill mode, and play state. motion is the animation name.',
  },
  {
    q: 'What happens if I pass an easing the browser does not understand?',
    a: 'The alert does not throw. It plays with that motion\'s default easing instead. The same is true for a direction or fill mode outside the supported lists.',
  },
  {
    q: 'Can I control visibility from outside?',
    a: 'Yes. Pass open and onClose. The alert stays mounted until the exit transition finishes, the same way modals do.',
  },
  ...sharedFaqs('alerts', '@fossilui/alerts'),
]
