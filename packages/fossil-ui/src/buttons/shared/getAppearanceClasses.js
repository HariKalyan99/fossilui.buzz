import { cn } from '../../lib/cn.js'

const DARK_FOREGROUND_FILL_COLORS = new Set(['warning', 'lime'])

/**
 * @param {import('./constants.js').ButtonColor} color
 */
function getSolidTextClass(color) {
  return DARK_FOREGROUND_FILL_COLORS.has(color) ? 'text-neutral-900' : 'text-white'
}

/**
 * @param {import('./constants.js').ButtonColor} color
 */
function getHoverTextClass(color) {
  return DARK_FOREGROUND_FILL_COLORS.has(color)
    ? 'group-hover:text-neutral-900'
    : 'group-hover:text-white'
}

/**
 * @param {import('./constants.js').ButtonColor} color
 */
function getStaggerHoverClass(color) {
  const map = {
    // Dark backgrounds (white base text): use lighter accent tones.
    default: 'group-hover:text-indigo-300',
    primary: 'group-hover:text-violet-200',
    secondary: 'group-hover:text-sky-200',
    info: 'group-hover:text-cyan-200',
    teal: 'group-hover:text-emerald-200',
    cyan: 'group-hover:text-blue-200',
    blue: 'group-hover:text-indigo-200',
    violet: 'group-hover:text-fuchsia-200',
    purple: 'group-hover:text-pink-200',
    pink: 'group-hover:text-rose-200',
    rose: 'group-hover:text-orange-200',
    danger: 'group-hover:text-rose-200',
    success: 'group-hover:text-emerald-200',
    // Light backgrounds (dark base text): use deeper accents.
    lime: 'group-hover:text-lime-900',
    warning: 'group-hover:text-amber-900',
  }
  return map[color] ?? map.default
}

/**
 * @param {import('./constants.js').ButtonColor} color
 * @param {import('./constants.js').ButtonVariant} variant
 * @param {boolean} ghost
 */
