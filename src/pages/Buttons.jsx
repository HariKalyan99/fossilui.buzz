import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ChevronDown, Mail } from 'lucide-react'
import {
  Button,
  RollTextButton,
  StaggerTextButton,
  SlideFillButton,
  ShineSweepButton,
  BorderRevealButton,
  IconSlideButton,
  UnderlineGrowButton,
  LiftShadowButton,
  LetterSpacingButton,
  SkewFillButton,
} from '@fossilui/react'
import { ButtonConfigurator } from '../components/buttons/ButtonConfigurator'
import { CopySnippetButton } from '../components/buttons/CopySnippetButton'
import { CodeEditor } from '../components/code/CodeEditor'
import { Section, SectionHeader } from '../components/ui/Section'
import { Tag } from '../components/ui/Tag'
import {
  BUTTON_MOTION_COMPATIBILITY,
  BUTTON_FAQS,
  BUTTON_IMPORT_SNIPPET,
  BUTTON_INSTALL_SNIPPET,
  BUTTON_PROPS,
  BUTTON_VITE_SNIPPET,
  BUTTON_TAILWIND_BUTTONS_SNIPPET,
  BUTTON_TAILWIND_REACT_SNIPPET,
  BUTTON_TAILWIND_SNIPPET,
  BUTTON_VARIANTS,
  WHEN_TO_USE,
} from '../data/buttonDocs'
import { cn } from '../lib/cn'

const BUTTON_COMPONENTS = {
  Button,
  RollTextButton,
  StaggerTextButton,
  SlideFillButton,
  ShineSweepButton,
  BorderRevealButton,
  IconSlideButton,
  UnderlineGrowButton,
  LiftShadowButton,
  LetterSpacingButton,
  SkewFillButton,
}

/** Live preview props that differ from copy snippets (icon is React node). */
const VARIANT_PREVIEW_PROPS = {
  'outlined-icon': {
    color: 'primary',
    variant: 'outlined',
    icon: <Mail className="h-4 w-4 shrink-0" strokeWidth={2} />,
    iconPlacement: 'end',
  },
}

const DOC_NAV = [
  { id: 'variants', label: 'All variants' },
  { id: 'import', label: 'How to import' },
  { id: 'when-to-use', label: 'When to use' },
  { id: 'examples', label: 'Configurator' },
  { id: 'api', label: 'API' },
  { id: 'faq', label: 'FAQ' },
]

function DocHeading({ id, title, description }) {
  return (
    <header id={id} className="scroll-mt-20 sm:scroll-mt-24">
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900 md:text-2xl">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-neutral-600">{description}</p>
      ) : null}
    </header>
  )
}

const PROPS_TABLE_CELL =
  'px-4 py-3.5 text-left align-top text-[13px] leading-snug first:pl-5 last:pr-5'

