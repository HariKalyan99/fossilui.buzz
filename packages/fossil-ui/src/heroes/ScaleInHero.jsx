import { cn } from '../lib/cn.js'
import { HERO_ITEM_MOTIONS, createAnimatedHero } from './shared/createAnimatedHero.jsx'

function ScaleInTitle({ title, shown }) {
  return (
    <span
      className={cn(
        'block origin-bottom transition-[opacity,scale] delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,900ms)] ease-[var(--fossil-ease,var(--fossil-ease-spring))] motion-reduce:transition-none',
        shown ? 'scale-100 opacity-100' : 'scale-[0.86] opacity-0',
      )}
      style={{ transitionDelay: shown ? '90ms' : '0ms' }}
    >
      {title}
    </span>
  )
}

/** Title springs up from a smaller scale with a gentle overshoot. */
export const ScaleInHero = createAnimatedHero({
  displayName: 'ScaleInHero',
  itemMotion: HERO_ITEM_MOTIONS.fadeUp,
  Title: ScaleInTitle,
})
