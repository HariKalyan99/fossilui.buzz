/**
 * Accent colors for Switch, Checkbox, and Radio.
 * Keep the set small and concrete — matches common button hues.
 */

export const TOGGLE_COLORS = [
  'neutral',
  'indigo',
  'blue',
  'pink',
  'red',
  'green',
  'amber',
]

/** @typedef {typeof TOGGLE_COLORS[number]} ToggleColor */

/**
 * @type {Record<ToggleColor, {
 *   track: string
 *   bounceTrack: string
 *   bounceShadow: string
 *   glowTrack: string
 *   glowShadow: string
 *   ring: string
 *   focusRing: string
 *   softRing: string
 *   pulseRing: string
 *   dot: string
 * }>}
 */
const PALETTE = {
  neutral: {
    track: 'border-neutral-900 bg-neutral-900',
    bounceTrack: 'border-neutral-800 bg-neutral-800',
    bounceShadow: 'shadow-[0_4px_0_0_rgb(23,23,23)]',
    glowTrack: 'border-neutral-700 bg-neutral-700',
    glowShadow: 'shadow-[0_0_18px_rgba(64,64,64,0.45)]',
    ring: 'border-neutral-900',
    focusRing: 'focus-visible:ring-neutral-500/45',
    softRing: 'shadow-[0_0_0_3px_rgba(64,64,64,0.18)]',
    pulseRing: 'border-neutral-400/70',
    dot: 'bg-neutral-900',
  },
  indigo: {
    track: 'border-indigo-600 bg-indigo-600',
    bounceTrack: 'border-indigo-700 bg-indigo-700',
    bounceShadow: 'shadow-[0_4px_0_0_rgb(67,56,202)]',
    glowTrack: 'border-indigo-500 bg-indigo-500',
    glowShadow: 'shadow-[0_0_18px_rgba(99,102,241,0.45)]',
    ring: 'border-indigo-500',
    focusRing: 'focus-visible:ring-indigo-500/45',
    softRing: 'shadow-[0_0_0_3px_rgba(99,102,241,0.2)]',
    pulseRing: 'border-indigo-400/70',
    dot: 'bg-indigo-500',
  },
  blue: {
    track: 'border-blue-600 bg-blue-600',
    bounceTrack: 'border-blue-700 bg-blue-700',
    bounceShadow: 'shadow-[0_4px_0_0_rgb(29,78,216)]',
    glowTrack: 'border-blue-500 bg-blue-500',
    glowShadow: 'shadow-[0_0_18px_rgba(59,130,246,0.45)]',
    ring: 'border-blue-500',
    focusRing: 'focus-visible:ring-blue-500/45',
    softRing: 'shadow-[0_0_0_3px_rgba(59,130,246,0.2)]',
    pulseRing: 'border-blue-400/70',
    dot: 'bg-blue-500',
  },
  pink: {
    track: 'border-pink-600 bg-pink-600',
    bounceTrack: 'border-pink-700 bg-pink-700',
    bounceShadow: 'shadow-[0_4px_0_0_rgb(190,24,93)]',
    glowTrack: 'border-pink-500 bg-pink-500',
    glowShadow: 'shadow-[0_0_18px_rgba(236,72,153,0.45)]',
    ring: 'border-pink-500',
    focusRing: 'focus-visible:ring-pink-500/45',
    softRing: 'shadow-[0_0_0_3px_rgba(236,72,153,0.2)]',
    pulseRing: 'border-pink-400/70',
    dot: 'bg-pink-500',
  },
  red: {
    track: 'border-red-600 bg-red-600',
    bounceTrack: 'border-red-700 bg-red-700',
    bounceShadow: 'shadow-[0_4px_0_0_rgb(185,28,28)]',
    glowTrack: 'border-red-500 bg-red-500',
    glowShadow: 'shadow-[0_0_18px_rgba(239,68,68,0.45)]',
    ring: 'border-red-500',
    focusRing: 'focus-visible:ring-red-500/45',
    softRing: 'shadow-[0_0_0_3px_rgba(239,68,68,0.2)]',
    pulseRing: 'border-red-400/70',
    dot: 'bg-red-500',
  },
  green: {
    track: 'border-emerald-600 bg-emerald-600',
    bounceTrack: 'border-emerald-700 bg-emerald-700',
    bounceShadow: 'shadow-[0_4px_0_0_rgb(4,120,87)]',
    glowTrack: 'border-emerald-500 bg-emerald-500',
    glowShadow: 'shadow-[0_0_18px_rgba(16,185,129,0.45)]',
    ring: 'border-emerald-500',
    focusRing: 'focus-visible:ring-emerald-500/45',
    softRing: 'shadow-[0_0_0_3px_rgba(16,185,129,0.2)]',
    pulseRing: 'border-emerald-400/70',
    dot: 'bg-emerald-500',
  },
  amber: {
    track: 'border-amber-500 bg-amber-500',
    bounceTrack: 'border-amber-600 bg-amber-600',
    bounceShadow: 'shadow-[0_4px_0_0_rgb(217,119,6)]',
    glowTrack: 'border-amber-400 bg-amber-400',
    glowShadow: 'shadow-[0_0_18px_rgba(251,191,36,0.5)]',
    ring: 'border-amber-500',
    focusRing: 'focus-visible:ring-amber-500/45',
    softRing: 'shadow-[0_0_0_3px_rgba(251,191,36,0.25)]',
    pulseRing: 'border-amber-400/70',
    dot: 'bg-amber-500',
  },
}

/**
 * @param {string | undefined} color
 */
export function resolveToggleColor(color) {
  if (color && TOGGLE_COLORS.includes(/** @type {ToggleColor} */ (color))) {
    return /** @type {ToggleColor} */ (color)
  }
  return 'neutral'
}

/**
 * When `color` is omitted, glow / pulse / pop keep the historic indigo accent;
 * slide / bounce / check / scale stay neutral black.
 * @param {string | undefined} color
 * @param {string | undefined} motion
 */
export function toggleAccent(color, motion) {
  if (color) return resolveToggleColor(color)
  if (motion === 'glow' || motion === 'pulse' || motion === 'pop') return 'indigo'
  return 'neutral'
}

/**
 * @param {string | undefined} color
 * @param {string | undefined} [motion]
 */
export function toggleColorTokens(color, motion) {
  return PALETTE[toggleAccent(color, motion)]
}
