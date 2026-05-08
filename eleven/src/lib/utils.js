import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine class names with Tailwind merge support.
 * Lets us pass conditional classes without worrying about conflicts.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/** Compact number formatting: 12500 → "12.5K" */
export function formatNumber(value) {
  if (value === null || value === undefined) return '—'
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

/** Full number with thousands separators */
export function formatFull(value) {
  if (value === null || value === undefined) return '—'
  return new Intl.NumberFormat('en').format(value)
}

/** Format bytes into human-readable size */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

/** Initials from a full name */
export function initials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
