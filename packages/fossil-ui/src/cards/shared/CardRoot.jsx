import { forwardRef } from 'react'
import { cn } from '../../lib/cn.js'

/**
 * @param {object} props
 * @param {ReturnType<import('./prepareCardProps.js').prepareCardProps>} props.prepared
 * @param {import('react').ReactNode} props.children
 */
export const CardRoot = forwardRef(function CardRoot({ prepared, children }, ref) {
  const { href, className, nativeProps } = prepared
  const Comp = href ? 'a' : 'div'

  return (
    <Comp
      ref={ref}
      href={href}
      className={cn(className)}
      {...nativeProps}
    >
      {children}
    </Comp>
  )
})
