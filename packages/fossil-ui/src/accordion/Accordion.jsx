import { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Plus } from 'lucide-react'
import { cn } from '../lib/cn.js'
import { splitMotionProps } from '../lib/animationTiming.js'

export const ACCORDION_MOTIONS = ['height', 'fade', 'slide', 'rise', 'scale', 'blur', 'pop', 'wipe']

const TIMING =
  'delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,280ms)] ease-[var(--fossil-ease,var(--fossil-ease-out))] motion-reduce:transition-none'

const CONTENT_SHIFT = `origin-top transition-[opacity,transform,translate,filter,clip-path] ${TIMING}`

function contentMotion(motion, open) {
  const closed = {
    height: '',
    fade: 'opacity-0',
    slide: '-translate-y-1 opacity-0',
    rise: 'translate-y-1 opacity-0',
    scale: 'scale-95 opacity-0',
    blur: 'opacity-0 blur-[3px]',
    pop: 'scale-90 opacity-0',
    wipe: 'opacity-0 [clip-path:inset(0_0_100%_0)]',
  }
  const shown = {
    height: '',
    fade: 'opacity-100',
    slide: 'translate-y-0 opacity-100',
    rise: 'translate-y-0 opacity-100',
    scale: 'scale-100 opacity-100',
    blur: 'opacity-100 blur-none',
    pop: 'scale-100 opacity-100',
    wipe: 'opacity-100 [clip-path:inset(0)]',
  }
  const key = closed[motion] == null ? 'height' : motion
  return cn(CONTENT_SHIFT, open ? shown[key] : closed[key])
}
export const ACCORDION_TYPES = ['single', 'multiple']

/**
 * @param {unknown} value
 * @param {'single' | 'multiple'} type
 */
function normalize(value, type) {
  if (type === 'multiple') {
    if (Array.isArray(value)) return value.map(String)
    return value == null || value === '' ? [] : [String(value)]
  }
  if (Array.isArray(value)) return value[0] == null ? '' : String(value[0])
  return value == null ? '' : String(value)
}

function isOpen(current, itemValue, type) {
  return type === 'multiple' ? current.includes(itemValue) : current === itemValue
}

/**
 * @param {string | string[]} current
 * @param {string} itemValue
 * @param {'single' | 'multiple'} type
 * @param {boolean} collapsible
 */
function toggleValue(current, itemValue, type, collapsible) {
  if (type === 'multiple') {
    const list = Array.isArray(current) ? current : []
    return list.includes(itemValue) ? list.filter((value) => value !== itemValue) : [...list, itemValue]
  }
  if (current === itemValue) return collapsible ? '' : current
  return itemValue
}

/**
 * @param {unknown} value
 * @param {unknown} defaultValue
 * @param {(next: string | string[]) => void} [onChange]
 * @param {'single' | 'multiple'} type
 */
function useControllable(value, defaultValue, onChange, type) {
  const [internal, setInternal] = useState(() => normalize(defaultValue, type))
  const isControlled = value !== undefined
  const current = normalize(isControlled ? value : internal, type)
  const setCurrent = (next) => {
    const resolved = normalize(next, type)
    if (!isControlled) setInternal(resolved)
    onChange?.(resolved)
  }
  return [current, setCurrent]
}

const ROOT = {
  height: 'divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200 bg-white',
  fade: 'flex flex-col',
  slide: 'flex flex-col gap-2',
  rise: 'flex flex-col gap-2.5',
  scale: 'flex flex-col gap-1',
  blur: 'flex flex-col gap-2 rounded-2xl bg-neutral-950 p-2',
  pop: 'flex flex-col gap-2 overflow-x-clip px-1 py-0.5',
  wipe: 'flex flex-col',
}

