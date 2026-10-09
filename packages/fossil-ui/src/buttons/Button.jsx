import { forwardRef } from 'react'
import { BorderRevealButton } from './BorderRevealButton.jsx'
import { IconSlideButton } from './IconSlideButton.jsx'
import { LetterSpacingButton } from './LetterSpacingButton.jsx'
import { LiftShadowButton } from './LiftShadowButton.jsx'
import { RollTextButton } from './RollTextButton.jsx'
import { ShineSweepButton } from './ShineSweepButton.jsx'
import { SkewFillButton } from './SkewFillButton.jsx'
import { SlideFillButton } from './SlideFillButton.jsx'
import { StaggerTextButton } from './StaggerTextButton.jsx'
import { UnderlineGrowButton } from './UnderlineGrowButton.jsx'

const MOTION_COMPONENTS = {
  rollText: RollTextButton,
  staggerText: StaggerTextButton,
  slideFill: SlideFillButton,
  shineSweep: ShineSweepButton,
  borderReveal: BorderRevealButton,
  iconSlide: IconSlideButton,
  underlineGrow: UnderlineGrowButton,
  liftShadow: LiftShadowButton,
  letterSpacing: LetterSpacingButton,
  skewFill: SkewFillButton,
}

export const BUTTON_MOTIONS = /** @type {const} */ (Object.keys(MOTION_COMPONENTS))

/**
 * Standard entrypoint with motion variants.
 * Example: <Button motion="slideFill">Docs</Button>
 */
export const Button = forwardRef(function Button(
  { motion = 'liftShadow', ...props },
  ref,
) {
  const Comp = MOTION_COMPONENTS[motion] ?? LiftShadowButton
  return <Comp ref={ref} {...props} />
})
