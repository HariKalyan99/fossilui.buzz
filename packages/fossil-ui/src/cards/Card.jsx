import { forwardRef } from 'react'
import { AccentRevealCard } from './AccentRevealCard.jsx'
import { BorderGlowCard } from './BorderGlowCard.jsx'
import { GradientShiftCard } from './GradientShiftCard.jsx'
import { ImageZoomCard } from './ImageZoomCard.jsx'
import { LiftShadowCard } from './LiftShadowCard.jsx'
import { ScaleUpCard } from './ScaleUpCard.jsx'
import { ShineSweepCard } from './ShineSweepCard.jsx'
import { TiltHoverCard } from './TiltHoverCard.jsx'

const MOTION_COMPONENTS = {
  liftShadow: LiftShadowCard,
  borderGlow: BorderGlowCard,
  imageZoom: ImageZoomCard,
  shineSweep: ShineSweepCard,
  gradientShift: GradientShiftCard,
  scaleUp: ScaleUpCard,
  accentReveal: AccentRevealCard,
  tiltHover: TiltHoverCard,
}

export const CARD_MOTIONS = /** @type {const} */ (Object.keys(MOTION_COMPONENTS))

/**
 * Standard entrypoint with motion variants.
 * Example: <Card motion="liftShadow" title="Project" description="Short copy." />
 */
export const Card = forwardRef(function Card({ motion = 'liftShadow', ...props }, ref) {
  const Comp = MOTION_COMPONENTS[motion] ?? LiftShadowCard
  return <Comp ref={ref} {...props} />
})

export { CardBody, CardMedia } from './shared/CardContent.jsx'
export { CARD_ACCENTS, CARD_SIZES } from './shared/constants.js'
