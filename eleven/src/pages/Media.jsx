import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Upload,
  Search,
  Image as ImageIcon,
  FileVideo,
  FileText,
  Archive,
  Trash2,
  Download,
  MoreHorizontal,
  Copy,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { useContentStore } from '@/store/content'
import { cn, formatBytes } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

const KIND_ICONS = {
  image: ImageIcon,
  video: FileVideo,
  document: FileText,
  archive: Archive,
}

const FILTERS = ['All', 'Images', 'Videos', 'Documents']

function MediaTile({ item, selected, onToggle }) {
  const Icon = KIND_ICONS[item.kind] || FileText
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.18 }}
      className={cn(
        'group relative overflow-hidden rounded-xl border bg-card transition-all',
        selected ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-foreground/15',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="block w-full text-left"
      >
        <div className={cn(
          'aspect-square w-full bg-gradient-to-br',
          item.gradient,
          'relative flex items-center justify-center',
        )}>
          {item.kind !== 'image' && (
            <div className="flex flex-col items-center gap-2 text-white/95">
              <Icon className="size-8" strokeWidth={1.5} />
              <Badge tone="muted" size="sm" className="bg-white/15 text-white border-transparent uppercase">
                {item.name.split('.').pop()}
              </Badge>
            </div>
          )}
          {item.kind === 'image' && (
            <div className="absolute inset-0 bg-dot opacity-20" />
          )}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/55 via-black/15 to-transparent p-2.5">
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-white">{item.name}</p>
              <p className="text-[10.5px] text-white/70 tabular-nums">
                {formatBytes(item.size)} · {item.dimensions}
              </p>
            </div>
          </div>
        </div>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-md bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/50 group-hover:opacity-100"
            aria-label="Media actions"
          >
            <MoreHorizontal className="size-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem><Copy /> Copy URL</DropdownMenuItem>
          <DropdownMenuItem><Download /> Download</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <Trash2 className="!text-destructive" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}

export default function Media() {
  const media = useContentStore((s) => s.media)
  const addMedia = useContentStore((s) => s.addMedia)
  const fileRef = useRef(null)

  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([])
  const [dragOver, setDragOver] = useState(false)

  const filtered = useMemo(() => {
    let out = media
    if (filter !== 'All') {
      const map = { Images: 'image', Videos: 'video', Documents: 'document' }
      out = out.filter((m) => m.kind === map[filter])
    }
    if (query.trim()) {
      out = out.filter((m) => m.name.toLowerCase().includes(query.trim().toLowerCase()))
    }
    return out
  }, [media, filter, query])

  function toggleSelect(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function handleFiles(files) {
    Array.from(files).forEach((file) => {
      const kind = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document'
      const reader = new FileReader()
      reader.onload = () => {
        addMedia({
          id: 'm_' + Math.random().toString(36).slice(2, 8),
          name: file.name,
          kind,
          size: file.size,
          dimensions: kind === 'image' ? '—' : kind === 'video' ? '—' : '1 page',
          uploadedAt: new Date().toISOString(),
          gradient: 'from-indigo-500 via-violet-500 to-fuchsia-500',
          dataUrl: typeof reader.result === 'string' ? reader.result : null,
        })
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Media</h2>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            {media.length} files · {formatBytes(media.reduce((s, m) => s + m.size, 0))}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => fileRef.current?.click()}>
            <Upload /> Upload
          </Button>
          <input
            ref={fileRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex-1 max-w-sm">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files…"
            leadingIcon={Search}
          />
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-muted/40 p-0.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'h-7 rounded-md px-2.5 text-[12px] font-medium transition-colors',
                filter === f
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragEnter={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files)
        }}
        className={cn(
          'rounded-xl border border-dashed transition-colors',
          dragOver ? 'border-primary bg-primary-muted/30' : 'border-border',
          'px-4 py-3 flex items-center gap-3',
        )}
      >
        <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <Upload className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium">Drop files anywhere to upload</p>
          <p className="text-[11.5px] text-muted-foreground">
            Or click <button onClick={() => fileRef.current?.click()} className="text-primary underline-offset-2 hover:underline">browse</button> to select from your device.
          </p>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No files match"
          description="Try changing your filter or search."
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {filtered.map((m) => (
            <MediaTile
              key={m.id}
              item={m}
              selected={selected.includes(m.id)}
              onToggle={() => toggleSelect(m.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
