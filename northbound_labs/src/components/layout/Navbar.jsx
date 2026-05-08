import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { BRAND, NAV_LINKS } from '../../lib/data'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { cn } from '../../lib/cn'

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--fg)] text-[var(--bg)] font-semibold text-[13px] tracking-tight">
        {BRAND.mark}
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[var(--accent)]" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-[var(--fg)]">
        {BRAND.name}
      </span>
    </a>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-x">
        <div
          className={cn(
            'mt-3 flex h-16 items-center justify-between rounded-full border px-3 pl-5 transition-all duration-300',
            scrolled
              ? 'border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl shadow-[0_1px_0_0_var(--border)]'
              : 'border-transparent bg-transparent',
          )}
        >
          <Logo />

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button
              as="a"
              href="#contact"
              variant="primary"
              size="sm"
              withArrow
              className="hidden md:inline-flex"
            >
              Book a call
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--fg)] md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden container-x"
          >
            <div className="mt-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] text-[var(--fg)] hover:bg-[var(--bg-subtle)]"
                >
                  {link.label}
                  <span className="text-xs text-[var(--fg-subtle)]">→</span>
                </a>
              ))}
              <div className="flex items-center gap-2 p-2 pt-3">
                <ThemeToggle />
                <Button
                  as="a"
                  href="#contact"
                  variant="primary"
                  size="md"
                  withArrow
                  className="flex-1"
                  onClick={() => setOpen(false)}
                >
                  Book a call
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
