import { cn } from '../lib/cn'

/** Intrinsic raster size for Rex.svg (embedded artwork); display size comes from CSS. */
const INTRINSIC = 128

/**
 * Rex logo mark — always keeps aspect ratio (no stretch). Use `size` for square
 * icons; otherwise set height/width via className (e.g. h-7 w-auto).
 */
export function RexMark({ size, className, style, ...props }) {
  const square = size != null

  return (
    <img
      src="/Rex.svg"
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