function itemClass(motion, open) {
  if (motion === 'fade') return cn('border-b border-neutral-200 last:border-0', open && 'bg-indigo-50/70')
  if (motion === 'slide') {
    return cn(
      'overflow-hidden rounded-lg border bg-white transition-[border-color]',
      TIMING,
      open ? 'border-neutral-900 border-l-4 border-l-indigo-500' : 'border-neutral-200',
    )
  }
  if (motion === 'rise') {
    return cn(
      'overflow-hidden rounded-2xl border bg-white transition-[transform,box-shadow,border-color]',
      TIMING,
      open
        ? '-translate-y-0.5 border-neutral-300 shadow-[0_16px_30px_-18px_rgba(15,23,42,0.55)]'
        : 'border-neutral-200 shadow-sm',
    )
  }
  if (motion === 'scale') {
    return cn(
      'origin-left overflow-hidden rounded-xl border-2 bg-white transition-[transform,opacity,border-color]',
      TIMING,
      open ? 'scale-100 border-neutral-900 opacity-100' : 'scale-[0.97] border-neutral-200 opacity-45',
    )
  }
  if (motion === 'blur') {
    return cn(
      'overflow-hidden rounded-xl transition-[filter,opacity,background-color]',
      TIMING,
      open ? 'bg-white blur-none opacity-100' : 'bg-white/5 opacity-50 blur-[3px]',
    )
  }
  if (motion === 'pop') {
    return cn(
      'overflow-hidden rounded-full transition-[border-radius,background-color,color,transform,box-shadow]',
      TIMING,
      open
        ? 'scale-[1.02] rounded-2xl bg-neutral-900 text-white shadow-[0_18px_36px_-20px_rgba(15,23,42,0.7)]'
        : 'bg-neutral-100 text-neutral-600',
    )
  }
  if (motion === 'wipe') return 'grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3'
  return ''
}

function Marker({ motion, open, index }) {
  const spin = cn('h-4 w-4 shrink-0 transition-transform', TIMING)
  if (motion === 'fade') {
    return <Plus aria-hidden className={cn(spin, 'text-indigo-600', open && 'rotate-45')} />
  }
  if (motion === 'slide') {
    return (
      <ArrowRight
        aria-hidden
        className={cn(spin, 'text-neutral-400', open && 'rotate-90 text-neutral-900')}
      />
    )
  }
  if (motion === 'wipe') {
    return (
      <span
        aria-hidden
        className={cn(
          'mt-2.5 grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold transition-colors',
          TIMING,
          open ? 'bg-neutral-900 text-white' : 'border border-neutral-300 text-neutral-400',
        )}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    )
  }
  if (motion === 'blur') {
    return (
      <span
        aria-hidden
        className={cn(
          'h-2 w-2 shrink-0 rounded-full transition-all',
          TIMING,
          open ? 'bg-neutral-900' : 'bg-white/15',
        )}
      />
    )
  }
  return (
    <ChevronDown
      aria-hidden
      className={cn(spin, open && 'rotate-180', motion === 'pop' && open ? 'text-white' : 'text-neutral-400')}
    />
  )
}

/**
 * Accordion whose panels open by height, with a second motion on the content.
 * `single` keeps one panel open. `multiple` lets several stay open.
 *
 * @param {object} props
 * @param {'height' | 'fade' | 'slide' | 'rise' | 'scale' | 'blur' | 'pop' | 'wipe'} [props.motion]
 * @param {'single' | 'multiple'} [props.type]
 * @param {boolean} [props.collapsible] Single mode can close the open panel.
 * @param {Array<{ value: string, title: import('react').ReactNode, content?: import('react').ReactNode, disabled?: boolean }>} [props.items]
 * @param {string | string[]} [props.value]
 * @param {string | string[]} [props.defaultValue]
 * @param {(value: string | string[]) => void} [props.onValueChange]
 */
