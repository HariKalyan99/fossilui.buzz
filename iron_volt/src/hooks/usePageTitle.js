import { useEffect } from 'react'
import { site } from '../data/site'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`
  }, [title])
}
