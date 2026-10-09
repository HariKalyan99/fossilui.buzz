import { useEffect, useRef } from 'react'
import { HERO_ITEM_MOTIONS, createAnimatedHero } from './shared/createAnimatedHero.jsx'

function SpotlightOverlay({ reduceMotion }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const host = overlay?.parentElement
    if (!overlay || !host || reduceMotion) return undefined

    const onPointer = (event) => {
      const bounds = host.getBoundingClientRect()
      overlay.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
      overlay.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
    }

    host.addEventListener('pointerdown', onPointer)
    host.addEventListener('pointermove', onPointer)
    return () => {
      host.removeEventListener('pointerdown', onPointer)
      host.removeEventListener('pointermove', onPointer)
    }
  }, [reduceMotion])

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[5] opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100 group-data-[touch]/hero:opacity-100"
      style={{
        background:
          'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 30%), rgba(99, 102, 241, 0.16), transparent 65%)',
      }}
    />
  )
}

/** A soft glow follows the cursor (or a tap) across the section while content fades up. */
export const SpotlightHero = createAnimatedHero({
  displayName: 'SpotlightHero',
  itemMotion: HERO_ITEM_MOTIONS.fadeUp,
  Overlay: SpotlightOverlay,
})
