import { forwardRef } from 'react'
import { Separator } from './Separator.jsx'

export const HorizontalSeparator = forwardRef((props, ref) => (
  <Separator ref={ref} orientation="horizontal" {...props} />
))
export const VerticalSeparator = forwardRef((props, ref) => (
  <Separator ref={ref} orientation="vertical" className="h-10" {...props} />
))
export const LabeledSeparator = forwardRef((props, ref) => (
  <Separator ref={ref} orientation="horizontal" label="or" {...props} />
))

export const SEPARATOR_VARIANTS = /** @type {const} */ (['horizontal', 'vertical', 'labeled'])

export const FossilSeparator = forwardRef(function FossilSeparator({ variant = 'horizontal', ...props }, ref) {
  if (variant === 'vertical') return <VerticalSeparator ref={ref} {...props} />
  if (variant === 'labeled') return <LabeledSeparator ref={ref} {...props} />
  return <HorizontalSeparator ref={ref} {...props} />
})