export function Accordion(props) {
  const { rest, style } = splitMotionProps(props)
  const {
    motion = 'height',
    type = 'single',
    collapsible = true,
    items = [],
    value,
    defaultValue,
    onValueChange,
    className,
    ...dom
  } = rest

  const resolvedType = ACCORDION_TYPES.includes(type) ? type : 'single'
  const resolvedMotion = ACCORDION_MOTIONS.includes(motion) ? motion : 'height'
  const baseId = useId()
  const headerRefs = useRef(new Map())
  const initial =
    defaultValue !== undefined
      ? defaultValue
      : resolvedType === 'multiple'
        ? []
        : (items.find((item) => !item.disabled)?.value ?? '')
  const [current, setCurrent] = useControllable(value, initial, onValueChange, resolvedType)

  const focusHeader = (item) => {
    if (!item) return
    headerRefs.current.get(item.value)?.focus()
  }

  const onKeyDown = (event, item) => {
    const enabled = items.filter((entry) => !entry.disabled)
    const index = enabled.findIndex((entry) => entry.value === item.value)
    if (index < 0) return
    if (event.key === 'ArrowDown') focusHeader(enabled[(index + 1) % enabled.length])
    else if (event.key === 'ArrowUp') focusHeader(enabled[(index - 1 + enabled.length) % enabled.length])
    else if (event.key === 'Home') focusHeader(enabled[0])
    else if (event.key === 'End') focusHeader(enabled[enabled.length - 1])
    else return
    event.preventDefault()
  }

  return (
    <div className={cn('w-full min-w-0', ROOT[resolvedMotion], className)} style={style} data-motion={resolvedMotion} {...dom}>
      {items.map((item, index) => {
        const open = isOpen(current, item.value, resolvedType)
        const panelId = `${baseId}-panel-${item.value}`
        const headerId = `${baseId}-header-${item.value}`
        const inverted = resolvedMotion === 'pop' && open
        return (
          <div key={item.value} className={itemClass(resolvedMotion, open)}>
            {resolvedMotion === 'wipe' ? <Marker motion="wipe" open={open} index={index} /> : null}
            <div className="min-w-0">
              <h3 className="text-[14px] font-medium">
                <button
                  ref={(node) => {
                    if (node) headerRefs.current.set(item.value, node)
                    else headerRefs.current.delete(item.value)
                  }}
                  type="button"
                  id={headerId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  disabled={item.disabled}
                  onClick={() => {
                    if (!item.disabled) setCurrent(toggleValue(current, item.value, resolvedType, collapsible))
                  }}
                  onKeyDown={(event) => onKeyDown(event, item)}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 px-4 py-3 text-left',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/40',
                    resolvedMotion === 'fade' && 'px-1',
                    resolvedMotion === 'wipe' && 'px-0',
                    inverted ? 'text-white hover:bg-white/5' : 'text-neutral-900 hover:bg-neutral-50',
                    resolvedMotion === 'blur' && !open && 'text-neutral-200 hover:bg-white/5',
                    resolvedMotion === 'blur' && open && 'text-neutral-900 hover:bg-neutral-100',
                    item.disabled && 'cursor-not-allowed opacity-40',
                  )}
                >
                  <span className={cn(resolvedMotion === 'wipe' && 'text-[15px] tracking-tight')}>{item.title}</span>
                  {resolvedMotion === 'wipe' ? null : <Marker motion={resolvedMotion} open={open} index={index} />}
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className={cn(
                  'grid transition-[grid-template-rows]',
                  TIMING,
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      'px-4 pb-4 text-[14px] font-normal leading-relaxed',
                      resolvedMotion === 'fade' && 'px-1',
                      resolvedMotion === 'wipe' && 'px-0',
                      inverted ? 'text-white/75' : 'text-neutral-600',
                      contentMotion(resolvedMotion, open),
                    )}
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function HeightAccordion(props) {
  return <Accordion {...props} motion="height" />
}

export function FadeAccordion(props) {
  return <Accordion {...props} motion="fade" />
}

export function SlideAccordion(props) {
  return <Accordion {...props} motion="slide" />
}

export function RiseAccordion(props) {
  return <Accordion {...props} motion="rise" />
}

export function ScaleAccordion(props) {
  return <Accordion {...props} motion="scale" />
}

export function BlurAccordion(props) {
  return <Accordion {...props} motion="blur" />
}

export function PopAccordion(props) {
  return <Accordion {...props} motion="pop" />
}

export function WipeAccordion(props) {
  return <Accordion {...props} motion="wipe" />
}
