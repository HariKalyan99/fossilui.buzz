const MEDIA_BASE = (import.meta.env.VITE_MEDIA_URL || '').replace(/\/$/, '')

/** Resolve a media path against the Supabase bucket, falling back to /public when unset. */
export function mediaUrl(path, localPath = `/${path}`) {
  return MEDIA_BASE ? `${MEDIA_BASE}/${path}` : localPath
}
