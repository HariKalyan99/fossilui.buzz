import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button'
import { mainNav, site } from '../../data/site'
import { useLenis } from '../../lib/lenisContext'

const ease = [0.16, 1, 0.3, 1]

export default function MobileMenu({ open, onClose, returnFocusRef }) {
  const lenis = useLenis()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const page = document.getElementById('page')
    const returnTo = returnFocusRef.current

    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    page?.setAttribute('inert', '')

    const firstLink = panelRef.current?.querySelector('a')
    firstLink?.focus({ preventScroll: true })

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      page?.removeAttribute('inert')
      window.removeEventListener('keydown', onKey)
      returnTo?.focus({ preventScroll: true })
    }
  }, [open, lenis, onClose, returnFocusRef])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.7, ease }}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-24 pb-10 lg:hidden"
        >
          <nav aria-label="Mobile" className="container-x flex-1">
            <ul className="border-t border-bone/10">
              {[{ label: 'Home', to: '/' }, ...mainNav].map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.7, ease }}
                  className="border-b border-bone/10"
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `type-display flex items-center justify-between py-4 text-[clamp(1.6rem,7vw,3rem)] transition-colors ${
                        isActive ? 'text-volt' : 'text-bone hover:text-volt'
                      }`
                    }
                  >
                    {item.label}
                    <ArrowUpRight aria-hidden="true" className="size-6 opacity-50" />
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="container-x mt-10 flex flex-col gap-6"
          >
            <Button to="/book-trial" onClick={onClose} className="w-full sm:w-auto">
              Book a trial session
            </Button>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ash">
              <a href={`mailto:${site.contact.email}`} className="link-underline">
                {site.contact.email}
              </a>
              <a href={site.contact.phoneHref} className="link-underline">
                {site.contact.phone}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
