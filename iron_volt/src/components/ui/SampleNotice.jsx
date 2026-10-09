import { Info } from 'lucide-react'
import { site } from '../../data/site'

/** Visible marker for placeholder content. Hidden once `site.showSampleNotices` is false. */
export default function SampleNotice({ children, tone = 'dark', className = '' }) {
  if (!site.showSampleNotices) return null
  return (
    <p
      className={`inline-flex items-start gap-2 text-xs leading-relaxed ${tone === 'dark' ? 'text-ash' : 'text-steel'} ${className}`}
    >
      <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  )
}
