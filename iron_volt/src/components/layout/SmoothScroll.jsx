import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { LenisContext } from '../../lib/lenisContext'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Lenis drives wheel scrolling on pointer devices only; touch keeps native
 * momentum, and reduced-motion users get plain native scrolling.
 */
export default function SmoothScroll({ children }) {
  const reduced = usePrefersReducedMotion()
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    if (reduced) return undefined

    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.11,
      wheelMultiplier: 1,
      syncTouch: false,
    })

    instance.on('scroll', ScrollTrigger.update)
    const tick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance)
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
