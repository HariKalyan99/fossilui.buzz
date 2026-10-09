import { forwardRef } from 'react'
import { BorderDrawInput } from './BorderDrawInput.jsx'
import { FillSweepInput } from './FillSweepInput.jsx'
import { FloatingLabelInput } from './FloatingLabelInput.jsx'
import { FocusGlowInput } from './FocusGlowInput.jsx'
import { GradientBorderInput } from './GradientBorderInput.jsx'
import { IconPopInput } from './IconPopInput.jsx'
import { PlaceholderSlideInput } from './PlaceholderSlideInput.jsx'
import { UnderlineGrowInput } from './UnderlineGrowInput.jsx'

const MOTION_COMPONENTS = {
  focusGlow: FocusGlowInput,
  floatingLabel: FloatingLabelInput,
  underlineGrow: UnderlineGrowInput,
  gradientBorder: GradientBorderInput,
  iconPop: IconPopInput,
  fillSweep: FillSweepInput,
  placeholderSlide: PlaceholderSlideInput,
  borderDraw: BorderDrawInput,
}

export const INPUT_MOTIONS = /** @type {const} */ (Object.keys(MOTION_COMPONENTS))

/**
 * Standard entrypoint with motion variants.
 * Example: <Input motion="floatingLabel" label="Email" type="email" />
 */
export const Input = forwardRef(function Input({ motion = 'focusGlow', ...props }, ref) {
  const Comp = MOTION_COMPONENTS[motion] ?? FocusGlowInput
  return <Comp ref={ref} {...props} />
})

export { INPUT_SIZES } from './shared/constants.js'
