import { useEffect, useRef, useState } from 'react'

/**
 * Touch screens never match `hover:` (Tailwind v4 gates it behind `(hover: hover)`),
 * so tapped elements get a `data-touch` attribute that `data-[touch]:` and
 * `group-data-[touch]:` classes mirror the hover styles with.
 *
 * - timed (default): the state holds for `hold` ms after the finger lifts, so the
 *   hover animation has time to play before it reverses.
 * - sticky: the state stays until a tap lands outside the element.
 *
 * Mouse pointers are ignored; they already get real hover. A scroll gesture
 * (pointercancel) restores the previous state so swiping past doesn't trigger it.
 *
 * @param {{ hold?: number, sticky?: boolean, handlers?: Record<string, Function | undefined> }} [options]
 */
export function useTouchHover({ hold = 900, sticky = false, handlers = {} } = {}) {
  const [touched, setTouched] = useState(false)
  const timer = useRef(0)
  const nodeRef = useRef(null)
  const wasTouched = useRef(false)

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    if (!sticky || !touched) return undefined
    const onOutside = (event) => {
      if (!nodeRef.current?.contains(event.target)) setTouched(false)
    }
    document.addEventListener('pointerdown', onOutside)
    return () => document.removeEventListener('pointerdown', onOutside)
  }, [sticky, touched])

  const { onPointerDown, onPointerUp, onPointerCancel } = handlers

  return {
    'data-touch': touched ? '' : undefined,
    onPointerDown: (event) => {
      onPointerDown?.(event)
      if (event.pointerType === 'mouse') return
      nodeRef.current = event.currentTarget
      wasTouched.current = touched
      clearTimeout(timer.current)
      setTouched(true)
    },
    onPointerUp: (event) => {
      onPointerUp?.(event)
      if (event.pointerType === 'mouse' || sticky) return
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setTouched(false), hold)
    },
    onPointerCancel: (event) => {
      onPointerCancel?.(event)
      if (event.pointerType === 'mouse') return
      clearTimeout(timer.current)
      setTouched(sticky ? wasTouched.current : false)
    },
  }
}

/**
 * Timed touch state for a list of items rendered from one component (e.g. nav links),
 * where a hook per item isn't possible. `propsFor(key)` returns the same shape as
 * `useTouchHover`.
 *
 * @param {number} [hold]
 */
export function useTouchKey(hold = 900) {
  const [touchedKey, setTouchedKey] = useState(null)
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  return (key) => ({
    'data-touch': touchedKey === key ? '' : undefined,
    onPointerDown: (event) => {
      if (event.pointerType === 'mouse') return
      clearTimeout(timer.current)
      setTouchedKey(key)
    },
    onPointerUp: (event) => {
      if (event.pointerType === 'mouse') return
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setTouchedKey(null), hold)
    },
    onPointerCancel: (event) => {
      if (event.pointerType === 'mouse') return
      clearTimeout(timer.current)
      setTouchedKey(null)
    },
  })
}
