import { forwardRef } from 'react'
import { Badge } from './Badge.jsx'

export { Badge }

export const DefaultBadge = forwardRef((props, ref) => <Badge ref={ref} motion="default" {...props} />)
export const PulseBadge = forwardRef((props, ref) => <Badge ref={ref} motion="pulse" tone="accent" {...props} />)
export const ShineBadge = forwardRef((props, ref) => <Badge ref={ref} motion="shine" tone="accent" {...props} />)
export const ScaleBadge = forwardRef((props, ref) => <Badge ref={ref} motion="scale" {...props} />)
export const DotBadge = forwardRef((props, ref) => <Badge ref={ref} motion="dot" tone="success" {...props} />)
export const BorderGlowBadge = forwardRef((props, ref) => (
  <Badge ref={ref} motion="borderGlow" tone="accent" {...props} />
))

DefaultBadge.displayName = 'DefaultBadge'
PulseBadge.displayName = 'PulseBadge'
ShineBadge.displayName = 'ShineBadge'
ScaleBadge.displayName = 'ScaleBadge'
DotBadge.displayName = 'DotBadge'
BorderGlowBadge.displayName = 'BorderGlowBadge'

const MOTION_COMPONENTS = {
  default: DefaultBadge,
  pulse: PulseBadge,
  shine: ShineBadge,
  scale: ScaleBadge,
  dot: DotBadge,
  borderGlow: BorderGlowBadge,
}

export const BADGE_MOTIONS = /** @type {const} */ (Object.keys(MOTION_COMPONENTS))

export const FossilBadge = forwardRef(function FossilBadge({ motion = 'default', ...props }, ref) {
  const Comp = MOTION_COMPONENTS[motion] ?? DefaultBadge
  return <Comp ref={ref} {...props} />
})