function palette(color, variant, ghost) {
  const c = color
  const palettes = {
    default: {
      solid: 'bg-neutral-900 text-white hover:bg-neutral-800',
      filled: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
      outlined: 'bg-transparent border border-neutral-900 text-neutral-900 hover:bg-neutral-50',
      dashed: 'bg-transparent border border-dashed border-neutral-400 text-neutral-900 hover:border-neutral-900',
      text: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
      link: 'bg-transparent text-neutral-900 underline-offset-4 hover:underline',
    },
    primary: {
      solid: 'bg-indigo-600 text-white hover:bg-indigo-700',
      filled: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
      outlined: 'bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
      dashed: 'bg-transparent border border-dashed border-indigo-400 text-indigo-600 hover:border-indigo-600',
      text: 'bg-transparent text-indigo-600 hover:bg-indigo-50',
      link: 'bg-transparent text-indigo-600 underline-offset-4 hover:underline',
    },
    secondary: {
      solid: 'bg-slate-600 text-white hover:bg-slate-700',
      filled: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
      outlined: 'bg-transparent border border-slate-600 text-slate-700 hover:bg-slate-50',
      dashed: 'bg-transparent border border-dashed border-slate-400 text-slate-700 hover:border-slate-600',
      text: 'bg-transparent text-slate-700 hover:bg-slate-100',
      link: 'bg-transparent text-slate-700 underline-offset-4 hover:underline',
    },
    info: {
      solid: 'bg-sky-600 text-white hover:bg-sky-700',
      filled: 'bg-sky-50 text-sky-700 hover:bg-sky-100',
      outlined: 'bg-transparent border border-sky-600 text-sky-700 hover:bg-sky-50',
      dashed: 'bg-transparent border border-dashed border-sky-400 text-sky-700 hover:border-sky-600',
      text: 'bg-transparent text-sky-700 hover:bg-sky-50',
      link: 'bg-transparent text-sky-700 underline-offset-4 hover:underline',
    },
    teal: {
      solid: 'bg-teal-600 text-white hover:bg-teal-700',
      filled: 'bg-teal-50 text-teal-700 hover:bg-teal-100',
      outlined: 'bg-transparent border border-teal-600 text-teal-700 hover:bg-teal-50',
      dashed: 'bg-transparent border border-dashed border-teal-400 text-teal-700 hover:border-teal-600',
      text: 'bg-transparent text-teal-700 hover:bg-teal-50',
      link: 'bg-transparent text-teal-700 underline-offset-4 hover:underline',
    },
    cyan: {
      solid: 'bg-cyan-600 text-white hover:bg-cyan-700',
      filled: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
      outlined: 'bg-transparent border border-cyan-600 text-cyan-700 hover:bg-cyan-50',
      dashed: 'bg-transparent border border-dashed border-cyan-400 text-cyan-700 hover:border-cyan-600',
      text: 'bg-transparent text-cyan-700 hover:bg-cyan-50',
      link: 'bg-transparent text-cyan-700 underline-offset-4 hover:underline',
    },
    blue: {
      solid: 'bg-blue-600 text-white hover:bg-blue-700',
      filled: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      outlined: 'bg-transparent border border-blue-600 text-blue-700 hover:bg-blue-50',
      dashed: 'bg-transparent border border-dashed border-blue-400 text-blue-700 hover:border-blue-600',
      text: 'bg-transparent text-blue-700 hover:bg-blue-50',
      link: 'bg-transparent text-blue-700 underline-offset-4 hover:underline',
    },
    violet: {
      solid: 'bg-violet-600 text-white hover:bg-violet-700',
      filled: 'bg-violet-50 text-violet-700 hover:bg-violet-100',
      outlined: 'bg-transparent border border-violet-600 text-violet-700 hover:bg-violet-50',
      dashed: 'bg-transparent border border-dashed border-violet-400 text-violet-700 hover:border-violet-600',
      text: 'bg-transparent text-violet-700 hover:bg-violet-50',
      link: 'bg-transparent text-violet-700 underline-offset-4 hover:underline',
    },
    purple: {
      solid: 'bg-purple-600 text-white hover:bg-purple-700',
      filled: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      outlined: 'bg-transparent border border-purple-600 text-purple-700 hover:bg-purple-50',
      dashed: 'bg-transparent border border-dashed border-purple-400 text-purple-700 hover:border-purple-600',
      text: 'bg-transparent text-purple-700 hover:bg-purple-50',
      link: 'bg-transparent text-purple-700 underline-offset-4 hover:underline',
    },
    pink: {
      solid: 'bg-pink-600 text-white hover:bg-pink-700',
      filled: 'bg-pink-50 text-pink-700 hover:bg-pink-100',
      outlined: 'bg-transparent border border-pink-600 text-pink-700 hover:bg-pink-50',
      dashed: 'bg-transparent border border-dashed border-pink-400 text-pink-700 hover:border-pink-600',
      text: 'bg-transparent text-pink-700 hover:bg-pink-50',
      link: 'bg-transparent text-pink-700 underline-offset-4 hover:underline',
    },
    rose: {
      solid: 'bg-rose-600 text-white hover:bg-rose-700',
      filled: 'bg-rose-50 text-rose-700 hover:bg-rose-100',
      outlined: 'bg-transparent border border-rose-600 text-rose-700 hover:bg-rose-50',
      dashed: 'bg-transparent border border-dashed border-rose-400 text-rose-700 hover:border-rose-600',
      text: 'bg-transparent text-rose-700 hover:bg-rose-50',
      link: 'bg-transparent text-rose-700 underline-offset-4 hover:underline',
    },
    lime: {
      solid: `bg-lime-600 ${getSolidTextClass('lime')} hover:bg-lime-700`,
      filled: 'bg-lime-50 text-lime-800 hover:bg-lime-100',
      outlined: 'bg-transparent border border-lime-600 text-lime-800 hover:bg-lime-50',
      dashed: 'bg-transparent border border-dashed border-lime-400 text-lime-800 hover:border-lime-600',
      text: 'bg-transparent text-lime-800 hover:bg-lime-50',
      link: 'bg-transparent text-lime-800 underline-offset-4 hover:underline',
    },
    danger: {
      solid: 'bg-red-600 text-white hover:bg-red-700',
      filled: 'bg-red-50 text-red-700 hover:bg-red-100',
      outlined: 'bg-transparent border border-red-600 text-red-600 hover:bg-red-50',
      dashed: 'bg-transparent border border-dashed border-red-400 text-red-600 hover:border-red-600',
      text: 'bg-transparent text-red-600 hover:bg-red-50',
      link: 'bg-transparent text-red-600 underline-offset-4 hover:underline',
    },
    success: {
      solid: 'bg-emerald-600 text-white hover:bg-emerald-700',
      filled: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
      outlined: 'bg-transparent border border-emerald-600 text-emerald-600 hover:bg-emerald-50',
      dashed: 'bg-transparent border border-dashed border-emerald-400 text-emerald-600 hover:border-emerald-600',
      text: 'bg-transparent text-emerald-600 hover:bg-emerald-50',
      link: 'bg-transparent text-emerald-600 underline-offset-4 hover:underline',
    },
    warning: {
      solid: `bg-amber-500 ${getSolidTextClass('warning')} hover:bg-amber-600`,
      filled: 'bg-amber-50 text-amber-800 hover:bg-amber-100',
      outlined: 'bg-transparent border border-amber-500 text-amber-700 hover:bg-amber-50',
      dashed: 'bg-transparent border border-dashed border-amber-400 text-amber-700 hover:border-amber-500',
      text: 'bg-transparent text-amber-700 hover:bg-amber-50',
      link: 'bg-transparent text-amber-700 underline-offset-4 hover:underline',
    },
  }

  const base = palettes[c]?.[variant] ?? palettes.default[variant]
  if (!ghost) return base
  return cn(
    'bg-transparent shadow-none',
    {
      default: 'text-neutral-900 hover:bg-neutral-100',
      primary: 'text-indigo-600 hover:bg-indigo-50',
      secondary: 'text-slate-700 hover:bg-slate-100',
      info: 'text-sky-700 hover:bg-sky-50',
      teal: 'text-teal-700 hover:bg-teal-50',
      cyan: 'text-cyan-700 hover:bg-cyan-50',
      blue: 'text-blue-700 hover:bg-blue-50',
      violet: 'text-violet-700 hover:bg-violet-50',
      purple: 'text-purple-700 hover:bg-purple-50',
      pink: 'text-pink-700 hover:bg-pink-50',
      rose: 'text-rose-700 hover:bg-rose-50',
      lime: 'text-lime-800 hover:bg-lime-50',
      danger: 'text-red-600 hover:bg-red-50',
      success: 'text-emerald-600 hover:bg-emerald-50',
      warning: 'text-amber-700 hover:bg-amber-50',
    }[c],
  )
}

