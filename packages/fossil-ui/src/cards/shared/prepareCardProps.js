import { cn } from '../../lib/cn.js'
import { CARD_ACCENTS, CARD_SIZES } from './constants.js'

/**
 * @param {import('react').HTMLAttributes<HTMLElement> & {
 *   title?: string
 *   description?: string
 *   media?: import('react').ReactNode
 *   imageSrc?: string
 *   imageAlt?: string
 *   accent?: string
 *   size?: string
 *   href?: string
 *   interactive?: boolean
 *   withMedia?: boolean
 * }} props
 * @param {{ animationClassName?: string }} config
 */
export function prepareCardProps(props, { animationClassName = '' } = {}) {
  const {
    title,
    description,
    media,
    imageSrc,
    imageAlt = '',
    accent = 'default',
    size = 'default',
    href,
    interactive = true,
    withMedia = true,
    className,
    children,
    ...rest
  } = props

  const safeAccent = CARD_ACCENTS.includes(accent) ? accent : 'default'
  const safeSize = CARD_SIZES.includes(size) ? size : 'default'

  return {
    title,
    description,
    media,
    imageSrc,
    imageAlt,
    accent: safeAccent,
    size: safeSize,
    href,
    interactive,
    withMedia,
    children,
    className: cn(
      'group relative block overflow-hidden rounded-[14px] border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]',
      interactive && 'cursor-default',
      animationClassName,
      className,
    ),
    nativeProps: rest,
  }
}
