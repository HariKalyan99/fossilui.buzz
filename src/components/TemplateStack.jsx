import { cn } from '../lib/cn'
import { getTemplateStack } from '../data/templateStack'
import { StackIcon } from './icons/StackIcons'

const OVERLAY_ICON_BUTTON_CLASS = cn(
  'flex h-6 w-6 items-center justify-center rounded-md bg-white/95',
  'shadow-[0_1px_3px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.08] backdrop-blur-[2px]',
  'transition-all duration-200 ease-out',
  'hover:-translate-y-0.5 hover:scale-110 hover:bg-white hover:shadow-[0_4px_14px_-3px_rgba(15,23,42,0.22)]',
  'active:translate-y-0 active:scale-100',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/45 focus-visible:ring-offset-1',
)

function OverlayIcon({ item }) {
  return (
    <li role="listitem" className="group/stack-item relative shrink-0 list-none">
      <button
        type="button"
        className={OVERLAY_ICON_BUTTON_CLASS}
        aria-label={item.label}
        style={{
          '--stack-hover-ring': item.color,
        }}
      >
        <span
          className={cn(
            'absolute inset-0 rounded-md opacity-0 transition-opacity duration-200',
            'group-hover/stack-item:opacity-100',
          )}
          style={{
            boxShadow: `inset 0 0 0 1.5px color-mix(in srgb, var(--stack-hover-ring) 55%, transparent)`,
          }}
          aria-hidden="true"
        />
        <StackIcon
          id={item.id}
          color={item.color}
          className="relative z-[1] h-3 w-3 transition-transform duration-200 group-hover/stack-item:scale-125"
        />
      </button>
    </li>
  )
}

function OverlayMore({ hidden }) {
  if (!hidden.length) return null

  const title = hidden.map((i) => i.label).join(', ')

  return (
    <li role="listitem" className="group/stack-more relative shrink-0 list-none">
      <button
        type="button"
        className={cn(
          OVERLAY_ICON_BUTTON_CLASS,
          'relative h-6 w-auto bg-neutral-900/90 px-1.5 text-[9px] font-medium leading-none tracking-tight text-white ring-neutral-800/80',
          'hover:bg-neutral-800 hover:ring-neutral-700/80 sm:text-[10px]',
        )}
        aria-label={`${hidden.length} more libraries: ${title}`}
      >
        +{hidden.length} more
      </button>
    </li>
  )
}

export function TemplateStack({
  slug,
  variant = 'detail',
  maxItems,
  className,
  label = 'Libraries used',
}) {
  const items = getTemplateStack(slug)
  const overlayCap = variant === 'overlay' ? (maxItems ?? 5) : maxItems
  const visible = overlayCap != null ? items.slice(0, overlayCap) : items
  const hidden = overlayCap != null ? items.slice(overlayCap) : []
  const overflow = hidden.length

  if (!items.length) return null
  if (variant !== 'overlay' && !visible.length) return null

  if (variant === 'overlay') {
    return (
      <div
        className={cn(
          'pointer-events-auto absolute bottom-2 left-2 z-10 md:bottom-3 md:left-3',
          className,
        )}
        aria-label={`${label}: ${items.map((i) => i.label).join(', ')}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <ul className="m-0 flex list-none items-center gap-1 p-0" role="list">
          {visible.map((item) => (
            <OverlayIcon key={item.id} item={item} />
          ))}
          <OverlayMore hidden={hidden} />
        </ul>
      </div>
    )
  }

  return (
    <div
      className={cn('min-w-0', className)}
      role="list"
      aria-label={`${label}: ${items.map((i) => i.label).join(', ')}`}
    >
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
        {label}
      </p>
      <ul className="flex min-w-0 flex-wrap gap-1.5 sm:gap-2">
        {visible.map((item) => (
          <li key={item.id} role="listitem">
            <span
              className={cn(
                'group/stack-pill inline-flex max-w-full cursor-default items-center gap-1.5 rounded-md border border-neutral-200/90 bg-white px-2.5 py-1',
                'text-[11px] font-medium text-neutral-700 transition-all duration-200 ease-out sm:h-8 sm:px-3 sm:text-[12px]',
                'hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-[0_4px_12px_-4px_rgba(15,23,42,0.15)]',
              )}
            >
              <StackIcon
                id={item.id}
                color={item.color}
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/stack-pill:scale-110 sm:h-4 sm:w-4"
              />
              <span className="truncate">{item.shortLabel}</span>
            </span>
          </li>
        ))}
        {overflow > 0 && (
          <li role="listitem">
            <span
              className={cn(
                'inline-flex h-7 cursor-default items-center rounded-md border border-dashed border-neutral-200 bg-neutral-50 px-2',
                'text-[11px] font-medium text-neutral-500 transition-all duration-200 ease-out sm:h-8 sm:px-2.5 sm:text-[12px]',
                'hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-white hover:text-neutral-600 hover:shadow-[0_4px_12px_-4px_rgba(15,23,42,0.12)]',
              )}
            >
              +{overflow}
            </span>
          </li>
        )}
      </ul>
    </div>
  )
}
