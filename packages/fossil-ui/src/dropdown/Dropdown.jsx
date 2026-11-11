import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'
import { splitMotionProps, motionTimingStyle, presenceMs } from '../lib/animationTiming.js'
import { computeFloatingPosition } from '../lib/floatingPosition.js'
import { cn } from '../lib/cn.js'
import { overlayMotionClasses, OVERLAY_DURATION } from '../lib/overlayMotion.js'
import { usePresence, useReducedMotion } from '../lib/motion.js'

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect

export const DROPDOWN_MOTIONS = ['fade', 'scale', 'slideDown', 'slideUp', 'blur', 'pop', 'rise', 'wipe']
export const DROPDOWN_ALIGNMENTS = ['start', 'center', 'end']
export const DROPDOWN_SIDES = ['bottom', 'top']

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
 * @param {object} props
 * @param {typeof DROPDOWN_MOTIONS[number]} [props.motion]
 * @param {Array<{ value: string, label: import('react').ReactNode, disabled?: boolean, destructive?: boolean }>} [props.items]
 * @param {import('react').ReactNode} [props.label]
 * @param {boolean} [props.open]
 * @param {boolean} [props.defaultOpen]
 * @param {(open: boolean) => void} [props.onOpenChange]
 * @param {'start' | 'center' | 'end'} [props.align]
 * @param {'bottom' | 'top'} [props.side]
 * @param {number} [props.duration] Entrance/exit duration in ms.
 * @param {string} [props.easing] CSS easing for the panel transition.
 * @param {number} [props.delay] Delay before the entrance transition starts, in ms.
 * @param {boolean} [props.contained] Keep the menu inside the root for previews.
 */
export function Dropdown(props) {
  const { rest, timing, style: motionStyle } = splitMotionProps(props)
  const {
    motion = 'fade',
    items = [],
    label = 'Actions',
    open,
    defaultOpen = false,
    onOpenChange,
    align = 'start',
    side = 'bottom',
    contained = false,
    className,
    onSelect,
    ...dom
  } = rest

  const resolved = DROPDOWN_MOTIONS.includes(motion) ? motion : 'fade'
  const reduceMotion = useReducedMotion()
  const exitMs = reduceMotion ? 0 : presenceMs(timing.duration, timing.delay, OVERLAY_DURATION)
  const [isOpen, setIsOpen] = useControllable(open, defaultOpen, onOpenChange)
  const { mounted, visible } = usePresence(isOpen, exitMs)
  const motionClasses = overlayMotionClasses(resolved, 'dropdown')
  // Timing vars must live on the menu: portaled menus do not inherit from the trigger root.
  const timingStyle = motionTimingStyle(timing)

  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const menuId = useId()
  const [activeIndex, setActiveIndex] = useState(-1)
  const [coords, setCoords] = useState({ top: 0, left: 0, strategy: 'fixed' })

  const enabledItems = items.filter((item) => !item.disabled)

  const measure = useCallback(() => {
    const trigger = triggerRef.current
    const menu = menuRef.current
    if (!trigger || !menu) return
    const triggerRect = trigger.getBoundingClientRect()
    const menuRect = menu.getBoundingClientRect()
    const containerRect = contained ? rootRef.current?.getBoundingClientRect() ?? null : null
    setCoords(
      computeFloatingPosition(triggerRect, { width: menuRect.width, height: menuRect.height }, {
        side,
        align,
        contained,
        containerRect,
      }),
    )
  }, [align, contained, side])

  useIsoLayout(() => {
    if (!mounted) return
    measure()
  }, [mounted, measure, visible, items.length])

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
      const menu = menuRef.current
      if (root?.contains(event.target) || menu?.contains(event.target)) return
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
        onSelect?.(item.value, item)
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, enabledItems, activeIndex, onSelect, setIsOpen])

  const toggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) setActiveIndex(-1)
  }

  const menu = mounted ? (
    <div
      ref={menuRef}
      id={menuId}
      role="menu"
      aria-orientation="vertical"
      data-motion={resolved}
      style={{
        ...timingStyle,
        position: coords.strategy,
        top: coords.top,
        left: coords.left,
        zIndex: contained ? 30 : 9999,
      }}
      className={cn(
        'min-w-[11rem] max-w-[min(18rem,calc(100vw-1rem))] rounded-xl border border-neutral-200 bg-white p-1 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.45)]',
        motionClasses.transition,
        visible ? motionClasses.open : motionClasses.closed,
      )}
    >
      {items.map((item) => {
        const enabledIndex = enabledItems.indexOf(item)
        const active = enabledIndex === activeIndex
        return (
          <button
            key={item.value}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            tabIndex={-1}
            data-highlighted={active ? '' : undefined}
            aria-disabled={item.disabled || undefined}
            onPointerEnter={() => {
              if (!item.disabled && enabledIndex >= 0) setActiveIndex(enabledIndex)
            }}
            onClick={() => {
              if (item.disabled) return
              onSelect?.(item.value, item)
              setIsOpen(false)
            }}
            className={cn(
              'flex w-full min-h-9 items-center rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40',
              item.disabled && 'cursor-not-allowed opacity-40',
              item.destructive
                ? cn(
                    'text-rose-600',
                    'hover:bg-rose-50',
                    active && 'bg-rose-50 ring-1 ring-inset ring-rose-200/80',
                  )
                : cn(
                    'text-neutral-800',
                    'hover:bg-neutral-100',
                    active && 'bg-neutral-100 ring-1 ring-inset ring-neutral-200/90',
                  ),
            )}
          >
            {item.label}
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
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={toggle}
        className={cn(
          'inline-flex h-9 max-w-full items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium text-neutral-800',
          'transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/45',
        )}
      >
        <span className="truncate">{label}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-neutral-500 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {contained ? menu : typeof document !== 'undefined' ? createPortal(menu, document.body) : menu}
    </div>
  )
}

export function FadeDropdown(props) {
  return <Dropdown {...props} motion="fade" />
}
export function ScaleDropdown(props) {
  return <Dropdown {...props} motion="scale" />
}
export function SlideDownDropdown(props) {
  return <Dropdown {...props} motion="slideDown" />
}
export function SlideUpDropdown(props) {
  return <Dropdown {...props} motion="slideUp" />
}
export function BlurDropdown(props) {
  return <Dropdown {...props} motion="blur" />
}
export function PopDropdown(props) {
  return <Dropdown {...props} motion="pop" />
}
export function RiseDropdown(props) {
  return <Dropdown {...props} motion="rise" />
}
export function WipeDropdown(props) {
  return <Dropdown {...props} motion="wipe" />
}
