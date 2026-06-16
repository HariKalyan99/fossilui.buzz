import { cn } from '../../lib/cn.js'
import {
  CARD_ACCENT_GRADIENTS,
  CARD_SIZE_PADDING,
} from './constants.js'

/**
 * @param {{
 *   title?: string
 *   description?: string
 *   media?: import('react').ReactNode
 *   imageSrc?: string
 *   imageAlt?: string
 *   accent?: string
 *   size?: string
 *   withMedia?: boolean
 *   mediaClassName?: string
 *   imageClassName?: string
 *   bodyClassName?: string
 * }} props
 */
export function CardMedia({
  accent = 'default',
  media,
  imageSrc,
  imageAlt = '',
  mediaClassName,
  imageClassName,
  withMedia = true,
}) {
  if (!withMedia) return null

  if (media) {
    return <div className={cn('relative overflow-hidden', mediaClassName)}>{media}</div>
  }

  if (imageSrc) {
    return (
      <div
        className={cn(
          'relative aspect-[16/10] overflow-hidden bg-neutral-100',
          mediaClassName,
        )}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className={cn('h-full w-full object-cover', imageClassName)}
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative aspect-[16/10] overflow-hidden bg-gradient-to-br',
        CARD_ACCENT_GRADIENTS[accent] ?? CARD_ACCENT_GRADIENTS.default,
        mediaClassName,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[length:24px_24px] opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/45 via-transparent to-white/15" />
    </div>
  )
}

export function CardBody({ title, description, size = 'default', bodyClassName, children }) {
  if (children) {
    return <div className={cn(CARD_SIZE_PADDING[size] ?? CARD_SIZE_PADDING.default, bodyClassName)}>{children}</div>
  }

  return (
    <div className={cn(CARD_SIZE_PADDING[size] ?? CARD_SIZE_PADDING.default, bodyClassName)}>
      {title ? (
        <h3 className="text-[15px] font-medium tracking-tight text-neutral-900">{title}</h3>
      ) : null}
      {description ? (
        <p className="mt-1 text-[12px] leading-relaxed text-neutral-500 sm:text-[13px]">{description}</p>
      ) : null}
    </div>
  )
}

export function renderDefaultCardContent(prepared, options = {}) {
  const { mediaClassName, imageClassName, bodyClassName, mediaWrapper } = options
  const mediaNode = (
    <CardMedia
      accent={prepared.accent}
      media={prepared.media}
      imageSrc={prepared.imageSrc}
      imageAlt={prepared.imageAlt}
      withMedia={prepared.withMedia}
      mediaClassName={mediaClassName}
      imageClassName={imageClassName}
    />
  )

  return (
    <>
      {mediaWrapper ? mediaWrapper(mediaNode) : mediaNode}
      <CardBody
        title={prepared.title}
        description={prepared.description}
        size={prepared.size}
        bodyClassName={bodyClassName}
      >
        {prepared.children}
      </CardBody>
    </>
  )
}
