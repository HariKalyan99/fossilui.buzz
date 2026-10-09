import { createContext, useContext } from 'react'

export const LenisContext = createContext(null)

export function useLenis() {
  return useContext(LenisContext)
}

/** Scrolls to an element or y-position, using Lenis when it is active. */
export function scrollToTarget(lenis, target, { immediate = false, offset = -88 } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (target !== 0 && !el) return false

  if (lenis) {
    lenis.scrollTo(target === 0 ? 0 : el, { offset: target === 0 ? 0 : offset, immediate, force: true })
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' })
  }

  if (el && target !== 0) {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
  return true
}
