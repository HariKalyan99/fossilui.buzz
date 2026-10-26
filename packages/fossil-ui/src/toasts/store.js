import { FEEDBACK_TONES } from '../feedback/tones.js'

/** @type {Array<{ contained: boolean, push: Function, dismiss: Function }>} */
const providers = []

let sequence = 0

export const TOAST_MOTIONS = /** @type {const} */ ([
  'slide',
  'rise',
  'drop',
  'fade',
  'scale',
  'pop',
  'blur',
  'stack',
])

export const DEFAULT_TOAST_DURATION = 4500

/**
 * @param {string | { title?: string, description?: string, tone?: string, duration?: number }} input
 * @param {string} [tone]
 */
export function normalizeToast(input, tone) {
  const source = typeof input === 'string' ? { title: input } : { ...input }
  if (tone) source.tone = tone
  const safeTone = FEEDBACK_TONES.includes(source.tone) ? source.tone : 'info'
  const duration = source.duration === undefined ? DEFAULT_TOAST_DURATION : Number(source.duration)

  return {
    id: `fossil-toast-${++sequence}`,
    title: source.title ?? '',
    description: source.description ?? '',
    tone: safeTone,
    duration: Number.isFinite(duration) ? Math.max(0, duration) : DEFAULT_TOAST_DURATION,
    enterDuration: source.enterDuration,
    easing: source.easing,
    delay: source.delay,
    open: true,
  }
}

export function registerToastProvider(api) {
  providers.push(api)
  return () => {
    const index = providers.indexOf(api)
    if (index >= 0) providers.splice(index, 1)
  }
}

function pickProvider() {
  for (let index = providers.length - 1; index >= 0; index -= 1) {
    if (!providers[index].contained) return providers[index]
  }
  return providers[providers.length - 1]
}

function warnMissing() {
  if (typeof console !== 'undefined') {
    console.warn('Fossil UI: wrap your app in <ToastProvider> before calling toast().')
  }
}

/**
 * Show a toast. Requires a mounted ToastProvider.
 * `toast.success('Saved')` and `toast({ title, description, tone, duration })` both work.
 * `duration={0}` keeps the toast until it is closed.
 *
 * @param {string | { title?: string, description?: string, tone?: string, duration?: number }} input
 */
export function toast(input) {
  const target = pickProvider()
  if (!target) {
    warnMissing()
    return null
  }
  return target.push(normalizeToast(input))
}

toast.info = (input) => toast(typeof input === 'string' ? { title: input, tone: 'info' } : { ...input, tone: 'info' })
toast.success = (input) =>
  toast(typeof input === 'string' ? { title: input, tone: 'success' } : { ...input, tone: 'success' })
toast.warning = (input) =>
  toast(typeof input === 'string' ? { title: input, tone: 'warning' } : { ...input, tone: 'warning' })
toast.error = (input) =>
  toast(typeof input === 'string' ? { title: input, tone: 'error' } : { ...input, tone: 'error' })

/** Close one toast by id, or every toast on the active provider when id is omitted. */
toast.dismiss = (id) => {
  const target = pickProvider()
  if (!target) return
  target.dismiss(id)
}
