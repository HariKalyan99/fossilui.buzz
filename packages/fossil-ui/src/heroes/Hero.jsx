import { forwardRef } from 'react'
import { BlurRevealHero } from './BlurRevealHero.jsx'
import { FadeUpHero } from './FadeUpHero.jsx'
import { GradientTextHero } from './GradientTextHero.jsx'
import { LetterCascadeHero } from './LetterCascadeHero.jsx'
import { ScaleInHero } from './ScaleInHero.jsx'
import { SpotlightHero } from './SpotlightHero.jsx'
import { StaggerWordsHero } from './StaggerWordsHero.jsx'
import { TypewriterHero } from './TypewriterHero.jsx'

const MOTION_COMPONENTS = {
  fadeUp: FadeUpHero,
  staggerWords: StaggerWordsHero,
  blurReveal: BlurRevealHero,
  scaleIn: ScaleInHero,
  letterCascade: LetterCascadeHero,
  gradientText: GradientTextHero,
  spotlight: SpotlightHero,
  typewriter: TypewriterHero,
}

export const HERO_MOTIONS = /** @type {const} */ (Object.keys(MOTION_COMPONENTS))

/**
 * Standard entrypoint with motion variants.
 * Example: <Hero motion="staggerWords" title="Ship faster" primaryLabel="Get started" />
 */
export const Hero = forwardRef(function Hero({ motion = 'fadeUp', ...props }, ref) {
  const Comp = MOTION_COMPONENTS[motion] ?? FadeUpHero
  return <Comp ref={ref} {...props} />
})

export { HERO_ALIGNS, HERO_BACKGROUNDS } from './shared/constants.js'
