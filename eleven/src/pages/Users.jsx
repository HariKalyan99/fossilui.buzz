import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { Plus, Search, MoreHorizontal, Mail, Shield, UserMinus } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import StatusBadge from '@/components/ui/StatusBadge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { useContentStore } from '@/store/content'
import { cn } from '@/lib/utils'

const ROLE_TONES = {
  Admin: 'primary',
  Editor: 'success',
  Author: 'default',
  Viewer: 'muted',
}

const FILTERS = ['All', 'Admin', 'Editor', 'Author', 'Viewer']

export default function Users() {
  const users = useContentStore((s) => s.users)
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let out = users
    if (filter !== 'All') out = out.filter((u) => u.role === filter)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      out = out.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    }
    return out
  }, [users, filter, query])

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Users & roles</h2>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            {users.length} members · {users.filter((u) => u.role === 'Admin').length} admins
          </p>
        </div>
        <Button>
          <Plus /> Invite member
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex-1 max-w-sm">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email…"
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

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-muted-foreground">
                <th className="px-4 py-2.5 font-medium">User</th>
                <th className="px-3 py-2.5 font-medium">Role</th>
                <th className="px-3 py-2.5 font-medium">Status</th>
                <th className="px-3 py-2.5 font-medium">Joined</th>
                <th className="w-10 px-3 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-border last:border-0 transition-colors hover:bg-muted/30"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} gradient={u.avatarColor} size="md" />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground">{u.name}</p>
                        <p className="text-[12px] text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <Badge tone={ROLE_TONES[u.role] || 'default'} size="md">
                      <Shield className="size-3" />
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={u.status} />
                  </td>
                  <td className="px-3 py-3 text-muted-foreground tabular-nums">
                    {format(new Date(u.joinedAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-3 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          aria-label="User actions"
                        >
                          <MoreHorizontal className="size-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem><Mail /> Send email</DropdownMenuItem>
                        <DropdownMenuItem><Shield /> Change role</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <UserMinus className="!text-destructive" /> Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
