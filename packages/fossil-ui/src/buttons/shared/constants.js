/** @typedef {'root' | 'icon' | 'content'} ButtonSemanticDOM */

/** @typedef {'small' | 'medium' | 'large'} ButtonSize */

/** @typedef {'default' | 'square' | 'round'} ButtonShape */

/** @typedef {'default' | 'primary' | 'secondary' | 'info' | 'teal' | 'cyan' | 'blue' | 'violet' | 'purple' | 'pink' | 'rose' | 'lime' | 'danger' | 'success' | 'warning'} ButtonColor */

/**
 * @typedef {'outlined' | 'dashed' | 'solid' | 'filled' | 'text' | 'link'} ButtonVariant
 */

/**
 * Legacy `type` shorthand — maps to variant + color when variant/color omitted.
 * @typedef {'primary' | 'dashed' | 'link' | 'text' | 'default'} ButtonLegacyType
 */

/** @typedef {'start' | 'end'} IconPlacement */

export const BUTTON_SEMANTIC_DOM = /** @type {const} */ (['root', 'icon', 'content'])

export const BUTTON_SIZES = /** @type {const} */ ({
  small: {
    className: 'h-8 min-h-8 px-3 text-[13px] gap-1.5',
    height: '2rem',
  },
  medium: {
    className: 'h-10 min-h-10 px-4 text-[14px] gap-2',
    height: '2.5rem',
  },
  large: {
    className: 'h-11 min-h-11 px-5 text-[15px] gap-2',
    height: '2.75rem',
  },
})

export const BUTTON_SHAPES = /** @type {const} */ ({
  default: 'rounded-lg',
  /** Sharp corners — no border radius. */
  square: '!rounded-none',
  round: 'rounded-full',
})
