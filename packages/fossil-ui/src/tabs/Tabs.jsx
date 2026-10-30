import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn.js'
import { splitMotionProps } from '../lib/animationTiming.js'

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect

export const TAB_MOTIONS = ['pill', 'underline', 'dot', 'grow', 'outline', 'glow', 'lift', 'fade']

const TRACK = new Set(['pill', 'outline', 'glow', 'lift', 'fade'])
const RULED = new Set(['underline', 'dot'])
const FILLED_LABEL = new Set(['pill', 'fade'])

const INDICATOR =
  'pointer-events-none absolute z-0 origin-center transition-[left,width,top,height,scale,transform] delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,320ms)] ease-[var(--fossil-ease,var(--fossil-ease-out))] motion-reduce:transition-none'

const INDICATOR_CLASS = {
  pill: 'rounded-lg bg-neutral-900',
  underline: 'rounded-full bg-neutral-900',
  dot: 'rounded-full bg-neutral-900',
  grow: 'origin-center scale-100 rounded-full bg-indigo-500 starting:scale-0',
  outline: 'rounded-lg bg-white ring-1 ring-inset ring-neutral-900',
  glow: 'rounded-lg bg-indigo-500/15 shadow-[0_0_22px_rgba(99,102,241,0.45)]',
  lift: 'rounded-lg bg-white shadow-[0_8px_18px_-10px_rgba(15,23,42,0.55)]',
}

function indicatorBox(motion, rect) {
  if (motion === 'underline') {
    return { left: rect.left, top: rect.top + rect.height - 2, width: rect.width, height: 2 }
  }
  if (motion === 'grow') {
    const width = 18
    return {
      left: rect.left + rect.width / 2 - width / 2,
      top: rect.top + rect.height - 5,
      width,
      height: 4,
    }
  }
  if (motion === 'dot') {
    return {
      left: rect.left + rect.width / 2 - 3,
      top: rect.top + rect.height - 8,
      width: 6,
      height: 6,
    }
  }
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
}

/**
 * @param {unknown} value
 * @param {unknown} defaultValue
 * @param {(next: string) => void} [onChange]
 */
function useControllable(value, defaultValue, onChange) {
  const [internal, setInternal] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal
  const setCurrent = (next) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }
  return [current, setCurrent]
}

/**
 * Horizontal tabs. The indicator glides, grows, or fades onto the selected tab.
 * Arrow keys, Home, and End move the selection.
 *
 * @param {object} props
 * @param {'pill' | 'underline' | 'dot' | 'grow' | 'outline' | 'glow' | 'lift' | 'fade'} [props.motion]
 * @param {Array<{ value: string, label: import('react').ReactNode, content?: import('react').ReactNode, disabled?: boolean }>} [props.items]
 * @param {string} [props.value]
 * @param {string} [props.defaultValue]
 * @param {(value: string) => void} [props.onValueChange]
 */
