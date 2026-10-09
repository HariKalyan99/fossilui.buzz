import { forwardRef } from 'react'
import { cn } from '../../lib/cn.js'
import { useTouchHover } from '../../lib/touch.js'

/**
 * @param {object} props
 * @param {ReturnType<import('./prepareCardProps.js').prepareCardProps>} props.prepared
 * @param {import('react').ReactNode} props.children
 */
export const CardRoot = forwardRef(function CardRoot({ prepared, children }, ref) {
  const { href, className, interactive, nativeProps } = prepared
  const { onPointerDown, onPointerUp, onPointerCancel, ...rest } = nativeProps
  const touchProps = useTouchHover({ sticky: true, handlers: { onPointerDown, onPointerUp, onPointerCancel } })
  const Comp = href ? 'a' : 'div'

  return (
    <Comp
      ref={ref}
      href={href}
      className={cn(className)}
      {...rest}
      {...(interactive ? touchProps : { onPointerDown, onPointerUp, onPointerCancel })}
    >
      {children}
    </Comp>
  )
})
