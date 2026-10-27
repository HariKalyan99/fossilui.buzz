const MEDIA_BASE = (import.meta.env.VITE_MEDIA_URL || '').replace(/\/$/, '')

/**
 * Remote object path -> file in /public.
 * The card photo lives at /14.jpg, not /images/14.jpg.
 */
const PUBLIC_FALLBACKS = [['images/14.jpg', '/14.jpg']]

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