/**
 * Tokens for animation layers (fills, lines, hover accents).
 * @param {import('./constants.js').ButtonColor} color
 */
export function getAccentTokens(color) {
  const map = {
    default: {
      fill: 'bg-neutral-900',
      line: 'bg-neutral-900',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-indigo-600',
      ring: 'ring-neutral-200 hover:ring-neutral-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(23,23,23,0.35)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(23,23,23,0.28)]',
    },
    primary: {
      fill: 'bg-indigo-600',
      line: 'bg-indigo-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-indigo-600',
      ring: 'ring-indigo-200 hover:ring-indigo-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(79,70,229,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(79,70,229,0.35)]',
    },
    secondary: {
      fill: 'bg-slate-600',
      line: 'bg-slate-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-slate-700',
      ring: 'ring-slate-200 hover:ring-slate-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(71,85,105,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(71,85,105,0.35)]',
    },
    info: {
      fill: 'bg-sky-600',
      line: 'bg-sky-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-sky-700',
      ring: 'ring-sky-200 hover:ring-sky-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(2,132,199,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(2,132,199,0.35)]',
    },
    teal: {
      fill: 'bg-teal-600',
      line: 'bg-teal-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-teal-700',
      ring: 'ring-teal-200 hover:ring-teal-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(13,148,136,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(13,148,136,0.35)]',
    },
    cyan: {
      fill: 'bg-cyan-600',
      line: 'bg-cyan-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-cyan-700',
      ring: 'ring-cyan-200 hover:ring-cyan-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(8,145,178,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(8,145,178,0.35)]',
    },
    blue: {
      fill: 'bg-blue-600',
      line: 'bg-blue-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-blue-700',
      ring: 'ring-blue-200 hover:ring-blue-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(37,99,235,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(37,99,235,0.35)]',
    },
    violet: {
      fill: 'bg-violet-600',
      line: 'bg-violet-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-violet-700',
      ring: 'ring-violet-200 hover:ring-violet-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(124,58,237,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(124,58,237,0.35)]',
    },
    purple: {
      fill: 'bg-purple-600',
      line: 'bg-purple-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-purple-700',
      ring: 'ring-purple-200 hover:ring-purple-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(147,51,234,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(147,51,234,0.35)]',
    },
    pink: {
      fill: 'bg-pink-600',
      line: 'bg-pink-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-pink-700',
      ring: 'ring-pink-200 hover:ring-pink-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(219,39,119,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(219,39,119,0.35)]',
    },
    rose: {
      fill: 'bg-rose-600',
      line: 'bg-rose-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-rose-700',
      ring: 'ring-rose-200 hover:ring-rose-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(225,29,72,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(225,29,72,0.35)]',
    },
    lime: {
      fill: 'bg-lime-600',
      line: 'bg-lime-600',
      hoverText: 'group-hover:text-neutral-900',
      staggerHover: 'group-hover:text-lime-700',
      ring: 'ring-lime-200 hover:ring-lime-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(101,163,13,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(101,163,13,0.35)]',
    },
    danger: {
      fill: 'bg-red-600',
      line: 'bg-red-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-red-600',
      ring: 'ring-red-200 hover:ring-red-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(220,38,38,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(220,38,38,0.35)]',
    },
    success: {
      fill: 'bg-emerald-600',
      line: 'bg-emerald-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-emerald-600',
      ring: 'ring-emerald-200 hover:ring-emerald-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(5,150,105,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(5,150,105,0.35)]',
    },
    warning: {
      fill: 'bg-amber-500',
      line: 'bg-amber-500',
      hoverText: 'group-hover:text-neutral-900',
      staggerHover: 'group-hover:text-amber-600',
      ring: 'ring-amber-200 hover:ring-amber-300',
      shine: 'via-white/25',
      liftShadowHover: 'hover:shadow-[0_8px_20px_-6px_rgba(245,158,11,0.45)]',
      liftShadowActive: 'active:shadow-[0_2px_8px_-4px_rgba(245,158,11,0.35)]',
    },
  }
  return {
    ...(map[color] ?? map.default),
    contrastText: getSolidTextClass(color),
    hoverText: getHoverTextClass(color),
    staggerHover: getStaggerHoverClass(color),
  }
}

