import { cn } from '../../lib/cn.js'
import { BUTTON_BASE } from '../buttonBase.js'
import { BUTTON_SHAPES, BUTTON_SIZES } from './constants.js'
import { formatLabel, labelToString } from './formatLabel.js'
import { resolveAppearance } from './getAppearanceClasses.js'
import { resolveSemantic } from './resolveSemantic.js'

/** Props stripped before spreading to the DOM node. */
export const FOSSIL_BUTTON_PROP_KEYS = new Set([
  'autoInsertSpace',
  'block',
  'classNames',
  'color',
  'danger',
  'ghost',
  'href',
  'htmlType',
  'icon',
  'iconPlacement',
  'loading',
  'loadingIcon',
  'shape',
  'size',
  'styles',
  'target',
  'type',
  'variant',
])

/**
 * @param {object} props
 * @param {object} [options]
 * @param {string} [options.animationClassName] Default animation / layout classes
 * @param {boolean} [options.useAppearance=true] Merge color / variant tokens
 * @param {{ color?: string, variant?: string, type?: string }} [options.appearanceDefaults]
 * @param {string} [options.contentClassName] Wrapper class for animated inner content
 */
export function prepareButtonProps(props, options = {}) {
  const {
    autoInsertSpace = true,
    block = false,
    className,
    classNames,
    color,
    danger = false,
    disabled = false,
    ghost = false,
    href,
    htmlType = 'button',
    icon,
    iconPlacement = 'start',
    loading = false,
    loadingIcon,
    shape = 'default',
    size = 'medium',
    styles,
    target,
    type,
    variant,
    children,
    onClick,
    ...rest
  } = props

  const {
    animationClassName = '',
    useAppearance = true,
    appearanceDefaults = {},
    contentClassName = 'inline-flex min-w-0 items-center justify-center overflow-visible leading-none',
  } = options

  const formattedChildren = formatLabel(children, autoInsertSpace)
  const label = labelToString(formattedChildren)
  const resolvedShape = shape === 'circle' ? 'round' : shape

  const appearance = resolveAppearance({
    color: color ?? appearanceDefaults.color,
    variant: variant ?? appearanceDefaults.variant,
    type: type ?? appearanceDefaults.type,
    danger,
    ghost,
  })
  const semantic = resolveSemantic(classNames, styles, props)
  const sizeToken = BUTTON_SIZES[size] ?? BUTTON_SIZES.medium
  const shapeClass = BUTTON_SHAPES[resolvedShape] ?? BUTTON_SHAPES.default

  const rootClassName = cn(
    BUTTON_BASE,
    'group',
    sizeToken.className,
    shapeClass,
    block && 'w-full',
    useAppearance && appearance.root,
    animationClassName,
    semantic.classNames.root,
    className,
  )

  const rootStyle = {
    '--fossil-btn-h': sizeToken.height,
    ...semantic.styles.root,
  }

  const isLink = Boolean(href)
  const nativeProps = {
    ...rest,
    className: rootClassName,
    style: rootStyle,
    onClick,
    ...(isLink
      ? {
          href: disabled ? undefined : href,
          target,
          rel: target === '_blank' ? 'noopener noreferrer' : rest.rel,
          'aria-disabled': disabled || undefined,
          tabIndex: disabled ? -1 : rest.tabIndex,
        }
      : {
          type: htmlType,
          disabled: disabled || undefined,
        }),
  }

  return {
    nativeProps,
    appearance,
    semantic,
    sizeToken,
    formattedChildren,
    label,
    icon,
    iconPlacement,
    loading,
    loadingIcon,
    disabled,
    isLink,
    htmlType,
    contentClassName,
  }
}

/**
 * @param {object} props
 */
export function splitButtonProps(props) {
  const native = { ...props }
  for (const key of FOSSIL_BUTTON_PROP_KEYS) {
    delete native[key]
  }
  return native
}
