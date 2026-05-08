import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { Section, SectionHeader } from '../components/ui/Section'
import { TemplateCard } from '../components/TemplateCard'
import { TEMPLATES, CATEGORIES } from '../data/templates'
import { cn } from '../lib/cn'

export default function Templates() {
  const [params, setParams] = useSearchParams()
  const initialCategory = params.get('category') || 'All'
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TEMPLATES.filter((t) => {
      const matchCat = category === 'All' || t.category === category
      const matchQ =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      return matchCat && matchQ
    })
  }, [category, query])

  const onCategory = (c) => {
    setCategory(c)
    if (c === 'All') {
      params.delete('category')
    } else {
      params.set('category', c)
    }
    setParams(params, { replace: true })
  }

  return (
    <Section className="pt-12 md:pt-20">
      <SectionHeader
        eyebrow="Templates"
        title="A small library, built with care."
        description={
          <>
            Open a live preview, browse the source with CodeMirror, or jump straight to the
            GitHub repository. Every premium template is{' '}
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-semibold text-emerald-700">
              FREE to use
            </span>
            .
          </>
        }
      />

      {/* Toolbar */}
      <div className="card flex flex-col md:flex-row md:items-center gap-3 p-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates, tags, categories…"
            className="h-10 w-full rounded-md bg-white border border-neutral-200 pl-9 pr-9 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => onCategory(c)}
              className={cn(
                'h-8 px-3 rounded-full text-[12.5px] border transition-all',
                category === c
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between text-[12px] text-neutral-500">
        <span>
          Showing <span className="text-neutral-900 font-medium">{filtered.length}</span> of {TEMPLATES.length} templates
        </span>
        <span>MIT licensed · Free Premium templates</span>
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card p-12 text-center"
          >
            <p className="text-neutral-700">No templates match your filters.</p>
            <button
              onClick={() => {
                setQuery('')
                onCategory('All')
              }}
              className="mt-3 text-[13px] text-indigo-600 hover:text-indigo-700"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            layout
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((t, i) => (
              <TemplateCard key={t.slug} template={t} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
