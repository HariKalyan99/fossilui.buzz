import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import MobileMenu from './MobileMenu'
import { mainNav } from '../../data/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const toggleRef = useRef(null)
  const { pathname } = useLocation()
  const [lastPath, setLastPath] = useState(pathname)

  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 24)
        setHidden(y > 480 && y > lastY + 2)
        if (Math.abs(y - lastY) > 2) lastY = y
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const close = useCallback(() => setOpen(false), [])
  const solid = scrolled && !open

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: hidden && !open ? '-100%' : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], opacity: { delay: 0.7, duration: 0.8 } }}
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid ? 'border-b border-bone/10 bg-ink/95' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-x flex h-18 items-center justify-between gap-3 sm:gap-6 lg:h-22">
          <Logo onClick={close} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `type-eyebrow relative flex h-22 items-center px-4 transition-colors duration-300 xl:px-5 ${
                        isActive ? 'text-bone' : 'text-bone/65 hover:text-bone'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="nav-indicator"
                            aria-hidden="true"
                            className="absolute inset-x-2 top-0 h-1 bg-volt"
                            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                          />
                        )}
                        <span className="link-underline pb-0.5">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button to="/book-trial" className="min-h-11! whitespace-nowrap px-4! sm:px-5! max-sm:[&>svg]:hidden max-[379px]:hidden!" onClick={close}>
              Book a trial
            </Button>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center border border-bone/20 text-bone transition-colors hover:border-volt hover:text-volt lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={close} returnFocusRef={toggleRef} />
    </>
  )
}
