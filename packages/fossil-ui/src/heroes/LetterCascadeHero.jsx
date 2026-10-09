import { Fragment } from 'react'
import { cn } from '../lib/cn.js'
import { HERO_ITEM_MOTIONS, createAnimatedHero } from './shared/createAnimatedHero.jsx'

const LETTER_STEP_MS = 22
const MAX_DELAY_MS = 1100

function LetterCascadeTitle({ title, shown }) {
  let letterIndex = 0
  const words = title.split(' ')

  return (
    <>
      <span className="sr-only">{title}</span>
      <span aria-hidden>
        {words.map((word, wordIndex) => (
          <Fragment key={`${word}-${wordIndex}`}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, charIndex) => {
                const delay = Math.min(90 + letterIndex++ * LETTER_STEP_MS, MAX_DELAY_MS)
                return (
                  <span
                    key={charIndex}
                    className={cn(
                      'inline-block transition-[translate,opacity,rotate] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none',
                      shown ? 'translate-y-0 rotate-0 opacity-100' : '-translate-y-4 -rotate-12 opacity-0',
                    )}
                    style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
                  >
                    {char}
                  </span>
                )
              })}
            </span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </>
  )
}

/** Title letters drop and settle into place one by one. */
export const LetterCascadeHero = createAnimatedHero({
  displayName: 'LetterCascadeHero',
  itemMotion: HERO_ITEM_MOTIONS.fadeUp,
  Title: LetterCascadeTitle,
})
