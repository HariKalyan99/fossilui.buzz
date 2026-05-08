import { Link } from 'react-router-dom'
import { FileText, Edit3, Users as UsersIcon, Eye, Plus } from 'lucide-react'
import StatCard from '@/components/dashboard/StatCard'
import TrafficChart from '@/components/dashboard/TrafficChart'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import TopPosts from '@/components/dashboard/TopPosts'
import Button from '@/components/ui/Button'
import { useContentStore } from '@/store/content'

export default function Dashboard() {
  const posts = useContentStore((s) => s.posts)
  const users = useContentStore((s) => s.users)

  const totalViews = posts.reduce((s, p) => s + (p.views || 0), 0)
  const drafts = posts.filter((p) => p.status === 'Draft').length
  const published = posts.filter((p) => p.status === 'Published').length

  const stats = [
    { icon: FileText, label: 'Total posts', value: posts.length, delta: 8.2, deltaLabel: `${published} published` },
    { icon: Edit3, label: 'Drafts', value: drafts, delta: -2.1, deltaLabel: 'Updated this week' },
    { icon: UsersIcon, label: 'Team members', value: users.length, delta: 14.3, deltaLabel: `${users.filter((u) => u.status === 'Active').length} active` },
    { icon: Eye, label: 'Total views', value: totalViews, delta: 12.4, deltaLabel: 'Last 30 days' },
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12.5px] text-muted-foreground">Welcome back, Maya</p>
          <h2 className="mt-0.5 text-2xl font-semibold tracking-tight">Here&rsquo;s what&rsquo;s happening today.</h2>
        </div>
        <Button asChild>
          <Link to="/content/new"><Plus /> New post</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* Chart + activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      {/* Top posts */}
      <div className="grid grid-cols-1 gap-4">
        <TopPosts />
      </div>
    </div>
  )
}
