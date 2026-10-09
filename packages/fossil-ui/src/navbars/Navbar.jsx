import { forwardRef } from 'react'
import { DotIndicatorNavbar } from './DotIndicatorNavbar.jsx'
import { GlassFloatNavbar } from './GlassFloatNavbar.jsx'
import { GrowUnderlineNavbar } from './GrowUnderlineNavbar.jsx'
import { SlidingPillNavbar } from './SlidingPillNavbar.jsx'
import { SlidingUnderlineNavbar } from './SlidingUnderlineNavbar.jsx'
import { SpotlightNavbar } from './SpotlightNavbar.jsx'
import { TextRollNavbar } from './TextRollNavbar.jsx'

const MOTION_COMPONENTS = {
  slidingPill: SlidingPillNavbar,
  slidingUnderline: SlidingUnderlineNavbar,
  dotIndicator: DotIndicatorNavbar,
  growUnderline: GrowUnderlineNavbar,
  textRoll: TextRollNavbar,
  spotlight: SpotlightNavbar,
  glassFloat: GlassFloatNavbar,
}

export const NAVBAR_MOTIONS = /** @type {const} */ (Object.keys(MOTION_COMPONENTS))

/**
 * Standard entrypoint with motion variants.
 * Example: <Navbar motion="slidingPill" brand="Acme" links={[{ label: 'Docs', href: '/docs' }]} />
 */
export const Navbar = forwardRef(function Navbar({ motion = 'slidingPill', ...props }, ref) {
  const Comp = MOTION_COMPONENTS[motion] ?? SlidingPillNavbar
  return <Comp ref={ref} {...props} />
})
