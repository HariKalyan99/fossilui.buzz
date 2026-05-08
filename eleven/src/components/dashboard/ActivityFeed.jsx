import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import { useContentStore } from '@/store/content'

export default function ActivityFeed() {
  const activity = useContentStore((s) => s.activity)
  const users = useContentStore((s) => s.users)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>What your team has been up to.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="relative">
          <span className="absolute left-[15px] top-1 bottom-1 w-px bg-border" aria-hidden />
          {activity.map((entry) => {
            const user = users.find((u) => u.id === entry.userId)
            const objectHref =
              entry.objectType === 'post' ? `/content/${entry.objectId}`
              : entry.objectType === 'media' ? '/media'
              : entry.objectType === 'user' ? '/users'
              : '#'
            return (
              <li key={entry.id} className="relative flex items-start gap-3 py-3">
                <div className="relative z-[1] mt-0.5">
                  <Avatar name={user?.name} gradient={user?.avatarColor} size="sm" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-snug">
                    <span className="font-medium">{user?.name}</span>{' '}
                    <span className="text-muted-foreground">{entry.verb}</span>{' '}
                    <Link
                      to={objectHref}
                      className="font-medium underline-offset-2 hover:underline"
                    >
                      {entry.objectTitle}
                    </Link>
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-muted-foreground tabular-nums">
                    {formatDistanceToNow(new Date(entry.at), { addSuffix: true })}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
