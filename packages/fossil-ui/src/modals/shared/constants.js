import { TRANSITION_MOTION } from '../../lib/motion.js'

export const MODAL_SIZES = /** @type {const} */ (['sm', 'md', 'lg'])

export const MODAL_TONES = /** @type {const} */ (['default', 'danger'])

export const MODAL_SIZE_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
}

export const MODAL_DURATION = 320

const SMOOTH = `${TRANSITION_MOTION} duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`

export const MODAL_LAYOUTS = {
  center: {
    wrapper: 'items-center justify-center p-4',
    panel: 'w-full rounded-2xl',
  },
  right: {
    wrapper: 'items-stretch justify-end',
    panel: 'flex h-full w-[min(24rem,88%)] flex-col rounded-l-2xl border-r-0',
  },
  bottom: {
    wrapper: 'items-end justify-center px-2 sm:px-4',
    panel: 'w-full rounded-t-2xl border-b-0',
  },
}

/** Enter/exit classes per motion. `hidden` is the closed state, `shown` the open state. */
export const MODAL_MOTION_STYLES = {
  scaleFade: {
    layout: 'center',
    transition: SMOOTH,
    hidden: 'opacity-0 scale-95',
    shown: 'opacity-100 scale-100',
  },
  slideUp: {
    layout: 'center',
    transition: SMOOTH,
    hidden: 'opacity-0 translate-y-10',
    shown: 'opacity-100 translate-y-0',
  },
  slideDown: {
    layout: 'center',
    transition: SMOOTH,
    hidden: 'opacity-0 -translate-y-10',
    shown: 'opacity-100 translate-y-0',
  },
  zoomBounce: {
    layout: 'center',
    transition: `${TRANSITION_MOTION} duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`,
    hidden: 'opacity-0 scale-75',
    shown: 'opacity-100 scale-100',
  },
  flip: {
    layout: 'center',
    transition: `origin-top ${SMOOTH}`,
    hidden: 'opacity-0 [transform:perspective(1200px)_rotateX(22deg)_scale(0.96)]',
    shown: 'opacity-100 [transform:perspective(1200px)_rotateX(0deg)_scale(1)]',
  },
  blurIn: {
    layout: 'center',
    transition: SMOOTH,
    hidden: 'opacity-0 scale-[1.04] blur-md',
    shown: 'opacity-100 scale-100 blur-none',
  },
  drawer: {
    layout: 'right',
    transition: SMOOTH,
    hidden: 'translate-x-full',
    shown: 'translate-x-0',
  },
  bottomSheet: {
    layout: 'bottom',
    transition: SMOOTH,
    hidden: 'translate-y-full',
    shown: 'translate-y-0',
  },
}

export const MODAL_MOTIONS = /** @type {const} */ (Object.keys(MODAL_MOTION_STYLES))
