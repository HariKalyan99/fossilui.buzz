import { TRANSITION_MOTION } from './motion.js'

export const OVERLAY_DURATION = 240

const SMOOTH = `${TRANSITION_MOTION} delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,${OVERLAY_DURATION}ms)] ease-[var(--fossil-ease,var(--fossil-ease-out))] motion-reduce:transition-none`

function enterFrom(hidden, shown) {
  const starting = hidden
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => `starting:${token}`)
    .join(' ')
  return `${shown} ${starting}`
}

/** @param {string} motion @param {'dropdown' | 'tooltip'} kind */
export function overlayMotionClasses(motion, kind = 'dropdown') {
  const map = kind === 'tooltip' ? TOOLTIP_MOTION_STYLES : DROPDOWN_MOTION_STYLES
  const style = map[motion] ?? map[kind === 'tooltip' ? 'fade' : 'fade']
  return {
    transition: style.transition,
    closed: style.hidden,
    open: style.shown,
  }
}

export const DROPDOWN_MOTION_STYLES = {
  fade: {
    transition: SMOOTH,
    hidden: 'pointer-events-none opacity-0',
    shown: enterFrom('opacity-0', 'opacity-100'),
  },
  scale: {
    transition: SMOOTH,
    hidden: 'pointer-events-none origin-top opacity-0 scale-95',
    shown: enterFrom('opacity-0 scale-95', 'opacity-100 scale-100'),
  },
  slideDown: {
    transition: SMOOTH,
    hidden: 'pointer-events-none origin-top opacity-0 -translate-y-2',
    shown: enterFrom('opacity-0 -translate-y-2', 'opacity-100 translate-y-0'),
  },
  slideUp: {
    transition: `${SMOOTH} origin-bottom`,
    hidden: 'pointer-events-none opacity-0 translate-y-2',
    shown: enterFrom('opacity-0 translate-y-2', 'opacity-100 translate-y-0'),
  },
  blur: {
    transition: SMOOTH,
    hidden: 'pointer-events-none opacity-0 blur-sm scale-[1.02]',
    shown: enterFrom('opacity-0 blur-sm scale-[1.02]', 'opacity-100 blur-none scale-100'),
  },
  pop: {
    transition: `${TRANSITION_MOTION} delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,280ms)] ease-[var(--fossil-ease,var(--fossil-ease-spring))] motion-reduce:transition-none`,
    hidden: 'pointer-events-none origin-top opacity-0 scale-90',
    shown: enterFrom('opacity-0 scale-90', 'opacity-100 scale-100'),
  },
  rise: {
    transition: SMOOTH,
    hidden: 'pointer-events-none opacity-0 translate-y-3',
    shown: enterFrom('opacity-0 translate-y-3', 'opacity-100 translate-y-0'),
  },
  wipe: {
    transition: SMOOTH,
    hidden: 'pointer-events-none origin-top opacity-0 [clip-path:inset(0_0_100%_0)]',
    shown: enterFrom('[clip-path:inset(0_0_100%_0)] opacity-0', 'opacity-100 [clip-path:inset(0_0_0_0)]'),
  },
}

export const TOOLTIP_MOTION_STYLES = {
  fade: DROPDOWN_MOTION_STYLES.fade,
  scale: {
    transition: SMOOTH,
    hidden: 'pointer-events-none opacity-0 scale-95',
    shown: enterFrom('opacity-0 scale-95', 'opacity-100 scale-100'),
  },
  slide: {
    transition: SMOOTH,
    hidden: 'pointer-events-none opacity-0 translate-y-1',
    shown: enterFrom('opacity-0 translate-y-1', 'opacity-100 translate-y-0'),
  },
  rise: {
    transition: SMOOTH,
    hidden: 'pointer-events-none opacity-0 translate-y-2',
    shown: enterFrom('opacity-0 translate-y-2', 'opacity-100 translate-y-0'),
  },
  blur: DROPDOWN_MOTION_STYLES.blur,
  pop: DROPDOWN_MOTION_STYLES.pop,
  grow: {
    transition: SMOOTH,
    hidden: 'pointer-events-none origin-center opacity-0 scale-x-0 scale-y-95',
    shown: enterFrom('opacity-0 scale-x-0 scale-y-95', 'opacity-100 scale-x-100 scale-y-100'),
  },
  lift: {
    transition: SMOOTH,
    hidden: 'pointer-events-none opacity-0 translate-y-1 shadow-none',
    shown: enterFrom(
      'opacity-0 translate-y-1 shadow-none',
      'opacity-100 translate-y-0 shadow-[0_10px_24px_-12px_rgba(15,23,42,0.35)]',
    ),
  },
}
