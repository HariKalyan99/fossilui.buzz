import { cn } from '../../lib/cn';

export default function Badge({ children, className, tone = 'default', ...props }) {
  const tones = {
    default: 'bg-surface border-border text-muted',
    primary: 'bg-primary/10 border-primary/30 text-primary-400',
    cyan: 'bg-secondary/10 border-secondary/30 text-secondary-400',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