export function Tabs(props) {
  const { rest, style } = splitMotionProps(props)
  const {
    motion = 'pill',
    items = [],
    value,
    defaultValue,
    onValueChange,
    className,
    ...dom
  } = rest

  const resolved = TAB_MOTIONS.includes(motion) ? motion : 'pill'
  const baseId = useId()
  const listRef = useRef(null)
  const tabsRef = useRef(new Map())
  const enabled = items.filter((item) => !item.disabled)
  const fallback = enabled[0]?.value ?? items[0]?.value
  const [current, setCurrent] = useControllable(value, defaultValue ?? fallback, onValueChange)
  const selected = enabled.some((item) => item.value === current) ? current : fallback
  const [indicator, setIndicator] = useState(null)

  useIsoLayout(() => {
    const list = listRef.current
    const tab = selected == null ? null : tabsRef.current.get(selected)
    if (!list || !tab) {
      setIndicator(null)
      return undefined
    }

    const measure = () => {
      setIndicator({
        left: tab.offsetLeft,
        top: tab.offsetTop,
        width: tab.offsetWidth,
        height: tab.offsetHeight,
      })
    }

    measure()
    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    observer.observe(tab)
    return () => observer.disconnect()
  }, [selected, resolved, items])

  const moveTo = (item) => {
    if (!item || item.disabled) return
    setCurrent(item.value)
    tabsRef.current.get(item.value)?.focus()
  }

  const onKeyDown = (event) => {
    const index = enabled.findIndex((item) => item.value === selected)
    if (index < 0) return
    if (event.key === 'ArrowRight') moveTo(enabled[(index + 1) % enabled.length])
    else if (event.key === 'ArrowLeft') moveTo(enabled[(index - 1 + enabled.length) % enabled.length])
    else if (event.key === 'Home') moveTo(enabled[0])
    else if (event.key === 'End') moveTo(enabled[enabled.length - 1])
    else return
    event.preventDefault()
  }

  const active = items.find((item) => item.value === selected)

  return (
    <div className={cn('w-full min-w-0', className)} style={style} {...dom}>
      <div
        ref={listRef}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className={cn(
          'relative flex min-w-0 max-w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]',
          TRACK.has(resolved) && 'gap-1 rounded-xl bg-neutral-100 p-1',
          RULED.has(resolved) && 'border-b border-neutral-200',
          resolved === 'grow' && 'items-end',
        )}
      >
        {indicator && resolved !== 'fade' ? (
          <span
            key={resolved === 'grow' ? selected : 'indicator'}
            aria-hidden
            className={cn(INDICATOR, INDICATOR_CLASS[resolved])}
            style={indicatorBox(resolved, indicator)}
          />
        ) : null}
        {items.map((item) => {
          const isSelected = item.value === selected
          return (
            <button
              key={item.value}
              ref={(node) => {
                if (node) tabsRef.current.set(item.value, node)
                else tabsRef.current.delete(item.value)
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.value}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${item.value}`}
              aria-disabled={item.disabled || undefined}
              disabled={item.disabled}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => {
                if (!item.disabled) setCurrent(item.value)
              }}
              className={cn(
                'relative z-10 shrink-0 whitespace-nowrap px-3 py-2 text-[13px] font-medium',
                'transition-[color,font-size] delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,320ms)] ease-[var(--fossil-ease,var(--fossil-ease-out))] motion-reduce:transition-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/45',
                TRACK.has(resolved) ? 'rounded-lg' : 'rounded-md',
                item.disabled && 'cursor-not-allowed opacity-40',
                resolved === 'fade' && isSelected && 'bg-neutral-900',
                resolved === 'grow'
                  ? isSelected
                    ? 'pb-3 text-[15px] font-semibold text-neutral-900'
                    : 'pb-3 text-[13px] text-neutral-400 hover:text-neutral-700'
                  : isSelected
                    ? FILLED_LABEL.has(resolved)
                      ? 'text-white'
                      : 'text-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-900',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {active ? (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${active.value}`}
          aria-labelledby={`${baseId}-tab-${active.value}`}
          tabIndex={0}
          className="mt-4 text-[14px] leading-relaxed text-neutral-600 outline-none"
        >
          {active.content}
        </div>
      ) : null}
    </div>
  )
}

export function PillTabs(props) {
  return <Tabs {...props} motion="pill" />
}

export function UnderlineTabs(props) {
  return <Tabs {...props} motion="underline" />
}

export function DotTabs(props) {
  return <Tabs {...props} motion="dot" />
}

export function GrowTabs(props) {
  return <Tabs {...props} motion="grow" />
}

export function OutlineTabs(props) {
  return <Tabs {...props} motion="outline" />
}

export function GlowTabs(props) {
  return <Tabs {...props} motion="glow" />
}

export function LiftTabs(props) {
  return <Tabs {...props} motion="lift" />
}

export function FadeTabs(props) {
  return <Tabs {...props} motion="fade" />
}
