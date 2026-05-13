import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, GitBranch, Send, Check } from 'lucide-react'
import { Section, SectionHeader } from '../components/ui/Section'
import { TemplateCard } from '../components/TemplateCard'
import { TEMPLATES, CATEGORIES } from '../data/templates'
import { cn } from '../lib/cn'
import { Button } from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Input'

function looksLikeRepoUrl(value) {
  const v = value.trim().toLowerCase()
  if (!v) return false
  try {
    const u = new URL(v.startsWith('http') ? v : `https://${v}`)
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'github.com' || host === 'gitlab.com' || host === 'codeberg.org') return true
    if (host.endsWith('.github.io')) return false
    return host.includes('github') || host.includes('gitlab') || host.includes('gitea')
  } catch {
    return /^[\w.-]+\/[\w.-]+$/.test(v)
  }
}

export default function Templates() {
  const location = useLocation()
  const [params, setParams] = useSearchParams()
  const initialCategory = params.get('category') || 'All'
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState('')

  const [shareForm, setShareForm] = useState({ name: '', email: '', repo: '', note: '' })
  const [shareSending, setShareSending] = useState(false)
  const [shareError, setShareError] = useState('')
  const [shareSent, setShareSent] = useState(false)

  const patchShareForm = (patch) => {
    setShareSent(false)
    setShareForm((prev) => ({ ...prev, ...patch }))
  }

  useEffect(() => {
    if (location.pathname !== '/templates') return
    if (location.hash !== '#share-template') return

    const formEl = document.getElementById('share-template')
    const focusTarget = document.getElementById('share-name')
    if (!formEl || !focusTarget) return

    formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const timer = window.setTimeout(() => {
      focusTarget.focus({ preventScroll: true })
    }, 350)

    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

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

  const onShareSubmit = async (e) => {
    e.preventDefault()
    const repo = shareForm.repo.trim()
    if (!shareForm.email.includes('@') || !repo) return
    if (!looksLikeRepoUrl(repo)) {
      setShareError('Please enter a full repository URL (for example a GitHub or GitLab link).')
      return
    }
    setShareSending(true)
    setShareError('')
    try {
      const userLocation =
        typeof Intl !== 'undefined'
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : undefined
      const remarksParts = [
        'Template submission',
        `Repository: ${repo}`,
        shareForm.note.trim() ? `Note: ${shareForm.note.trim()}` : null,
      ].filter(Boolean)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: shareForm.name.trim(),
          email: shareForm.email.trim(),
          contact: '',
          info: 'template submission',
          remarks: remarksParts.join('\n'),
          userLocation,
        }),
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload?.error || 'Could not send your submission')
      }
      setShareSent(true)
      setShareForm({ name: '', email: '', repo: '', note: '' })
    } catch (err) {
      setShareError(
        err instanceof Error ? err.message : 'Something went wrong. Try again in a moment.',
      )
    } finally {
      setShareSending(false)
    }
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

      <motion.form
        id="share-template"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={onShareSubmit}
        className="card scroll-mt-28 p-5 md:p-6 mt-10 flex flex-col gap-4 border border-neutral-200/80"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-white">
              <GitBranch className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-neutral-900 tracking-tight">
                Share a template
              </h2>
              <p className="mt-1 text-[13px] text-neutral-600 leading-relaxed max-w-xl">
                Built something that fits FossilUI? Drop your public repo link — we review submissions and
                may feature them here.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <label htmlFor="share-name" className="text-[12px] text-neutral-600 mb-1 block font-medium">
              Name <span className="text-neutral-400 font-normal">(optional)</span>
            </label>
            <Input
              id="share-name"
              placeholder="Your name"
              value={shareForm.name}
              onChange={(e) => patchShareForm({ name: e.target.value })}
              autoComplete="name"
            />
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="share-email" className="text-[12px] text-neutral-600 mb-1 block font-medium">
              Email
            </label>
            <Input
              id="share-email"
              type="email"
              required
              placeholder="you@example.com"
              value={shareForm.email}
              onChange={(e) => patchShareForm({ email: e.target.value })}
              autoComplete="email"
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <label htmlFor="share-repo" className="text-[12px] text-neutral-600 mb-1 block font-medium">
              Repository URL
            </label>
            <Input
              id="share-repo"
              required
              placeholder="https://github.com/you/your-template"
              value={shareForm.repo}
              onChange={(e) => patchShareForm({ repo: e.target.value })}
              inputMode="url"
            />
          </div>
        </div>

        <div>
          <label htmlFor="share-note" className="text-[12px] text-neutral-600 mb-1 block font-medium">
            Short note <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <Textarea
            id="share-note"
            placeholder="Stack, license, or anything we should know…"
            value={shareForm.note}
            onChange={(e) => patchShareForm({ note: e.target.value })}
            className="min-h-[88px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Button type="submit" variant="secondary" size="md" disabled={shareSending}>
            {shareSent ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Submitted — check your inbox
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                {shareSending ? 'Sending…' : 'Submit template'}
              </>
            )}
          </Button>
          {shareError ? (
            <p className="text-[12px] text-rose-600">{shareError}</p>
          ) : (
            <p className="text-[11.5px] text-neutral-500">
              We save your details and send a confirmation email with next steps.
            </p>
          )}
        </div>
      </motion.form>
    </Section>
  )
}
