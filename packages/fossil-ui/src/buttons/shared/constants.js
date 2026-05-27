/** @typedef {'root' | 'icon' | 'content'} ButtonSemanticDOM */

/** @typedef {'small' | 'medium' | 'large'} ButtonSize */

/** @typedef {'default' | 'circle' | 'round'} ButtonShape */

/** @typedef {'default' | 'primary' | 'danger' | 'success' | 'warning'} ButtonColor */

/**
 * @typedef {'outlined' | 'dashed' | 'solid' | 'filled' | 'text' | 'link'} ButtonVariant
 */

/**
 * Ant Design legacy `type` — maps to variant + color when variant/color omitted.
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
  circle: 'rounded-full aspect-square p-0 min-w-0 justify-center',
  round: 'rounded-full',
})
