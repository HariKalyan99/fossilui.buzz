import { cn } from '../../lib/cn.js'

const MOTION_CLASSES = {
  default: 'h-10 rounded-lg border border-neutral-200 bg-white px-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15',
  underline:
    'h-10 rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 shadow-none focus:border-indigo-500 focus:ring-0',
  filled:
    'h-10 rounded-lg border border-transparent bg-neutral-100 px-3 shadow-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15',
  ghost:
    'h-10 rounded-lg border border-transparent bg-transparent px-3 shadow-none hover:bg-neutral-50 focus:border-neutral-200 focus:ring-2 focus:ring-indigo-500/10',
  ringGlow:
    'h-10 rounded-lg border border-neutral-200 bg-white px-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20',
  compact: 'h-8 rounded-md border border-neutral-200 bg-white px-2.5 text-[13px] shadow-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15',
  search:
    'h-10 rounded-full border border-neutral-200 bg-neutral-50 pl-9 pr-3 shadow-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15',
  error:
    'h-10 rounded-lg border border-rose-300 bg-white px-3 shadow-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15',
  success:
    'h-10 rounded-lg border border-emerald-300 bg-white px-3 shadow-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15',
}

export function getInputMotionClass(motion = 'default') {
  return MOTION_CLASSES[motion] ?? MOTION_CLASSES.default
}

export const INPUT_BASE = cn(
  'w-full text-sm text-neutral-900 transition-colors placeholder:text-neutral-400',
  'focus:outline-none disabled:cursor-not-allowed disabled:opacity-60',
)
