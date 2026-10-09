import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '../../lib/cn'

export function CopySnippetButton({ code, label = 'Copy component', className }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? 'Copied to clipboard' : label}
      className={cn(
        'inline-flex min-h-9 w-full touch-manipulation items-center justify-center gap-1.5 rounded-md',
        'border border-neutral-200 bg-white px-3 py-2 text-[12px] font-medium text-neutral-600',
        'transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900',
        'active:scale-[0.99]',
        copied && 'border-indigo-200 bg-indigo-50 text-indigo-700',
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          {label}
        </>
      )}
    </button>
  )
}
