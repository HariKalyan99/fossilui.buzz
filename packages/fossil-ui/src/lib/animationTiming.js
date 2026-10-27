/**
 * Shared motion timing. Hover, focus, and enter/exit motions are CSS transitions,
 * so duration, easing, and delay are the properties that change them.
 * Direction, iteration count, fill, and play state belong to animations that
 * play through (alerts). Those props are stripped here so they never reach the DOM.
 */

const MAX_MS = 30000

export const MOTION_PROP_KEYS = [
  'duration',
  'easing',
  'delay',
  'direction',
  'iterationCount',
  'fillMode',
  'playState',
]

const EASING_PALETTE = {
  '--fossil-ease-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
  '--fossil-ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  '--fossil-ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
  '--fossil-ease-snap': 'cubic-bezier(0.76, 0, 0.24, 1)',
}

function isSet(value) {
  return value != null && value !== ''
}

export function clampMs(value, fallback) {
  if (!isSet(value)) return fallback
  const n = Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(MAX_MS, Math.max(0, n))
}

/** CSS allows a negative delay, which starts the motion part-way through. */
export function clampDelay(value) {
  if (!isSet(value)) return 0
  const n = Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.min(MAX_MS, Math.max(-MAX_MS, n))
}

/** Invalid timing functions are rejected instead of applied. */
export function isValidEasing(value) {
  const next = String(value ?? '').trim()
  if (!next) return false
  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
    return CSS.supports('animation-timing-function', next) || CSS.supports('transition-timing-function', next)
  }
  return /^(linear|ease|ease-in|ease-out|ease-in-out)$/.test(next) || next.startsWith('cubic-bezier(') || next.startsWith('steps(')
}

/**
 * CSS variables for one component root. Descendants opt in with
 * `delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,300ms)]` and `ease-[var(--fossil-ease,ease-out)]`.
 * Unset props leave the variable unset, so each motion keeps its own default.
 * An easing the browser rejects is ignored.
 *
 * @param {object} [props]
 * @returns {import('react').CSSProperties}
 */
export function motionTimingStyle(props = {}) {
  const style = { ...EASING_PALETTE }
  if (isSet(props.duration)) {
    const n = Number(props.duration)
    if (Number.isFinite(n)) style['--fossil-duration'] = `${clampMs(n, 0)}ms`
  }
  if (isSet(props.easing)) {
    const requested = String(props.easing).trim()
    if (isValidEasing(requested)) style['--fossil-ease'] = requested
  }
  if (isSet(props.delay)) {
    const n = Number(props.delay)
    if (Number.isFinite(n)) style['--fossil-delay'] = `${clampDelay(n)}ms`
  }
  return style
}

/**
 * How long an exit should stay mounted: the transition plus any positive delay.
 * @param {unknown} duration
 * @param {unknown} delay
 * @param {number} fallback
 */
export function presenceMs(duration, delay, fallback) {
  return clampMs(duration, fallback) + Math.max(0, isSet(delay) ? clampDelay(delay) : 0)
}

/**
 * Pulls motion props off a props object and returns a style that carries them.
 * User `style` wins over the generated variables.
 *
 * @param {object} props
 */
export function splitMotionProps(props) {
  const rest = { ...props }
  /** @type {Record<string, unknown>} */
  const timing = {}
  for (const key of MOTION_PROP_KEYS) {
    if (key in rest) {
      timing[key] = rest[key]
      delete rest[key]
    }
  }
  const userStyle = rest.style
  delete rest.style
  return {
    rest,
    timing,
    style: { ...motionTimingStyle(timing), ...userStyle },
  }
}

/** Reads a user-set duration variable. Returns the fallback when the user did not set one. */
export function readMotionMs(node, fallback) {
  if (!node || typeof window === 'undefined') return fallback
  const raw = getComputedStyle(node).getPropertyValue('--fossil-duration').trim()
  if (!raw) return fallback
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : fallback
}

/** Reads a user-set easing variable. */
export function readMotionEase(node, fallback) {
  if (!node || typeof window === 'undefined') return fallback
  const raw = getComputedStyle(node).getPropertyValue('--fossil-ease').trim()
  return raw || fallback
}

/** Reads a user-set delay variable, in ms. */
export function readMotionDelay(node) {
  if (!node || typeof window === 'undefined') return 0
  const raw = getComputedStyle(node).getPropertyValue('--fossil-delay').trim()
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : 0
}
