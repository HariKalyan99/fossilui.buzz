import { useState } from 'react'
import { ChevronRight, File, Folder, FolderOpen } from 'lucide-react'
import { cn } from '../../lib/cn'

function FileIcon({ name }) {
  const ext = name.split('.').pop()?.toLowerCase()
  const colors = {
    jsx: 'text-sky-300',
    js: 'text-yellow-300',
    ts: 'text-blue-300',
    tsx: 'text-blue-300',
    css: 'text-pink-300',
    json: 'text-amber-300',
    md: 'text-neutral-300',
    html: 'text-orange-300',
  }
  return <File className={cn('h-3.5 w-3.5 shrink-0', colors[ext] || 'text-neutral-400')} />
}

function Node({ node, depth, activePath, onSelect }) {
  const [open, setOpen] = useState(depth < 2)

  if (node.file) {
    const isActive = activePath === node.path
    return (
      <button
        type="button"
        onClick={() => onSelect(node.file)}
        className={cn(
          'group flex w-full items-center gap-1.5 px-2 py-1 rounded-md text-[12.5px] text-left',
          'hover:bg-white/[0.05]',
          isActive && 'bg-white/[0.08] text-white',
          !isActive && 'text-neutral-400 hover:text-neutral-100',
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <FileIcon name={node.name} />
        <span className="truncate">{node.name}</span>
      </button>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-1 px-2 py-1 rounded-md text-[12.5px] text-neutral-300 hover:bg-white/[0.05] hover:text-white"
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
      >
        <ChevronRight
          className={cn(
            'h-3 w-3 shrink-0 text-neutral-500 transition-transform',
            open && 'rotate-90',
          )}
        />
        {open ? (
          <FolderOpen className="h-3.5 w-3.5 shrink-0 text-amber-300/80" />
        ) : (
          <Folder className="h-3.5 w-3.5 shrink-0 text-amber-300/80" />
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {open && (
        <div>
          {node.children.map((c) => (
            <Node
              key={c.path}
              node={c}
              depth={depth + 1}
              activePath={activePath}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileTree({ tree, activePath, onSelect }) {
  if (!tree || !tree.children) return null
  return (
    <div className="flex flex-col">
      {tree.children.map((c) => (
        <Node
          key={c.path}
          node={c}
          depth={0}
          activePath={activePath}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
