import { useEffect, useRef } from 'react'
import { cn } from '../lib/cn.js'
import { HERO_ITEM_MOTIONS, createAnimatedHero } from './shared/createAnimatedHero.jsx'

const FLOW_KEYFRAMES = [{ backgroundPosition: '0% 50%' }, { backgroundPosition: '200% 50%' }]

function GradientTitle({ title, reduceMotion, item }) {
  const textRef = useRef(null)

  useEffect(() => {
    if (reduceMotion) return undefined
    const animation = textRef.current?.animate?.(FLOW_KEYFRAMES, {
      duration: 6000,
      iterations: Infinity,
      easing: 'linear',
    })
    return () => animation?.cancel()
  }, [reduceMotion])

  const entrance = item(1, 'block')
  return (
    <span {...entrance}>
      <span
        ref={textRef}
        className={cn(
          'bg-gradient-to-r from-neutral-900 via-indigo-500 to-neutral-900 bg-[length:200%_auto] bg-clip-text text-transparent',
          '[-webkit-box-decoration-break:clone] [box-decoration-break:clone]',
        )}
      >
        {title}
      </span>
    </span>
  )
}

/** Title fills with a gradient that flows continuously across the text. */
export const GradientTextHero = createAnimatedHero({
  displayName: 'GradientTextHero',
  itemMotion: HERO_ITEM_MOTIONS.fadeUp,
  Title: GradientTitle,
})
