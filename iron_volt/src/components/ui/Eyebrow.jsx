export default function Eyebrow({ children, index, tone = 'dark', className = '' }) {
  const dark = tone === 'dark'
  return (
    <p className={`type-eyebrow flex items-center gap-3 ${dark ? 'text-ash' : 'text-steel'} ${className}`}>
      {index && <span className={dark ? 'text-volt' : 'text-ink'}>({index})</span>}
      <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-volt' : 'bg-ink'}`} />
      <span>{children}</span>
    </p>
  )
}
