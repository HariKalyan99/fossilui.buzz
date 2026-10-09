import { useEffect, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Tailwind v4 drives translate/scale/rotate through their own CSS properties,
 * so transitions must list them alongside `transform`.
 */
export const TRANSITION_MOTION =
  'transition-[opacity,transform,translate,scale,rotate,filter]'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && Boolean(window.matchMedia?.(REDUCED_MOTION_QUERY).matches),
  )

  useEffect(() => {
    const query = window.matchMedia?.(REDUCED_MOTION_QUERY)
    if (!query) return undefined
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Keeps an element mounted while it animates out.
 * `visible` flips one frame after mount so enter transitions run.
 *
 * @param {boolean} open
 * @param {number} duration exit duration in ms
 */
export function usePresence(open, duration) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)
  const [prevOpen, setPrevOpen] = useState(open)

  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) setMounted(true)
  }

  useEffect(() => {
    if (open) {
      let second = 0
      const first = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => setVisible(true))
      })
      return () => {
        cancelAnimationFrame(first)
        cancelAnimationFrame(second)
      }
    }
    const frame = requestAnimationFrame(() => setVisible(false))
    const timer = setTimeout(() => setMounted(false), duration)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [open, duration])

  return { mounted, visible }
}

/**
 * Flips to true the first time the element scrolls into view.
 *
 * @param {import('react').RefObject<Element | null>} ref
 * @param {boolean} [skip] reveal immediately (e.g. reduced motion)
 */
export function useInViewOnce(ref, skip = false) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (skip || typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setInView(true))
      return () => cancelAnimationFrame(frame)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, skip])

  return inView
}
