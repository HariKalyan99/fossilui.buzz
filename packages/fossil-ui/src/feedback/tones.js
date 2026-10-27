import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react'

export const FEEDBACK_TONES = /** @type {const} */ (['info', 'success', 'warning', 'error'])

/** Shared color, icon, and live-region role for alerts and toasts. */
export const TONE_STYLES = {
  info: {
    root: 'border-indigo-200 bg-indigo-50 text-indigo-950',
    icon: 'text-indigo-600',
    Icon: Info,
    role: 'status',
  },
  success: {
    root: 'border-emerald-200 bg-emerald-50 text-emerald-950',
    icon: 'text-emerald-600',
    Icon: CircleCheck,
    role: 'status',
  },
  warning: {
    root: 'border-amber-200 bg-amber-50 text-amber-950',
    icon: 'text-amber-700',
    Icon: TriangleAlert,
    role: 'alert',
  },
  error: {
    root: 'border-rose-200 bg-rose-50 text-rose-950',
    icon: 'text-rose-600',
    Icon: CircleAlert,
    role: 'alert',
  },
}
