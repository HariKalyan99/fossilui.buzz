import Badge from './Badge'

const statusConfig = {
  Published: { tone: 'success', label: 'Published' },
  Draft: { tone: 'muted', label: 'Draft' },
  Scheduled: { tone: 'warning', label: 'Scheduled' },
  Archived: { tone: 'default', label: 'Archived' },
  Active: { tone: 'success', label: 'Active' },
  Invited: { tone: 'warning', label: 'Invited' },
  Suspended: { tone: 'destructive', label: 'Suspended' },
}

export default function StatusBadge({ status, className }) {
  const cfg = statusConfig[status] || { tone: 'default', label: status }
  return (
    <Badge tone={cfg.tone} dot className={className}>
      {cfg.label}
    </Badge>
  )
}