/**
 * @param {object} options
 * @param {import('./constants.js').ButtonColor | undefined} options.color
 * @param {import('./constants.js').ButtonVariant | undefined} options.variant
 * @param {import('./constants.js').ButtonLegacyType | undefined} options.type
 * @param {boolean} options.danger
 * @param {boolean} options.ghost
 */
export function resolveAppearance({ color, variant, type, danger, ghost }) {
  let resolvedColor = color ?? 'default'
  if (danger) resolvedColor = 'danger'

  let resolvedVariant = variant

  if (!resolvedVariant && type) {
    const typeMap = {
      primary: 'solid',
      default: 'outlined',
      dashed: 'dashed',
      link: 'link',
      text: 'text',
    }
    resolvedVariant = /** @type {import('./constants.js').ButtonVariant} */ (typeMap[type] ?? 'outlined')
    if (type === 'primary' && !color && !danger) resolvedColor = 'primary'
  }

  if (!resolvedVariant) {
    resolvedVariant = resolvedColor === 'default' ? 'outlined' : 'solid'
  }

  const root = palette(resolvedColor, resolvedVariant, ghost)
  const accent = getAccentTokens(resolvedColor)

  return {
    color: resolvedColor,
    variant: resolvedVariant,
    root,
    accent,
  }
}
