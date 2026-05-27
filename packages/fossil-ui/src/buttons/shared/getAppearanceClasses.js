import { cn } from '../../lib/cn.js'

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
      solid: 'bg-amber-500 text-white hover:bg-amber-600',
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
    },
    primary: {
      fill: 'bg-indigo-600',
      line: 'bg-indigo-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-indigo-600',
      ring: 'ring-indigo-200 hover:ring-indigo-300',
      shine: 'via-white/25',
    },
    danger: {
      fill: 'bg-red-600',
      line: 'bg-red-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-red-600',
      ring: 'ring-red-200 hover:ring-red-300',
      shine: 'via-white/25',
    },
    success: {
      fill: 'bg-emerald-600',
      line: 'bg-emerald-600',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-emerald-600',
      ring: 'ring-emerald-200 hover:ring-emerald-300',
      shine: 'via-white/25',
    },
    warning: {
      fill: 'bg-amber-500',
      line: 'bg-amber-500',
      hoverText: 'group-hover:text-white',
      staggerHover: 'group-hover:text-amber-600',
      ring: 'ring-amber-200 hover:ring-amber-300',
      shine: 'via-white/25',
    },
  }
  return map[color] ?? map.default
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
