import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown } from 'lucide-react'
import { splitMotionProps, motionTimingStyle, presenceMs } from '../lib/animationTiming.js'
import { computeFloatingPosition } from '../lib/floatingPosition.js'
import { cn } from '../lib/cn.js'
import { overlayMotionClasses, OVERLAY_DURATION } from '../lib/overlayMotion.js'
import { usePresence, useReducedMotion } from '../lib/motion.js'

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect

export const SELECT_MOTIONS = ['fade', 'scale', 'slideDown', 'slideUp', 'blur', 'pop', 'rise', 'wipe']
export const SELECT_ALIGNMENTS = ['start', 'center', 'end']

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
 * Animated select / listbox. Same eight panel motions as Dropdown.
 *
 * @param {object} props
 * @param {typeof SELECT_MOTIONS[number]} [props.motion]
 * @param {Array<{ value: string, label: import('react').ReactNode, disabled?: boolean }>} [props.items]
 * @param {string} [props.value]
 * @param {string} [props.defaultValue]
 * @param {(value: string, item) => void} [props.onValueChange]
 * @param {import('react').ReactNode} [props.placeholder]
 * @param {boolean} [props.open]
 * @param {boolean} [props.defaultOpen]
 * @param {(open: boolean) => void} [props.onOpenChange]
 * @param {'start' | 'center' | 'end'} [props.align]
 * @param {number} [props.duration]
 * @param {string} [props.easing]
 * @param {number} [props.delay]
 * @param {boolean} [props.contained]
 * @param {boolean} [props.disabled]
 */
