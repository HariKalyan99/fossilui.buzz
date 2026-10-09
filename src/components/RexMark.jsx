import { cn } from '../lib/cn'

/** Intrinsic raster size of the logo; display size comes from CSS. */
const INTRINSIC = 128

/**
 * Rex logo mark — always keeps aspect ratio (no stretch). Use `size` for square
 * icons; otherwise set height/width via className (e.g. h-7 w-auto).
 *
 * Served as pre-rendered PNGs: iOS WebKit paints Rex.svg's masked embedded
 * rasters late or as a solid black square, and blurs them at small sizes.
 */
export function RexMark({ size, className, style, ...props }) {
  const square = size != null

  return (
    <img
      src="/rex-256.png"
      srcSet="/rex-128.png 128w, /rex-256.png 256w"
      sizes={square ? `${size}px` : '48px'}
      alt=""
      aria-hidden="true"
      draggable="false"
      decoding="async"
      width={INTRINSIC}
      height={INTRINSIC}
      className={cn(
        'inline-block max-w-none shrink-0 object-contain [flex:none]',
        square && 'aspect-square',
        className,
      )}
      style={
        square
          ? { width: size, height: size, minWidth: size, minHeight: size, ...style }
          : style
      }
      {...props}
    />
  )
}
