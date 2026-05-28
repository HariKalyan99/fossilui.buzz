import { useState } from 'react'
import { ChevronRight, File, Folder, FolderOpen } from 'lucide-react'
import { cn } from '../../lib/cn'

const FILE_ICON_COLORS = {
  jsx: 'text-[#8ab1b0]',
  js: 'text-[#f79a32]',
  ts: 'text-[#8ab1b0]',
  tsx: 'text-[#8ab1b0]',
  css: 'text-[#f06431]',
  json: 'text-[#f79a32]',
  md: 'text-[#a57a4c]',
  html: 'text-[#dc3958]',
}

function FileIcon({ name }) {
  const ext = name.split('.').pop()?.toLowerCase()
  return (
    <File
      className={cn('h-3.5 w-3.5 shrink-0', FILE_ICON_COLORS[ext] || 'text-[#a57a4c]')}
    />
  )
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
          'hover:bg-[#5e452b]/60',
          isActive && 'bg-[#5e452b] text-[#e3b583]',
          !isActive && 'text-[#a57a4c] hover:text-[#d3af86]',
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
        className="flex w-full items-center gap-1 px-2 py-1 rounded-md text-[12.5px] text-[#d3af86] hover:bg-[#5e452b]/60 hover:text-[#e3b583]"
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
      >
        <ChevronRight
          className={cn(
            'h-3 w-3 shrink-0 text-[#a57a4c] transition-transform',
            open && 'rotate-90',
          )}
        />
        {open ? (
          <FolderOpen className="h-3.5 w-3.5 shrink-0 text-[#f79a32]" />
        ) : (
          <Folder className="h-3.5 w-3.5 shrink-0 text-[#f79a32]" />
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