function PropsTable({ rows }) {
  return (
    <div className="mt-6 min-w-0">
      <p className="mb-2 text-[12px] text-neutral-500 md:sr-only">Swipe horizontally to see all columns</p>
      <div
        className={cn(
          'overflow-x-auto rounded-xl border border-neutral-200',
          'overscroll-x-contain [-webkit-overflow-scrolling:touch]',
        )}
      >
        <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[38%]" />
            <col className="w-[28%]" />
            <col className="w-[12%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/90">
              <th
                scope="col"
                className={cn(PROPS_TABLE_CELL, 'font-semibold text-neutral-900')}
              >
                Property
              </th>
              <th
                scope="col"
                className={cn(PROPS_TABLE_CELL, 'font-semibold text-neutral-900')}
              >
                Description
              </th>
              <th
                scope="col"
                className={cn(PROPS_TABLE_CELL, 'font-semibold text-neutral-900')}
              >
                Type
              </th>
              <th
                scope="col"
                className={cn(PROPS_TABLE_CELL, 'font-semibold text-neutral-900')}
              >
                Default
              </th>
            </tr>
          </thead>
          
          <tbody>
            {rows.map((row) => (
              <tr key={row.property} className="border-b border-neutral-100 last:border-0">
                <td className={cn(PROPS_TABLE_CELL, 'font-mono text-[12px] font-medium text-indigo-700')}>
                  {row.property}
                </td>
                <td className={cn(PROPS_TABLE_CELL, 'text-neutral-600')}>{row.description}</td>
                <td className={cn(PROPS_TABLE_CELL, 'font-mono text-[11px] text-neutral-500 break-words')}>
                  {row.type}
                </td>
                <td className={cn(PROPS_TABLE_CELL, 'font-mono text-[12px] text-neutral-700')}>
                  {row.default}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MotionCompatibilityTable({ rows }) {
  return (
    <div className="mt-6 min-w-0">
      <p className="mb-2 text-[12px] text-neutral-500 md:sr-only">Swipe horizontally to see all columns</p>
      <div
        className={cn(
          'overflow-x-auto rounded-xl border border-neutral-200',
          'overscroll-x-contain [-webkit-overflow-scrolling:touch]',
        )}
      >
        <table className="w-full min-w-[860px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[16%]" />
            <col className="w-[28%]" />
            <col className="w-[24%]" />
            <col className="w-[32%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/90">
              <th scope="col" className={cn(PROPS_TABLE_CELL, 'font-semibold text-neutral-900')}>
                Motion
              </th>
              <th scope="col" className={cn(PROPS_TABLE_CELL, 'font-semibold text-neutral-900')}>
                Works best with
              </th>
              <th scope="col" className={cn(PROPS_TABLE_CELL, 'font-semibold text-neutral-900')}>
                Limited / constrained
              </th>
              <th scope="col" className={cn(PROPS_TABLE_CELL, 'font-semibold text-neutral-900')}>
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.motion} className="border-b border-neutral-100 last:border-0">
                <td className={cn(PROPS_TABLE_CELL, 'font-mono text-[12px] font-medium text-indigo-700')}>
                  {row.motion}
                </td>
                <td className={cn(PROPS_TABLE_CELL, 'text-neutral-600')}>{row.bestWith}</td>
                <td className={cn(PROPS_TABLE_CELL, 'text-neutral-600')}>{row.limited}</td>
                <td className={cn(PROPS_TABLE_CELL, 'text-neutral-600')}>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full min-h-12 touch-manipulation items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-medium text-neutral-900">{q}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-neutral-500 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[14px] leading-relaxed text-neutral-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ReadOnlySnippet({ label, code }) {
  return (
    <div className="min-w-0 space-y-2">
      {label ? (
        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-neutral-500">{label}</p>
      ) : null}
      <CodeEditor value={code} readOnly minHeight="72px" />
    </div>
  )
}

export default function Buttons() {
  const reduceMotion = useReducedMotion()
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const mobileTocRef = useRef(null)

  useEffect(() => {
    if (!mobileTocOpen) return

    const handlePointerDown = (event) => {
      if (!mobileTocRef.current?.contains(event.target)) {
        setMobileTocOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [mobileTocOpen])

  return (
    <Section className="overflow-x-clip pt-10 pb-16 sm:pt-12 md:pt-20 md:pb-24">
      <div className="min-w-0">
        <Link
          to="/components"
          className="inline-flex min-h-9 touch-manipulation items-center gap-1.5 text-[13px] font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          Components
        </Link>

        <SectionHeader
          className="mt-4 mb-6 sm:mt-6 sm:mb-8 md:mb-10"
          eyebrow="Buttons"
          title="Animated button variants"
          description="Preview every variant, then install from @fossilui/react or @fossilui/buttons, configure props, and copy examples into your app."
        />

        <div ref={mobileTocRef} className="relative mb-6 flex justify-start xl:hidden">
          <button
            type="button"
            onClick={() => setMobileTocOpen((v) => !v)}
            aria-expanded={mobileTocOpen}
            aria-controls="buttons-mobile-toc"
            className={cn(
              'inline-flex min-h-9 items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700',
              'transition-colors hover:border-neutral-300 hover:text-neutral-900 active:bg-neutral-50',
            )}
          >
            On this page
            <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', mobileTocOpen && 'rotate-180')} />
          </button>

          <AnimatePresence>
            {mobileTocOpen ? (
              <>
                <motion.button
                  type="button"
                  aria-label="Close table of contents"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="fixed inset-0 z-20 bg-transparent"
                  onClick={() => setMobileTocOpen(false)}
                />
                <motion.div
                  id="buttons-mobile-toc"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="absolute left-0 top-full z-30 mt-2 w-[min(18rem,88vw)] rounded-xl border border-neutral-200 bg-white p-2 shadow-lg"
                >
                  <ul className="space-y-1">
                    {DOC_NAV.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={() => setMobileTocOpen(false)}
                          className={cn(
                            'block rounded-md px-3 py-2 text-[12px] font-medium text-neutral-700',
                            'transition-colors hover:bg-neutral-50 hover:text-neutral-900',
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_220px] xl:items-start">
          <main className="min-w-0">
            {/* Variants */}
            <section className="mb-12 sm:mb-16 md:mb-20">
          <DocHeading
            id="variants"
            title="All variants"
            description="Hover to preview each animation, then copy the standard Button motion snippet from any card."
          />
          <Tag tone="accent" className="mt-4 mb-6 max-w-xl text-balance sm:mb-8">
            Live from @fossilui/react and @fossilui/buttons
            <span className="hidden font-normal normal-case tracking-normal text-indigo-600/80 sm:inline">
              {' '}
              · use Copy component on each card
            </span>
          </Tag>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          >
            {BUTTON_VARIANTS.map((item, i) => {
              const Btn = BUTTON_COMPONENTS[item.component]
              const previewProps = VARIANT_PREVIEW_PROPS[item.id]
              return (
                <motion.article
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { delay: Math.min(i * 0.04, 0.4), duration: 0.4 }
                  }
                  className="card flex min-w-0 flex-col justify-between gap-4 overflow-visible p-4 sm:min-h-[200px] sm:gap-6 sm:p-5 md:p-6"
                >
                  <div
                    className={cn(
                      'flex min-h-[6.5rem] w-full min-w-0 flex-1 items-center justify-center',
                      'overflow-x-auto overflow-y-visible rounded-lg border border-dashed border-neutral-200/90',
                      'bg-neutral-50/80 px-3 py-8 sm:min-h-[7.5rem] sm:px-4 sm:py-10',
                      '[-webkit-overflow-scrolling:touch]',
                    )}
                  >
                    <Btn className="max-w-full shrink-0" {...previewProps}>
                      {item.label}
                    </Btn>
                  </div>
                  <div className="flex min-w-0 flex-col gap-3">
                    <div className="space-y-1">
                      <h3 className="text-[15px] font-medium text-neutral-900">{item.name}</h3>
                      <p className="text-[12px] leading-relaxed text-neutral-500 sm:text-[13px]">
                        {item.description}
                      </p>
                    </div>
                    <CopySnippetButton code={item.snippet} />
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
            </section>

            {/* Import */}
            <section className="mb-12 sm:mb-16 md:mb-20">
          <DocHeading
            id="import"
            title="How to import"
            description="Install the package you need, add the matching Tailwind @source snippet (see FAQ), then import buttons or the example template."
          />
          <div className="mt-6 grid min-w-0 gap-4 md:grid-cols-2">
            <ReadOnlySnippet label="Install" code={BUTTON_INSTALL_SNIPPET} />
            <ReadOnlySnippet label="Vite" code={BUTTON_VITE_SNIPPET} />
            <ReadOnlySnippet label="Tailwind — base" code={BUTTON_TAILWIND_SNIPPET} />
            <ReadOnlySnippet
              label="Tailwind — @fossilui/react"
              code={BUTTON_TAILWIND_REACT_SNIPPET}
            />
            <ReadOnlySnippet
              label="Tailwind — @fossilui/buttons"
              code={BUTTON_TAILWIND_BUTTONS_SNIPPET}
            />
          </div>
          <div className="mt-4 min-w-0">
            <ReadOnlySnippet label="Import" code={BUTTON_IMPORT_SNIPPET} />
          </div>
            </section>

            {/* When to use */}
            <section className="mb-12 sm:mb-16 md:mb-20">
          <DocHeading
            id="when-to-use"
            title="When to use"
            description="Pick an animation that matches intent — motion should clarify the action, not decorate every control."
          />
          <ul className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4">
            {WHEN_TO_USE.map((item) => (
              <li key={item.title} className="card min-w-0 p-4 sm:p-5">
                <h3 className="text-[15px] font-medium text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
            </section>

            {/* Examples */}
            <section className="mb-12 sm:mb-16 md:mb-20">
          <DocHeading
            id="examples"
            title="Configurator"
            description="Controls and code editor stay in sync: update either one and preview updates instantly."
          />
          <div className="mt-6">
            <ButtonConfigurator />
          </div>
            </section>

            {/* API */}
            <section className="mb-12 sm:mb-16 md:mb-20">
          <DocHeading
            id="api"
            title="API"
            description="All animated buttons share the same props. Native button and anchor attributes are also supported."
          />
          <PropsTable rows={BUTTON_PROPS} />
          <div className="mt-8">
            <h3 className="text-[15px] font-medium text-neutral-900 sm:text-base">Motion compatibility</h3>
            <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-neutral-600">
              Use this matrix to pick combinations that look best. Some motions intentionally constrain
              certain attributes for cleaner visuals.
            </p>
            <MotionCompatibilityTable rows={BUTTON_MOTION_COMPATIBILITY} />
          </div>
            </section>

            {/* FAQ */}
            <section className="min-w-0 pb-4">
          <DocHeading
            id="faq"
            title="FAQ"
            description="Common questions about installing, styling, and using @fossilui/react or @fossilui/buttons."
          />
          <div className="card mt-6 px-4 sm:px-6">
            {BUTTON_FAQS.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
            </section>
          </main>

          <aside className="hidden xl:sticky xl:top-24 xl:block">
            <nav
              aria-label="On this page"
              className={cn(
                'card p-3 sm:p-4',
                'xl:max-h-[calc(100vh-7rem)] xl:overflow-auto',
              )}
            >
              <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                On this page
              </p>
              <ul className="flex gap-2 overflow-x-auto pb-1 xl:flex-col xl:overflow-visible">
                {DOC_NAV.map((item) => (
                  <li key={item.id} className="shrink-0 xl:shrink">
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        'block rounded-md border border-neutral-200 bg-white px-3 py-2 text-[12px] font-medium text-neutral-600',
                        'transition-colors hover:border-neutral-300 hover:text-neutral-900 active:bg-neutral-50',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </Section>
  )
}
