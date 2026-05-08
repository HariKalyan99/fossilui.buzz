import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import { useContentStore } from '@/store/content'
import { formatNumber } from '@/lib/utils'

export default function TopPosts() {
  const posts = useContentStore((s) => s.posts)
  const users = useContentStore((s) => s.users)

  const top = [...posts]
    .filter((p) => p.status === 'Published')
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)

  const max = Math.max(...top.map((p) => p.views), 1)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top performing</CardTitle>
        <CardDescription>Most viewed posts this period.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {top.map((post) => {
            const author = users.find((u) => u.id === post.authorId)
            const ratio = (post.views / max) * 100
            return (
              <li key={post.id}>
                <Link
                  to={`/content/${post.id}`}
                  className="group block rounded-lg p-2 -mx-2 hover:bg-muted/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium leading-snug group-hover:text-foreground">
                        {post.title}
                      </p>
                      <p className="mt-0.5 text-[11.5px] text-muted-foreground">{author?.name} · {post.category}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground tabular-nums">
                      <Eye className="size-3.5" />
                      {formatNumber(post.views)}
                    </div>
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/80 transition-all"
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
