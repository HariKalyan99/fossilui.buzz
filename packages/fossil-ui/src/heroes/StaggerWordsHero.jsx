import { Fragment } from 'react'
import { cn } from '../lib/cn.js'
import { HERO_ITEM_MOTIONS, createAnimatedHero } from './shared/createAnimatedHero.jsx'

function StaggerWordsTitle({ title, shown }) {
  const words = title.split(' ')
  return (
    <>
      <span className="sr-only">{title}</span>
      <span aria-hidden>
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <span
                className={cn(
                  'inline-block transition-[translate,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                  shown ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
                )}
                style={{ transitionDelay: shown ? `${90 + index * 70}ms` : '0ms' }}
              >
                {word}
              </span>
            </span>
            {index < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </>
  )
}

/** Each title word slides up out of its own mask in sequence. */
export const StaggerWordsHero = createAnimatedHero({
  displayName: 'StaggerWordsHero',
  itemMotion: HERO_ITEM_MOTIONS.fadeUp,
  Title: StaggerWordsTitle,
})
