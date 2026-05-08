import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  LayoutGrid,
  Rows3,
  X,
  Trash2,
  CheckCircle2,
  FileText,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'
import PostCard from '@/components/content/PostCard'
import PostsTable from '@/components/content/PostsTable'
import { useContentStore } from '@/store/content'
import { cn } from '@/lib/utils'

const STATUS_OPTIONS = ['All', 'Published', 'Draft', 'Scheduled']
const CATEGORY_OPTIONS = ['All', 'Design', 'Engineering', 'Product', 'Writing', 'Team', 'Process']

export default function Content() {
  const posts = useContentStore((s) => s.posts)
  const setPostStatus = useContentStore((s) => s.setPostStatus)
  const deletePosts = useContentStore((s) => s.deletePosts)

  const [view, setView] = useState('table')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState({ field: 'updatedAt', dir: 'desc' })
  const [selected, setSelected] = useState([])

  const filtered = useMemo(() => {
    let out = posts
    if (status !== 'All') out = out.filter((p) => p.status === status)
    if (category !== 'All') out = out.filter((p) => p.category === category)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      out = out.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt || '').toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q)),
      )
    }
    out = [...out].sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1
      const av = a[sort.field]
      const bv = b[sort.field]
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
      if (typeof av === 'string' && typeof bv === 'string') return av.localeCompare(bv) * dir
      return 0
    })
    return out
  }, [posts, status, category, query, sort])

  function onSort(field) {
    setSort((prev) =>
      prev.field === field
        ? { field, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { field, dir: 'desc' },
    )
  }

  function toggle(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function toggleAll(checked) {
    setSelected(checked ? filtered.map((p) => p.id) : [])
  }

  function clearFilters() {
    setQuery('')
    setStatus('All')
    setCategory('All')
  }

  const hasFilters = query !== '' || status !== 'All' || category !== 'All'

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Content</h2>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            {posts.length} posts · {posts.filter((p) => p.status === 'Draft').length} drafts
          </p>
        </div>
        <Button asChild>
          <Link to="/content/new"><Plus /> New post</Link>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex-1 max-w-sm">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, tags, excerpts…"
            leadingIcon={Search}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X /> Clear
            </Button>
          )}
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-md border border-border bg-muted/40 p-0.5">
          <button
            onClick={() => setView('table')}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded transition-colors',
              view === 'table'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground',
            )}
            aria-label="Table view"
            aria-pressed={view === 'table'}
          >
            <Rows3 className="size-3.5" />
          </button>
          <button
            onClick={() => setView('grid')}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded transition-colors',
              view === 'grid'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground',
            )}
            aria-label="Grid view"
            aria-pressed={view === 'grid'}
          >
            <LayoutGrid className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Bulk actions bar */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2"
          >
            <span className="text-[13px] font-medium tabular-nums">{selected.length} selected</span>
            <span className="text-muted-foreground/40">·</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setPostStatus(selected, 'Published')
                setSelected([])
              }}
            >
              <CheckCircle2 /> Publish
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setPostStatus(selected, 'Draft')
                setSelected([])
              }}
            >
              Move to draft
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                deletePosts(selected)
                setSelected([])
              }}
            >
              <Trash2 /> Delete
            </Button>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setSelected([])}>
              <X /> Clear
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={hasFilters ? 'No posts match your filters' : 'No posts yet'}
          description={
            hasFilters
              ? 'Try adjusting your search or clearing filters.'
              : 'Create your first post to get started.'
          }
          action={
            hasFilters ? (
              <Button variant="outline" size="sm" onClick={clearFilters}>Clear filters</Button>
            ) : (
              <Button asChild size="sm"><Link to="/content/new"><Plus /> New post</Link></Button>
            )
          }
        />
      ) : view === 'table' ? (
        <PostsTable
          posts={filtered}
          selected={selected}
          onToggle={toggle}
          onToggleAll={toggleAll}
          sort={sort}
          onSort={onSort}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      )}

      {/* Footer count */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
          <span>Showing <span className="text-foreground font-medium tabular-nums">{filtered.length}</span> of <span className="tabular-nums">{posts.length}</span></span>
        </div>
      )}
    </div>
  )
}
