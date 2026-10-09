import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import { ScrollTrigger } from '../../lib/gsap'
import { scrollToTarget, useLenis } from '../../lib/lenisContext'

const ease = [0.16, 1, 0.3, 1]

/**
 * Page shell. Route changes fade the outgoing page, reset scroll while
 * nothing is visible, then fade in the next page and refresh ScrollTrigger.
 * Hash links (e.g. /programs#strength) scroll once the page has entered.
 */
export default function Layout({ children }) {
  const location = useLocation()
  const lenis = useLenis()
  const lenisRef = useRef(lenis)
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    lenisRef.current = lenis
  }, [lenis])

  const scrollToHash = () => {
    if (!location.hash) return
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
    if (el) scrollToTarget(lenisRef.current, el)
  }

  // Cross-page navigations scroll after the page transition; direct loads
  // and same-page hash links are handled here.
  useEffect(() => {
    const samePage = prevPath.current === location.pathname
    prevPath.current = location.pathname
    if (!samePage || !location.hash) return undefined
    const timer = setTimeout(scrollToHash, 120)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key])

  return (
    <>
      <a
        href="#main"
        className="type-eyebrow fixed top-3 left-3 z-[60] -translate-y-24 bg-volt px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <Navbar />

      <div id="page">
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => scrollToTarget(lenisRef.current, 0, { immediate: true })}
        >
          <motion.main
            id="main"
            tabIndex={-1}
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease } }}
            onAnimationComplete={(def) => {
              if (def?.opacity !== 1) return
              ScrollTrigger.refresh()
              scrollToHash()
            }}
            className="outline-none"
          >
            {children(location)}
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>

      <RouteProgress pathname={location.pathname} />
    </>
  )
}

function RouteProgress({ pathname }) {
  return (
    <AnimatePresence initial={false}>
      <motion.span
        key={pathname}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-volt"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0, transition: { scaleX: { duration: 0.8, ease }, opacity: { delay: 0.7, duration: 0.3 } } }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      />
    </AnimatePresence>
  )
}
