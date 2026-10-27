const MEDIA_BASE = (import.meta.env.VITE_MEDIA_URL || '').replace(/\/$/, '')

/**
 * Remote object path -> file in /public.
 * Card and email photos live at the site root. Template previews are the
 * already-encoded cuts in /videos, not the raw recordings.
 */
const PUBLIC_FALLBACKS = [
  ['images/14.jpg', '/14.jpg'],
  ['images/email.jpg', '/email.jpg'],
  ['videos/atelier_09.optimized.mp4', '/videos/atelier_09.optimized.mp4'],
  ['videos/elevencrm.optimized.mp4', '/videos/elevencrm.optimized.mp4'],
  ['videos/evently.optimized.mp4', '/videos/evently.optimized.mp4'],
  ['videos/glimpse.optimized.mp4', '/videos/glimpse.optimized.mp4'],
  ['videos/iron_volt.optimized.mp4', '/videos/iron_volt.optimized.mp4'],
  ['videos/nebula.optimized.mp4', '/videos/nebula.optimized.mp4'],
  ['videos/northboundlabs.optimized.mp4', '/videos/northboundlabs.optimized.mp4'],
  ['videos/norwinai.optimized.mp4', '/videos/norwinai.optimized.mp4'],
  ['videos/olea.optimized.mp4', '/videos/olea.optimized.mp4'],
]

/** Resolve a media path against the Supabase bucket, falling back to /public when unset. */
export function mediaUrl(path, localPath = `/${path}`) {
  return MEDIA_BASE ? `${MEDIA_BASE}/${path}` : localPath
}

/** Public-folder URL for a remote media URL, when a local copy exists. */
export function mediaFallbackUrl(src) {
  if (!src) return undefined
  for (const [remotePath, localPath] of PUBLIC_FALLBACKS) {
    if (src === localPath || src === remotePath || src.endsWith(`/${remotePath}`)) return localPath
  }
  return undefined
}
