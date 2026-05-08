import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Eye, MoreHorizontal, Edit3, Copy, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import Avatar from '@/components/ui/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu'
import { useContentStore } from '@/store/content'
import { formatNumber } from '@/lib/utils'

export default function PostCard({ post }) {
  const author = useContentStore((s) => s.users.find((u) => u.id === post.authorId))
  const deletePost = useContentStore((s) => s.deletePost)

  return (
    <Card className="group relative overflow-hidden transition-colors hover:border-foreground/15">
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-b border-border bg-dot relative">
        <div className="absolute top-3 left-3">
          <StatusBadge status={post.status} />
        </div>
      </div>
      <div className="p-4">
        <p className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">{post.category}</p>
        <Link to={`/content/${post.id}`} className="mt-1 block">
          <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug tracking-tight group-hover:text-foreground">
            {post.title}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-[12.5px] text-muted-foreground leading-relaxed">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-2">
          <Avatar name={author?.name} gradient={author?.avatarColor} size="sm" />
          <span className="text-[12px] text-muted-foreground">{author?.name}</span>
          <span className="text-[12px] text-muted-foreground/60">·</span>
          <span className="text-[12px] text-muted-foreground tabular-nums">
            {format(new Date(post.updatedAt), 'MMM d')}
          </span>
          <div className="ml-auto flex items-center gap-1.5 text-[12px] text-muted-foreground tabular-nums">
            <Eye className="size-3.5" />
            {formatNumber(post.views)}
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-md bg-background/80 text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity hover:text-foreground group-hover:opacity-100"
            aria-label="Post actions"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link to={`/content/${post.id}`}><Edit3 /> Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem><Copy /> Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => deletePost(post.id)} className="text-destructive focus:text-destructive">
            <Trash2 className="!text-destructive" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  )
}
