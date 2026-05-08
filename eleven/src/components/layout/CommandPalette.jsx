import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  Search,
  FileText,
  Image as ImageIcon,
  Users as UsersIcon,
  LayoutDashboard,
  Settings,
  Plus,
  CornerDownLeft,
} from 'lucide-react'
import { useContentStore } from '@/store/content'
import Kbd from '@/components/ui/Kbd'
import { cn } from '@/lib/utils'

const navActions = [
  { id: 'nav-dashboard', kind: 'nav', label: 'Go to Dashboard', icon: LayoutDashboard, to: '/' },
  { id: 'nav-content', kind: 'nav', label: 'Go to Content', icon: FileText, to: '/content' },
  { id: 'nav-media', kind: 'nav', label: 'Go to Media', icon: ImageIcon, to: '/media' },
  { id: 'nav-users', kind: 'nav', label: 'Go to Users', icon: UsersIcon, to: '/users' },
  { id: 'nav-settings', kind: 'nav', label: 'Go to Settings', icon: Settings, to: '/settings' },
  { id: 'action-new-post', kind: 'action', label: 'Create new post', icon: Plus, to: '/content/new' },
]

export default function CommandPalette({ open, onOpenChange }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const posts = useContentStore((s) => s.posts)

  useEffect(() => {
    if (!open) setQuery('')
    setActiveIdx(0)
  }, [open])

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    const postItems = posts
      .map((p) => ({
        id: `post-${p.id}`,
        kind: 'post',
        label: p.title,
        meta: p.status,
        icon: FileText,
        to: `/content/${p.id}`,
      }))
      .filter((item) => !q || item.label.toLowerCase().includes(q))
      .slice(0, 6)

    const navs = navActions.filter((a) => !q || a.label.toLowerCase().includes(q))

    return q
      ? [
          ...(navs.length ? [{ kind: 'header', label: 'Navigate' }, ...navs] : []),
          ...(postItems.length ? [{ kind: 'header', label: 'Posts' }, ...postItems] : []),
        ]
      : [
          { kind: 'header', label: 'Quick actions' },
          ...navActions,
          { kind: 'header', label: 'Recent posts' },
          ...posts.slice(0, 5).map((p) => ({
            id: `post-${p.id}`,
            kind: 'post',
            label: p.title,
            meta: p.status,
            icon: FileText,
            to: `/content/${p.id}`,
          })),
        ]
  }, [query, posts])

  const flat = items.filter((i) => i.kind !== 'header')

  useEffect(() => {
    if (activeIdx > flat.length - 1) setActiveIdx(0)
  }, [flat.length, activeIdx])

  function handleSelect(item) {
    if (!item || item.kind === 'header') return
    onOpenChange(false)
    if (item.to) navigate(item.to)
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(flat.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      handleSelect(flat[activeIdx])
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-fade-in" />
        <DialogPrimitive.Content
          onKeyDown={onKeyDown}
          className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border border-border bg-popover text-popover-foreground shadow-pop dark:shadow-pop-dark data-[state=open]:animate-fade-up"
        >
          <DialogPrimitive.Title className="sr-only">Command palette</DialogPrimitive.Title>
          <div className="flex items-center gap-2 border-b border-border px-3.5">
            <Search className="size-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search content, navigate, run commands…"
              className="h-12 flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
            />
            <Kbd>esc</Kbd>
          </div>
          <div className="max-h-[360px] overflow-y-auto p-1.5">
            {items.length === 0 ? (
              <div className="px-3 py-8 text-center text-[13px] text-muted-foreground">
                No results for "{query}"
              </div>
            ) : (
              (() => {
                let idx = -1
                return items.map((item, i) => {
                  if (item.kind === 'header') {
                    return (
                      <p
                        key={`h-${i}`}
                        className="px-2.5 pt-3 pb-1 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground"
                      >
                        {item.label}
                      </p>
                    )
                  }
                  idx += 1
                  const isActive = idx === activeIdx
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] transition-colors',
                        isActive ? 'bg-muted text-foreground' : 'text-foreground/90',
                      )}
                    >
                      <Icon className="size-4 text-muted-foreground" />
                      <span className="truncate flex-1">{item.label}</span>
                      {item.meta && (
                        <span className="text-[11px] text-muted-foreground">{item.meta}</span>
                      )}
                      {isActive && <CornerDownLeft className="size-3.5 text-muted-foreground" />}
                    </button>
                  )
                })
              })()
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
