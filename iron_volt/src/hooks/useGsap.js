import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Runs GSAP setup inside a scoped gsap.context() so every tween, timeline,
 * ScrollTrigger and matchMedia created by `setup` is reverted on unmount,
 * on dependency change, and on hot reload.
 */
export function useGsap(setup, deps = []) {
  const scope = useRef(null)
  const setupRef = useRef(setup)

  useLayoutEffect(() => {
    setupRef.current = setup
  })

  useLayoutEffect(() => {
    if (!scope.current) return undefined
    const ctx = gsap.context((self) => setupRef.current(self, scope.current), scope.current)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}
