import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { CopySnippetButton } from '../buttons/CopySnippetButton'
import { CodeEditor } from '../code/CodeEditor'
import { Section, SectionHeader } from '../ui/Section'
import { Tag } from '../ui/Tag'
import { Select } from '../ui/Select'
import { cn } from '../../lib/cn'

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

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full min-h-12 items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-medium text-neutral-900">{q}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-neutral-500 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[14px] leading-relaxed text-neutral-600">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function FamilyDocPage({
  eyebrow,
  title,
  description,
  importSnippet,
  installSnippet,
  variants,
  components,
  renderPreview,
  motionProp = 'motion',
  motionOptions,
  defaultMotion,
  buildMotionSnippet,
  props: propRows = [],
  faqs = [],
  whenToUse = [],
  variantsGridClassName,
  variantCardClassName,
  previewCellClassName,
  playgroundPreviewClassName,
}) {
  const reduceMotion = useReducedMotion()
  const [playgroundMotion, setPlaygroundMotion] = useState(defaultMotion ?? motionOptions?.[0]?.value ?? variants[0]?.id)

  const playgroundSnippet = buildMotionSnippet
    ? buildMotionSnippet(playgroundMotion)
    : variants.find((v) => v.id === playgroundMotion)?.snippet ?? variants[0]?.snippet

  return (
    <Section className="overflow-x-clip pt-10 pb-16 sm:pt-12 md:pt-20 md:pb-24">
      <div className="min-w-0">
        <Link
          to="/components"
          className="inline-flex min-h-9 items-center gap-1.5 text-[13px] font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          Components
        </Link>

        <SectionHeader className="mt-4 mb-6 sm:mt-6 sm:mb-8 md:mb-10" eyebrow={eyebrow} title={title} description={description} />

        <section className="mb-12 sm:mb-16">
          <DocHeading id="variants" title="All variants" description="Preview each style and copy the snippet." />
          <Tag tone="accent" className="mt-4 mb-6">Live from @fossilui/react</Tag>
          <div className={cn('grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-3', variantsGridClassName)}>
            {variants.map((item, i) => {
              const Comp = components[item.component]
              return (
                <motion.article
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { delay: Math.min(i * 0.04, 0.24), duration: 0.35 }}
                  className={cn('card flex min-h-[200px] flex-col overflow-hidden', variantCardClassName)}
                >
                  <div className="border-b border-neutral-200/80 px-4 py-3">
                    <h3 className="text-[14px] font-medium text-neutral-900">{item.name}</h3>
                    {item.description ? (
                      <p className="mt-1 text-[12px] leading-relaxed text-neutral-600">{item.description}</p>
                    ) : null}
                  </div>
                  <div
                    className={cn(
                      'flex flex-1 p-4',
                      previewCellClassName ?? 'items-center justify-center',
                    )}
                  >
                    {renderPreview ? renderPreview(item, Comp) : Comp ? <Comp {...(item.previewProps ?? {})} /> : null}
                  </div>
                  <div className="relative border-t border-neutral-200/80 p-3">
                    <CopySnippetButton snippet={item.snippet} className="absolute right-3 top-3 z-10" />
                    <CodeEditor value={item.snippet} readOnly minHeight="88px" />
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <DocHeading id="import" title="How to import" />
          <div className="relative mt-6 card overflow-hidden p-4 sm:p-5">
            <CopySnippetButton snippet={importSnippet} className="absolute right-5 top-5 z-10" />
            <CodeEditor value={importSnippet} readOnly minHeight="120px" />
          </div>
          {installSnippet ? (
            <div className="mt-4 card overflow-hidden p-4 sm:p-5">
              <CodeEditor value={installSnippet} readOnly minHeight="100px" />
            </div>
          ) : null}
        </section>

        {whenToUse.length ? (
          <section className="mb-12 sm:mb-16">
            <DocHeading id="when-to-use" title="When to use" />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {whenToUse.map((item) => (
                <div key={item.title} className="card p-4 sm:p-5">
                  <h3 className="text-[14px] font-medium text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{item.body}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {motionOptions?.length ? (
          <section className="mb-12 sm:mb-16">
            <DocHeading id="playground" title="Try a motion" description="Pick a variant and copy the snippet." />
            <div className="mt-6 card overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <div className="border-b border-neutral-200/80 p-5 lg:border-r lg:border-b-0">
                  <label className="block space-y-1.5">
                    <span className="text-[12px] font-medium text-neutral-600">{motionProp}</span>
                    <Select value={playgroundMotion} onChange={(e) => setPlaygroundMotion(e.target.value)}>
                      {motionOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Select>
                  </label>
                  <div
                    className={cn(
                      'mt-5 flex min-h-[100px] rounded-lg border border-dashed border-neutral-200 bg-neutral-50/60 p-4',
                      playgroundPreviewClassName ?? 'items-center justify-center',
                    )}
                  >
                    {renderPreview
                      ? renderPreview({ id: playgroundMotion, component: variants.find((v) => v.id === playgroundMotion)?.component }, components[variants.find((v) => v.id === playgroundMotion)?.component])
                      : null}
                  </div>
                </div>
                <div className="relative p-4 sm:p-5">
                  <CopySnippetButton snippet={playgroundSnippet} className="absolute right-5 top-5 z-10" />
                  <CodeEditor value={playgroundSnippet} readOnly minHeight="160px" />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {propRows.length ? (
          <section className="mb-12 sm:mb-16">
            <DocHeading id="api" title="API" />
            <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/90">
                    <th className="px-4 py-3 font-semibold">Property</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Default</th>
                  </tr>
                </thead>
                <tbody>
                  {propRows.map((row) => (
                    <tr key={row.property} className="border-b border-neutral-100 last:border-0">
                      <td className="px-4 py-3 font-mono text-[12px] text-indigo-700">{row.property}</td>
                      <td className="px-4 py-3 text-neutral-600">{row.description}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-neutral-500">{row.type}</td>
                      <td className="px-4 py-3 font-mono text-[12px]">{row.default}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {faqs.length ? (
          <section>
            <DocHeading id="faq" title="FAQ" />
            <div className="mt-6 card divide-y divide-neutral-200 px-4 sm:px-5">
              {faqs.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </Section>
  )
}
