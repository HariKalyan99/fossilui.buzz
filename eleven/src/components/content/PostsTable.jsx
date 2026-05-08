import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Edit3, MoreHorizontal, Copy, Trash2, Eye, ArrowUpDown } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import Checkbox from '@/components/ui/Checkbox'
import Avatar from '@/components/ui/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { useContentStore } from '@/store/content'
import { cn, formatNumber } from '@/lib/utils'

export default function PostsTable({ posts, selected, onToggle, onToggleAll, sort, onSort }) {
  const users = useContentStore((s) => s.users)
  const deletePost = useContentStore((s) => s.deletePost)

  const allSelected = posts.length > 0 && posts.every((p) => selected.includes(p.id))
  const someSelected = posts.some((p) => selected.includes(p.id)) && !allSelected

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left text-muted-foreground">
              <th className="w-10 px-4 py-2.5">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onCheckedChange={(v) => onToggleAll(!!v)}
                  aria-label="Select all"
                />
              </th>
              <SortableTh field="title" sort={sort} onSort={onSort} className="min-w-[280px]">
                Title
              </SortableTh>
              <SortableTh field="status" sort={sort} onSort={onSort}>Status</SortableTh>
              <SortableTh field="category" sort={sort} onSort={onSort}>Category</SortableTh>
              <th className="px-3 py-2.5 font-medium">Author</th>
              <SortableTh field="views" sort={sort} onSort={onSort} numeric>Views</SortableTh>
              <SortableTh field="updatedAt" sort={sort} onSort={onSort}>Updated</SortableTh>
              <th className="w-10 px-3 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => {
              const author = users.find((u) => u.id === p.authorId)
              const checked = selected.includes(p.id)
              return (
                <tr
                  key={p.id}
                  className={cn(
                    'border-b border-border last:border-0 transition-colors hover:bg-muted/30',
                    checked && 'bg-primary-muted/40',
                  )}
                >
                  <td className="px-4 py-2.5">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => onToggle(p.id)}
                      aria-label={`Select ${p.title}`}
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <Link
                      to={`/content/${p.id}`}
                      className="block font-medium text-foreground hover:underline underline-offset-2 max-w-[420px] truncate"
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground">{p.category}</td>
                  <td className="px-3 py-2.5">
                    <span className="inline-flex items-center gap-2">
                      <Avatar name={author?.name} gradient={author?.avatarColor} size="sm" />
                      <span className="text-muted-foreground">{author?.name}</span>
                    </span>
                  </td>
                  <td className="px-3 py-2.5 tabular-nums text-right">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Eye className="size-3.5" />
                      {formatNumber(p.views)}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground tabular-nums">
                    {format(new Date(p.updatedAt), 'MMM d')}
                  </td>
                  <td className="px-3 py-2.5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          aria-label="Post actions"
                        >
                          <MoreHorizontal className="size-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <Link to={`/content/${p.id}`}><Edit3 /> Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem><Copy /> Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onSelect={() => deletePost(p.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="!text-destructive" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SortableTh({ field, sort, onSort, children, numeric, className }) {
  const isActive = sort.field === field
  return (
    <th className={cn('px-3 py-2.5 font-medium', numeric && 'text-right', className)}>
      <button
        onClick={() => onSort(field)}
        className={cn(
          'inline-flex items-center gap-1 transition-colors hover:text-foreground',
          isActive && 'text-foreground',
        )}
      >
        {children}
        <ArrowUpDown className={cn('size-3', !isActive && 'opacity-50')} />
      </button>
    </th>
  )
}
