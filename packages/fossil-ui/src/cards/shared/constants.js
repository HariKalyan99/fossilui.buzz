export const CARD_MOTIONS = /** @type {const} */ ([
  'liftShadow',
  'borderGlow',
  'imageZoom',
  'shineSweep',
  'gradientShift',
  'scaleUp',
  'accentReveal',
  'tiltHover',
])

export const CARD_SIZES = /** @type {const} */ (['compact', 'default', 'roomy'])

export const CARD_ACCENTS = /** @type {const} */ ([
  'default',
  'primary',
  'violet',
  'teal',
  'rose',
])

export const CARD_ACCENT_GRADIENTS = {
  default: 'from-slate-100 via-white to-indigo-100/70',
  primary: 'from-indigo-100 via-white to-violet-100/80',
  violet: 'from-violet-100 via-white to-purple-100/80',
  teal: 'from-teal-100 via-white to-cyan-100/80',
  rose: 'from-rose-100 via-white to-pink-100/80',
}

export const CARD_SIZE_PADDING = {
  compact: 'p-3.5',
  default: 'p-4 sm:p-5',
  roomy: 'p-5 sm:p-6',
}
