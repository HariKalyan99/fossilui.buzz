import { HERO_ITEM_MOTIONS, createAnimatedHero } from './shared/createAnimatedHero.jsx'

/** Eyebrow, title, copy, and actions rise into place one after another. */
export const FadeUpHero = createAnimatedHero({
  displayName: 'FadeUpHero',
  itemMotion: HERO_ITEM_MOTIONS.fadeUp,
})
