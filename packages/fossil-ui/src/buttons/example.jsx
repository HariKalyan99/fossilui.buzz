import React from 'react'
import {
  BorderRevealButton,
  IconSlideButton,
  LetterSpacingButton,
  LiftShadowButton,
  RollTextButton,
  ShineSweepButton,
  SkewFillButton,
  SlideFillButton,
  StaggerTextButton,
  UnderlineGrowButton,
} from './index.js'

/**
 * Drop-in demo/template users can mount in their app after installing:
 * import { ButtonExample } from '@fossilui/react/button/example'
 */
export function ButtonExample() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <RollTextButton>Roll Text</RollTextButton>
      <StaggerTextButton>Stagger Text</StaggerTextButton>
      <SlideFillButton>Slide Fill</SlideFillButton>
      <ShineSweepButton>Shine Sweep</ShineSweepButton>
      <BorderRevealButton>Border Reveal</BorderRevealButton>
      <IconSlideButton>Icon Slide</IconSlideButton>
      <UnderlineGrowButton>Underline Grow</UnderlineGrowButton>
      <LiftShadowButton>Lift Shadow</LiftShadowButton>
      <LetterSpacingButton>Letter Spacing</LetterSpacingButton>
      <SkewFillButton>Skew Fill</SkewFillButton>
    </div>
  )
}

export default ButtonExample
