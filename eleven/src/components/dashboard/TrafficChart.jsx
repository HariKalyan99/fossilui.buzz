import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
} from 'recharts'
import { Card } from '@/components/ui/Card'
import { cn, formatNumber } from '@/lib/utils'
import { mockTraffic } from '@/data/mock'

const ranges = [
  { id: '7d', label: '7d', days: 7 },
  { id: '30d', label: '30d', days: 30 },
]

function ChartTooltipContent({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-[12px] text-popover-foreground shadow-pop dark:shadow-pop-dark">
      <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="mt-1 flex items-center gap-2 tabular-nums">
          <span
            className="size-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="capitalize text-muted-foreground">{p.dataKey}</span>
          <span className="ml-auto font-medium text-foreground">
            {formatNumber(p.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function TrafficChart() {
  const [range, setRange] = useState('30d')
  const data = useMemo(() => {
    const r = ranges.find((x) => x.id === range)
    return mockTraffic.slice(-r.days)
  }, [range])

  const total = data.reduce((s, d) => s + d.views, 0)
  const totalVisitors = data.reduce((s, d) => s + d.visitors, 0)

  return (
    <Card>
      <div className="flex items-start justify-between p-5 pb-2">
        <div>
          <p className="text-[11.5px] font-medium uppercase tracking-wider text-muted-foreground">Traffic</p>
          <div className="mt-1.5 flex items-baseline gap-3">
            <p className="text-[26px] font-semibold tracking-tight tabular-nums leading-none">{formatNumber(total)}</p>
            <p className="text-[12.5px] text-muted-foreground">
              <span className="tabular-nums text-foreground">{formatNumber(totalVisitors)}</span> visitors
            </p>
          </div>
        </div>
        <div className="inline-flex rounded-lg border border-border bg-muted/50 p-0.5">
          {ranges.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={cn(
                'h-7 rounded-md px-2.5 text-[12px] font-medium transition-colors',
                range === r.id
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-2 pb-3 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 16, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.18} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="visitorsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={0.08} />
                <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              interval={Math.max(0, Math.floor(data.length / 7))}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={6}
              width={36}
              tickFormatter={(v) => formatNumber(v)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1.25}
              fill="url(#visitorsFill)"
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#viewsFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
