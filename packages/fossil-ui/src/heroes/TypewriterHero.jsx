import { useEffect, useState } from 'react'
import { HERO_ITEM_MOTIONS, createAnimatedHero } from './shared/createAnimatedHero.jsx'

const TYPE_STEP_MS = 45

function TypewriterTitle({ title, shown, reduceMotion }) {
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (!shown || reduceMotion) return undefined
    const timer = setInterval(() => {
      setTyped((count) => Math.min(count + 1, title.length))
    }, TYPE_STEP_MS)
    return () => clearInterval(timer)
  }, [shown, reduceMotion, title])

  const visible = reduceMotion ? title.length : typed

  // Untyped text stays in the layout (transparent) so line breaks never shift.
  return (
    <>
      <span className="sr-only">{title}</span>
      <span aria-hidden>
        {title.slice(0, visible)}
        <span className="relative">
          <span className="absolute left-0.5 top-[0.08em] h-[0.95em] w-[3px] animate-pulse rounded-full bg-indigo-500" />
        </span>
        <span className="text-transparent">{title.slice(visible)}</span>
      </span>
    </>
  )
}

/** Title types itself out with a blinking caret once in view. */
export const TypewriterHero = createAnimatedHero({
  displayName: 'TypewriterHero',
  itemMotion: HERO_ITEM_MOTIONS.fadeUp,
  Title: TypewriterTitle,
})
