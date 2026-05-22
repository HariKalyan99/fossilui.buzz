import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Bell, Box } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { Tag } from '../components/ui/Tag'
import { Input } from '../components/ui/Input'

const TEASERS = [
  { name: 'Buttons', count: '10 variants' },
  { name: 'Cards', count: '8 variants' },
  { name: 'Modals', count: '6 variants' },
  { name: 'Inputs', count: '14 variants' },
  { name: 'Navbars', count: '5 variants' },
  { name: 'Hero blocks', count: '10 variants' },
]

export default function Components() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setSending(true)
    setError('')
    try {
      const userLocation =
        typeof Intl !== 'undefined'
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : undefined
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: '',
          email,
          contact: '',
          info: 'components notify',
          remarks: 'FossilUI Components waitlist signup',
          userLocation,
        }),
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to sign up')
      }
      setEmail('')
      setDone(true)
    } catch (err) {
      setError(err.message || 'Could not sign up right now')
    } finally {
      setSending(false)
    }
  }

  return (
    <Section className="pt-12 md:pt-20">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div>
          <Tag tone="accent">Coming soon</Tag>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-neutral-900 text-balance">
            A library of polished, copy-pasteable components.
          </h1>
          <p className="mt-4 text-neutral-600 max-w-md leading-relaxed">
            FossilUI Components is in design. Drop your email and we'll let you know when it ships — no spam, ever.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start"
          >
            <div className="relative flex-1 w-full min-w-0">
              <Bell className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <Input
                type="email"
                placeholder="you@developer.dev"
                className="pl-9"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (done) setDone(false)
                }}
                required
                disabled={sending}
                autoComplete="email"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="shrink-0 sm:self-stretch"
              disabled={sending || done}
            >
              {done
                ? "You're on the list"
                : sending
                  ? 'Submitting…'
                  : 'Notify me'}
            </Button>
            {error ? (
              <p className="order-last w-full basis-full text-[12px] text-rose-600">
                {error}
              </p>
            ) : null}
          </form>

          <div className="mt-10 flex items-center gap-3">
            <Button as={Link} to="/templates" variant="secondary" size="md">
              Browse templates
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <Button as={Link} to="/docs" variant="ghost" size="md">
              Read the docs
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-2 gap-3"
        >
          {TEASERS.map((t, i) => {
            const Card = motion.create(t.name === 'Buttons' ? Link : 'div')
            const linkProps = t.name === 'Buttons' ? { to: '/components/buttons' } : {}
            return (
            <Card
              key={t.name}
              {...linkProps}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.45 }}
              className="card card-hover group relative overflow-hidden p-5 flex flex-col gap-3 aspect-square justify-end"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-indigo-100/70" />
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-35" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/20" />
              <img
                src="/Rex.svg"
                alt=""
                aria-hidden="true"
                draggable="false"
                className="pointer-events-none absolute right-3 top-3 h-10 w-auto opacity-25 transition-opacity duration-300 group-hover:opacity-10"
              />
              <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
                <Box className="h-4 w-4" />
              </span>
              <div className="relative z-10">
                <div className="text-[15px] font-medium text-neutral-900">{t.name}</div>
                <div className="text-[12px] text-neutral-500 mt-0.5">{t.count}</div>
              </div>
            </Card>
            )
          })}
        </motion.div>
      </div>
    </Section>
  )
}
