import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { CopySnippetButton } from '../buttons/CopySnippetButton'
import { CodeEditor } from '../code/CodeEditor'
import { Section, SectionHeader } from '../ui/Section'
import { Tag } from '../ui/Tag'
import { cn } from '../../lib/cn'

const DOC_NAV = [
  { id: 'variants', label: 'All variants' },
  { id: 'import', label: 'How to import' },
  { id: 'when-to-use', label: 'When to use' },
  { id: 'examples', label: 'Configurator' },
  { id: 'api', label: 'API' },
  { id: 'faq', label: 'FAQ' },
]

const VARIANT_GRID_CLASSES = {
  compact: 'grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-3',
  wide: 'grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2',
  full: 'grid grid-cols-1 gap-4 sm:gap-5',
}

export function DocHeading({ id, title, description }) {
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

function DocTable({ minWidth, columns, rows, rowKey, renderCells }) {
  return (
    <div className="mt-6 min-w-0">
      <p className="mb-2 text-[12px] text-neutral-500 md:sr-only">Swipe horizontally to see all columns</p>
      <div
        className={cn(
          'overflow-x-auto rounded-xl border border-neutral-200',
          'overscroll-x-contain [-webkit-overflow-scrolling:touch]',
        )}
      >
        <table className={cn('w-full table-fixed border-collapse text-left', minWidth)}>
          <colgroup>
            {columns.map((column) => (
              <col key={column.label} className={column.width} />
            ))}
          </colgroup>
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/90">
              {columns.map((column) => (
                <th
                  key={column.label}
                  scope="col"
                  className={cn(PROPS_TABLE_CELL, 'font-semibold text-neutral-900')}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[rowKey]} className="border-b border-neutral-100 last:border-0">
                {renderCells(row)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PropsTable({ rows }) {
  return (
    <DocTable
      minWidth="min-w-[760px]"
      columns={[
        { label: 'Property', width: 'w-[22%]' },
        { label: 'Description', width: 'w-[38%]' },
        { label: 'Type', width: 'w-[28%]' },
        { label: 'Default', width: 'w-[12%]' },
      ]}
      rows={rows}
      rowKey="property"
      renderCells={(row) => (
        <>
          <td className={cn(PROPS_TABLE_CELL, 'font-mono text-[12px] font-medium text-indigo-700')}>
            {row.property}
          </td>
          <td className={cn(PROPS_TABLE_CELL, 'text-neutral-600')}>{row.description}</td>
          <td className={cn(PROPS_TABLE_CELL, 'font-mono text-[11px] text-neutral-500 break-words')}>
            {row.type}
          </td>
          <td className={cn(PROPS_TABLE_CELL, 'font-mono text-[12px] text-neutral-700')}>{row.default}</td>
        </>
      )}
    />
  )
}

function MotionCompatibilityTable({ rows }) {
  return (
    <DocTable
      minWidth="min-w-[860px]"
      columns={[
        { label: 'Motion', width: 'w-[16%]' },
        { label: 'Works best with', width: 'w-[28%]' },
        { label: 'Limited / constrained', width: 'w-[24%]' },
        { label: 'Notes', width: 'w-[32%]' },
      ]}
      rows={rows}
      rowKey="motion"
      renderCells={(row) => (
        <>
          <td className={cn(PROPS_TABLE_CELL, 'font-mono text-[12px] font-medium text-indigo-700')}>
            {row.motion}
          </td>
          <td className={cn(PROPS_TABLE_CELL, 'text-neutral-600')}>{row.bestWith}</td>
          <td className={cn(PROPS_TABLE_CELL, 'text-neutral-600')}>{row.limited}</td>
          <td className={cn(PROPS_TABLE_CELL, 'text-neutral-600')}>{row.notes}</td>
        </>
      )}
    />
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
          className={cn('h-4 w-4 shrink-0 text-neutral-500 transition-transform', open && 'rotate-180')}
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

function MobileToc({ id }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative mb-6 flex justify-start xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className={cn(
          'inline-flex min-h-9 items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700',
          'transition-colors hover:border-neutral-300 hover:text-neutral-900 active:bg-neutral-50',
        )}
      >
        On this page
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close table of contents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="fixed inset-0 z-20 bg-transparent"
              onClick={() => setOpen(false)}
            />
            <motion.div
              id={id}
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
                      onClick={() => setOpen(false)}
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
  )
}

function SideToc() {
  return (
    <aside className="hidden xl:sticky xl:top-24 xl:block">
      <nav
        aria-label="On this page"
        className={cn('card p-3 sm:p-4', 'xl:max-h-[calc(100vh-7rem)] xl:overflow-auto')}
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
  )
}

/**
 * Shared layout for every component family page (buttons, cards, modals, ...).
 * Pages only supply data; section order, spacing and tile styling live here.
 *
 * @param {object} props
 * @param {string} props.slug Used for element ids, e.g. "modals".
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} props.description
 * @param {object} props.variants
 * @param {string} props.variants.description
 * @param {import('react').ReactNode} props.variants.tag
 * @param {Array<{ id: string, name: string, description: string, snippet: string }>} props.variants.items
 * @param {(item: object) => import('react').ReactNode} props.variants.renderPreview
 * @param {'compact' | 'wide' | 'full'} [props.variants.layout]
 * @param {string} [props.variants.tileClassName] Min height for each tile.
 * @param {string} [props.variants.stageClassName] Min height / padding for the dashed preview stage.
 * @param {object} props.importGuide
 * @param {string} props.importGuide.description
 * @param {Array<{ label: string, code: string }>} props.importGuide.snippets
 * @param {string} props.importGuide.importCode
 * @param {{ description: string, items: Array<{ title: string, body: string }> }} props.whenToUse
 * @param {import('react').ReactNode} props.configurator
 * @param {{ description: string, props: object[], compatibility: object[], compatibilityDescription: string }} props.api
 * @param {{ description: string, items: Array<{ q: string, a: string }> }} props.faq
 */
export function ComponentDocPage({
  slug,
  eyebrow,
  title,
  description,
  variants,
  importGuide,
  whenToUse,
  configurator,
  api,
  faq,
}) {
  const reduceMotion = useReducedMotion()

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
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <MobileToc id={`${slug}-mobile-toc`} />

        <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_220px] xl:items-start">
          <main className="min-w-0">
            <section className="mb-12 sm:mb-16 md:mb-20">
              <DocHeading id="variants" title="All variants" description={variants.description} />
              <Tag tone="accent" className="mt-4 mb-6 max-w-xl text-balance sm:mb-8">
                {variants.tag}
                <span className="hidden font-normal normal-case tracking-normal text-indigo-600/80 sm:inline">
                  {' '}
                  · use Copy component on each card
                </span>
              </Tag>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className={VARIANT_GRID_CLASSES[variants.layout ?? 'compact']}
              >
                {variants.items.map((item, i) => (
                  <motion.article
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduceMotion ? { duration: 0 } : { delay: Math.min(i * 0.04, 0.4), duration: 0.4 }
                    }
                    className={cn(
                      'card flex min-w-0 flex-col gap-4 overflow-visible p-4 sm:gap-6 sm:p-5 md:p-6',
                      variants.tileClassName ?? 'sm:min-h-[200px]',
                    )}
                  >
                    <div
                      className={cn(
                        'relative isolate flex w-full min-w-0 shrink-0 items-center justify-center',
                        'overflow-x-auto overflow-y-visible rounded-lg border border-dashed border-neutral-200/90',
                        'bg-neutral-50/80 [-webkit-overflow-scrolling:touch]',
                        variants.stageClassName ?? 'min-h-[6.5rem] px-3 py-8 sm:min-h-[7.5rem] sm:px-4 sm:py-10',
                      )}
                    >
                      {variants.renderPreview(item)}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-3 text-center">
                      <div className="space-y-1">
                        <h3 className="text-[15px] font-medium text-neutral-900">{item.name}</h3>
                        <p className="text-[12px] leading-relaxed text-neutral-500 sm:text-[13px]">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <CopySnippetButton code={item.snippet} />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </section>

            <section className="mb-12 sm:mb-16 md:mb-20">
              <DocHeading id="import" title="How to import" description={importGuide.description} />
              <div className="mt-6 grid min-w-0 gap-4 md:grid-cols-2">
                {importGuide.snippets.map((snippet) => (
                  <ReadOnlySnippet key={snippet.label} label={snippet.label} code={snippet.code} />
                ))}
              </div>
              <div className="mt-4 min-w-0">
                <ReadOnlySnippet label="Import" code={importGuide.importCode} />
              </div>
            </section>

            <section className="mb-12 sm:mb-16 md:mb-20">
              <DocHeading id="when-to-use" title="When to use" description={whenToUse.description} />
              <ul className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4">
                {whenToUse.items.map((item) => (
                  <li key={item.title} className="card min-w-0 p-4 sm:p-5">
                    <h3 className="text-[15px] font-medium text-neutral-900">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{item.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-12 sm:mb-16 md:mb-20">
              <DocHeading
                id="examples"
                title="Configurator"
                description="Controls and code editor stay in sync: update either one and preview updates instantly."
              />
              <div className="mt-6">{configurator}</div>
            </section>

            <section className="mb-12 sm:mb-16 md:mb-20">
              <DocHeading id="api" title="API" description={api.description} />
              <PropsTable rows={api.props} />
              <div className="mt-8">
                <h3 className="text-[15px] font-medium text-neutral-900 sm:text-base">Motion compatibility</h3>
                <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-neutral-600">
                  {api.compatibilityDescription}
                </p>
                <MotionCompatibilityTable rows={api.compatibility} />
              </div>
            </section>

            <section className="min-w-0 pb-4">
              <DocHeading id="faq" title="FAQ" description={faq.description} />
              <div className="card mt-6 px-4 sm:px-6">
                {faq.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </section>
          </main>

          <SideToc />
        </div>
      </div>
    </Section>
  )
}
