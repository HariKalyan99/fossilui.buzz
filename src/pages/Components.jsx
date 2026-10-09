import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  CreditCard,
  LayoutTemplate,
  MousePointerClick,
  PanelTop,
  Terminal,
  TextCursorInput,
} from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { Tag } from '../components/ui/Tag'
import { RexMark } from '../components/RexMark'
import { cn } from '../lib/cn'

const TEASERS = [
  { name: 'Buttons', count: '11 variants', href: '/components/buttons', icon: MousePointerClick },
  { name: 'Cards', count: '8 variants', href: '/components/cards', icon: CreditCard },
  { name: 'Modals', count: '8 variants', href: '/components/modals', icon: AppWindow, isNew: true },
  { name: 'Inputs', count: '8 variants', href: '/components/inputs', icon: TextCursorInput, isNew: true },
  { name: 'Navbars', count: '7 variants', href: '/components/navbars', icon: PanelTop, isNew: true },
  { name: 'Hero blocks', count: '8 variants', href: '/components/heroes', icon: LayoutTemplate, isNew: true },
]

const MotionLink = motion.create(Link)

function NewRibbon() {
  return (
    <span className="pointer-events-none absolute right-0 top-0 z-20 h-16 w-16 overflow-hidden" aria-hidden>
      <span
        className={cn(
          'absolute right-[-26px] top-[12px] w-[96px] rotate-45 py-[3px] text-center',
          'bg-gradient-to-r from-indigo-600 to-violet-600 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white',
          'shadow-[0_2px_6px_rgba(79,70,229,0.35)]',
        )}
      >
        New
      </span>
    </span>
  )
}

const TeaserCard = memo(function TeaserCard({ name, count, href, icon: Icon, isNew, index }) {
  return (
    <MotionLink
      to={href}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.45 }}
      aria-label={`${name}, ${count}${isNew ? ', new' : ''}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white',
        'shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[transform,box-shadow,border-color] duration-200',
        'hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_10px_24px_-12px_rgba(15,23,42,0.22)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/45 focus-visible:ring-offset-2',
      )}
    >
      {isNew ? <NewRibbon /> : null}

      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-indigo-50">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="pointer-events-none absolute h-24 w-24 rounded-full bg-indigo-200/40 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-60" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
          <RexMark className="h-8 w-auto sm:h-9" />
        </span>
      </div>

      <div className="flex items-center gap-3 border-t border-neutral-100 px-3.5 py-3 sm:px-4">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] font-medium text-neutral-900">{name}</div>
          <div className="text-[12px] text-neutral-500">{count}</div>
        </div>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-neutral-400 transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900"
          strokeWidth={2}
        />
      </div>
    </MotionLink>
  )
})

const TeaserGrid = memo(function TeaserGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="grid grid-cols-2 gap-3"
    >
      {TEASERS.map((t, i) => (
        <TeaserCard key={t.name} {...t} index={i} />
      ))}
    </motion.div>
  )
})

const INSTALL_COMMAND = 'npm install @fossilui/react lucide-react'

const TOTAL_VARIANTS = TEASERS.reduce((sum, t) => sum + Number.parseInt(t.count, 10), 0)

const HIGHLIGHTS = [
  'Lightweight & tree-shakeable',
  'React + Tailwind CSS v4',
  'Respects reduced motion',
  'Zero animation dependencies',
]

function InstallCommand() {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex w-full max-w-md min-w-0 items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 py-1.5 pl-3 pr-1.5">
      <Terminal className="h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={2} />
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[12.5px] text-neutral-800 [scrollbar-width:none]">
        {INSTALL_COMMAND}
      </code>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? 'Copied to clipboard' : 'Copy install command'}
        className={cn(
          'inline-flex h-8 w-8 shrink-0 touch-manipulation items-center justify-center rounded-md border border-transparent text-neutral-500',
          'transition-colors hover:border-neutral-200 hover:bg-white hover:text-neutral-900',
          copied && 'text-indigo-600',
        )}
      >
        {copied ? <Check className="h-3.5 w-3.5" strokeWidth={2} /> : <Copy className="h-3.5 w-3.5" strokeWidth={2} />}
      </button>
    </div>
  )
}

export default function Components() {
  return (
    <Section className="pt-12 md:pt-20">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="min-w-0">
          <Tag tone="accent">Now on npm · v0.2</Tag>
          <h1 className="mt-4 text-3xl min-[380px]:text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-neutral-900 text-balance">
            A library of polished, animated components.
          </h1>
          <p className="mt-4 text-neutral-600 max-w-md leading-relaxed">
            {TOTAL_VARIANTS}+ variants across buttons, cards, modals, inputs, navbars and hero blocks.{' '}
            <span className="font-medium text-neutral-900">Lightweight by design</span> — pure CSS and native
            browser animations, so you only ship the components you import.
          </p>

          <div className="mt-6">
            <InstallCommand />
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12.5px] text-neutral-500">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-indigo-500" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button as={Link} to="/components/buttons" variant="primary" size="md">
              Explore components
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <Button
              as="a"
              href="https://www.npmjs.com/org/fossilui"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="md"
            >
              View on npm
            </Button>
          </div>
        </div>

        <TeaserGrid />
      </div>
    </Section>
  )
}
