import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn, formatNumber } from '@/lib/utils'

export default function StatCard({ icon: Icon, label, value, delta, deltaLabel, format = formatNumber, index = 0 }) {
  const isUp = typeof delta === 'number' && delta >= 0
  const display = typeof value === 'number' ? format(value) : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Card className="p-5 hover:border-foreground/15 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="size-4" strokeWidth={2} />
          </div>
          {typeof delta === 'number' && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 text-[11.5px] font-medium tabular-nums',
                isUp ? 'text-success' : 'text-destructive',
              )}
            >
              {isUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
              {Math.abs(delta).toFixed(1)}%
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-[11.5px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-1.5 text-[26px] font-semibold tracking-tight tabular-nums leading-none">{display}</p>
          {deltaLabel && (
            <p className="mt-2 text-[11.5px] text-muted-foreground">{deltaLabel}</p>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
