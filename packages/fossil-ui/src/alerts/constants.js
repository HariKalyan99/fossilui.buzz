export const ALERT_MOTIONS = /** @type {const} */ ([
  'slide',
  'rise',
  'slideRight',
  'shake',
  'fade',
  'scale',
  'pop',
  'blur',
])

/** Maps to animation-duration. Milliseconds. */
export const DEFAULT_ALERT_DURATION = 300

/** Maps to animation-timing-function. Pop uses a spring when easing is left unset. */
export const DEFAULT_ALERT_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'
export const POP_ALERT_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

/** animation-direction */
export const ALERT_DIRECTIONS = /** @type {const} */ (['normal', 'reverse', 'alternate', 'alternate-reverse'])

/** animation-fill-mode */
export const ALERT_FILL_MODES = /** @type {const} */ (['none', 'forwards', 'backwards', 'both'])

/** animation-play-state */
export const ALERT_PLAY_STATES = /** @type {const} */ (['running', 'paused'])

const MAX_MS = 30000

/** Keyframes for each motion. `motion` is the animation name. */
export const ALERT_KEYFRAMES = {
  slide: [
    { opacity: 0, transform: 'translateY(-0.5rem)' },
    { opacity: 1, transform: 'translateY(0)' },
  ],
  rise: [
    { opacity: 0, transform: 'translateY(0.75rem)' },
    { opacity: 1, transform: 'translateY(0)' },
  ],
  slideRight: [
    { opacity: 0, transform: 'translateX(-1rem)' },
    { opacity: 1, transform: 'translateX(0)' },
  ],
  shake: [
    { opacity: 0, transform: 'translateX(0)', offset: 0 },
    { opacity: 1, transform: 'translateX(0)', offset: 0.35 },
    { opacity: 1, transform: 'translateX(-6px)', offset: 0.5 },
    { opacity: 1, transform: 'translateX(5px)', offset: 0.68 },
    { opacity: 1, transform: 'translateX(-3px)', offset: 0.84 },
    { opacity: 1, transform: 'translateX(0)', offset: 1 },
  ],
  fade: [
    { opacity: 0 },
    { opacity: 1 },
  ],
  scale: [
    { opacity: 0, transform: 'scale(0.95)' },
    { opacity: 1, transform: 'scale(1)' },
  ],
  pop: [
    { opacity: 0, transform: 'scale(0.9)' },
    { opacity: 1, transform: 'scale(1)' },
  ],
  blur: [
    { opacity: 0, filter: 'blur(4px)' },
    { opacity: 1, filter: 'blur(0px)' },
  ],
}

function clampMs(value, fallback) {
  if (value == null || value === '') return fallback
  const n = Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(MAX_MS, Math.max(0, n))
}

/** CSS allows a negative delay, which starts the animation part-way through. */
function clampDelay(value) {
  if (value == null || value === '') return 0
  const n = Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.min(MAX_MS, Math.max(-MAX_MS, n))
}

/** Invalid timing functions fall back instead of throwing. */
export function resolveEasing(value, fallback = DEFAULT_ALERT_EASING) {
  const next = String(value ?? '').trim() || fallback
  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
    return CSS.supports('animation-timing-function', next) ? next : fallback
  }
  return /^(linear|ease|ease-in|ease-out|ease-in-out)$/.test(next) || next.startsWith('cubic-bezier(') || next.startsWith('steps(')
    ? next
    : fallback
}

/** `infinite` loops. Anything else that is not a positive number becomes 1. Capped so a typo cannot run forever as a huge count. */
export function resolveIterations(value) {
  if (value === 'infinite' || value === Infinity) return Infinity
  if (value == null || value === '') return 1
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return 1
  return Math.min(n, 100)
}

/**
 * Resolved animation constituent properties for one alert.
 * animation-name is `motion`. animation-timeline is not used: these play on mount.
 */
export function resolveAlertTiming(motion, props = {}) {
  const duration = clampMs(props.duration, DEFAULT_ALERT_DURATION)
  const fallbackEasing = motion === 'pop' ? POP_ALERT_EASING : DEFAULT_ALERT_EASING
  const requested = String(props.easing ?? '').trim()
  const easing = resolveEasing(requested, fallbackEasing)
  const delay = clampDelay(props.delay)
  const direction = ALERT_DIRECTIONS.includes(props.direction) ? props.direction : 'normal'
  const fill = ALERT_FILL_MODES.includes(props.fillMode) ? props.fillMode : 'both'
  const playState = props.playState === 'paused' ? 'paused' : 'running'
  const iterations = resolveIterations(props.iterationCount)

  return {
    duration,
    easing,
    easingFallback: Boolean(requested) && easing !== requested,
    delay,
    direction,
    fill,
    playState,
    iterations,
    /** How long the exit should stay mounted, in ms. */
    exitMs: duration + Math.max(0, delay),
  }
}

/**
 * Plays keyframes with the Web Animations API.
 * A bad option never throws: it retries once with safe defaults.
 * @returns {Animation | null}
 */
export function playAlertAnimation(node, frames, timing, { playState = 'running' } = {}) {
  node.getAnimations().forEach((animation) => animation.cancel())
  const options = {
    duration: timing.duration,
    easing: timing.easing,
    delay: timing.delay,
    iterations: timing.iterations,
    direction: timing.direction,
    fill: timing.fill,
  }
  let animation
  try {
    animation = node.animate(frames, options)
  } catch {
    try {
      animation = node.animate(frames, {
        duration: timing.duration,
        easing: 'ease',
        delay: 0,
        iterations: 1,
        direction: 'normal',
        fill: 'both',
      })
    } catch {
      return null
    }
  }
  if (playState === 'paused') animation.pause()
  return animation
}