export function Select(props) {
  const { rest, timing, style: motionStyle } = splitMotionProps(props)
  const {
    motion = 'fade',
    items = [],
    value,
    defaultValue = '',
    onValueChange,
    placeholder = 'Select…',
    open,
    defaultOpen = false,
    onOpenChange,
    align = 'start',
    contained = false,
    disabled = false,
    className,
    ...dom
  } = rest

  const resolved = SELECT_MOTIONS.includes(motion) ? motion : 'fade'
  const reduceMotion = useReducedMotion()
  const exitMs = reduceMotion ? 0 : presenceMs(timing.duration, timing.delay, OVERLAY_DURATION)
  const [isOpen, setIsOpen] = useControllable(open, defaultOpen, onOpenChange)
  const [selected, setSelected] = useControllable(value, defaultValue, (next) => {
    const item = items.find((entry) => entry.value === next)
    onValueChange?.(next, item)
  })
  const { mounted, visible } = usePresence(isOpen, exitMs)
  const motionClasses = overlayMotionClasses(resolved, 'dropdown')
  const timingStyle = motionTimingStyle(timing)

  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const listRef = useRef(null)
  const listId = useId()
  const [activeIndex, setActiveIndex] = useState(-1)
  const [coords, setCoords] = useState({ top: 0, left: 0, strategy: 'fixed' })
  const [triggerWidth, setTriggerWidth] = useState(0)

  const enabledItems = useMemo(() => items.filter((item) => !item.disabled), [items])
  const selectedItem = items.find((item) => item.value === selected)
  const triggerLabel = selectedItem?.label ?? placeholder

  const measure = useCallback(() => {
    const trigger = triggerRef.current
    const list = listRef.current
    if (!trigger || !list) return
    const triggerRect = trigger.getBoundingClientRect()
    setTriggerWidth(triggerRect.width)
    const listRect = list.getBoundingClientRect()
    const width = Math.max(listRect.width, triggerRect.width)
    const containerRect = contained ? rootRef.current?.getBoundingClientRect() ?? null : null
    // Prefer below the trigger; floatingPosition flips above when there is no room.
    setCoords(
      computeFloatingPosition(triggerRect, { width, height: listRect.height }, {
        side: 'bottom',
        align,
        contained,
        containerRect,
      }),
    )
  }, [align, contained])

  useIsoLayout(() => {
    if (!mounted) return
    measure()
  }, [mounted, measure, visible, items.length, selected])

  useEffect(() => {
    if (!mounted || contained) return undefined
    const onScroll = () => measure()
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
    }
  }, [mounted, contained, measure])

  useEffect(() => {
    if (!isOpen) return undefined
    const onPointerDown = (event) => {
      const root = rootRef.current
      const list = listRef.current
      if (root?.contains(event.target) || list?.contains(event.target)) return
      setIsOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [isOpen, setIsOpen])

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (!enabledItems.length) return
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((i) => (i + 1) % enabledItems.length)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((i) => (i - 1 + enabledItems.length) % enabledItems.length)
      } else if (event.key === 'Home') {
        event.preventDefault()
        setActiveIndex(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        setActiveIndex(enabledItems.length - 1)
      } else if (event.key === 'Enter' && activeIndex >= 0) {
        event.preventDefault()
        const item = enabledItems[activeIndex]
        setSelected(item.value)
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, enabledItems, activeIndex, setIsOpen, setSelected])

  const openList = () => {
    if (disabled) return
    const selectedEnabled = enabledItems.findIndex((item) => item.value === selected)
    setActiveIndex(selectedEnabled >= 0 ? selectedEnabled : 0)
    setIsOpen(true)
  }

  const toggle = () => {
    if (disabled) return
    if (isOpen) {
      setIsOpen(false)
      return
    }
    openList()
  }

  const choose = (item) => {
    if (item.disabled) return
    setSelected(item.value)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const listbox = mounted ? (
    <div
      ref={listRef}
      id={listId}
      role="listbox"
      aria-orientation="vertical"
      data-motion={resolved}
      style={{
        ...timingStyle,
        position: coords.strategy,
        top: coords.top,
        left: coords.left,
        zIndex: contained ? 30 : 9999,
        minWidth: triggerWidth || undefined,
      }}
      className={cn(
        'max-w-[min(22rem,calc(100vw-1rem))] rounded-xl border border-neutral-200 bg-white p-1 shadow-[0_4px_14px_-4px_rgba(15,23,42,0.14)]',
        motionClasses.transition,
        visible ? motionClasses.open : motionClasses.closed,
      )}
    >
      {items.map((item) => {
        const enabledIndex = enabledItems.indexOf(item)
        const active = enabledIndex === activeIndex
        const isSelected = item.value === selected
        return (
          <button
            key={item.value}
            type="button"
            role="option"
            aria-selected={isSelected}
            disabled={item.disabled}
            tabIndex={-1}
            data-highlighted={active ? '' : undefined}
            aria-disabled={item.disabled || undefined}
            onPointerEnter={() => {
              if (!item.disabled && enabledIndex >= 0) setActiveIndex(enabledIndex)
            }}
            onClick={() => choose(item)}
            className={cn(
              'flex w-full min-h-9 items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40',
              item.disabled && 'cursor-not-allowed opacity-40',
              'text-neutral-800 hover:bg-neutral-100',
              active && 'bg-neutral-100 ring-1 ring-inset ring-neutral-200/90',
              isSelected && !active && 'bg-neutral-50',
            )}
          >
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            <Check
              className={cn('h-3.5 w-3.5 shrink-0 text-indigo-600', isSelected ? 'opacity-100' : 'opacity-0')}
              strokeWidth={2.5}
              aria-hidden
            />
          </button>
        )
      })}
    </div>
  ) : null

  return (
    <div
      ref={rootRef}
      className={cn('relative inline-flex min-w-0 max-w-full', className)}
      style={{ ...motionStyle, ...dom.style }}
      data-motion={resolved}
      {...dom}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={toggle}
        className={cn(
          'inline-flex h-9 w-full min-w-[11rem] max-w-full items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium',
          'transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/45',
          disabled && 'cursor-not-allowed opacity-50 hover:bg-white',
          selectedItem ? 'text-neutral-800' : 'text-neutral-500',
        )}
      >
        <span className="min-w-0 flex-1 truncate text-left">{triggerLabel}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-neutral-500 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {contained ? listbox : typeof document !== 'undefined' ? createPortal(listbox, document.body) : listbox}
    </div>
  )
}

export function FadeSelect(props) {
  return <Select {...props} motion="fade" />
}
export function ScaleSelect(props) {
  return <Select {...props} motion="scale" />
}
export function SlideDownSelect(props) {
  return <Select {...props} motion="slideDown" />
}
export function SlideUpSelect(props) {
  return <Select {...props} motion="slideUp" />
}
export function BlurSelect(props) {
  return <Select {...props} motion="blur" />
}
export function PopSelect(props) {
  return <Select {...props} motion="pop" />
}
export function RiseSelect(props) {
  return <Select {...props} motion="rise" />
}
export function WipeSelect(props) {
  return <Select {...props} motion="wipe" />
}
