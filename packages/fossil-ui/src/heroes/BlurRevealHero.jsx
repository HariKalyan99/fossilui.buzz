import { HERO_ITEM_MOTIONS, createAnimatedHero } from './shared/createAnimatedHero.jsx'

/** Content sharpens from a soft blur in a staggered sequence. */
export const BlurRevealHero = createAnimatedHero({
  displayName: 'BlurRevealHero',
  itemMotion: HERO_ITEM_MOTIONS.blur,
})
