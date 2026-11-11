import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { splitMotionProps, motionTimingStyle, presenceMs } from '../lib/animationTiming.js'
import { computeFloatingPosition } from '../lib/floatingPosition.js'
import { cn } from '../lib/cn.js'
import { overlayMotionClasses, OVERLAY_DURATION } from '../lib/overlayMotion.js'
import { usePresence, useReducedMotion } from '../lib/motion.js'

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect

export const TOOLTIP_MOTIONS = ['fade', 'scale', 'slide', 'rise', 'blur', 'pop', 'grow', 'lift']
export const TOOLTIP_SIDES = ['top', 'bottom', 'left', 'right']

/**
 * @param {object} props
 * @param {typeof TOOLTIP_MOTIONS[number]} [props.motion]
 * @param {import('react').ReactNode} [props.content]
 * @param {import('react').ReactElement} props.children
 * @param {'top' | 'bottom' | 'left' | 'right'} [props.side]
 * @param {number} [props.delayDuration]
 * @param {number} [props.duration] Entrance/exit duration in ms.
 * @param {string} [props.easing] CSS easing for the tip transition.
 * @param {number} [props.delay] Delay before the entrance transition starts, in ms.
 * @param {boolean} [props.contained]
 */
export function Tooltip(props) {
  const { rest, timing, style: motionStyle } = splitMotionProps(props)
  const {
    motion = 'fade',
    content,
    children,
    side = 'top',
    delayDuration = 400,
    contained = false,
    className,
    ...dom
  } = rest

  const resolved = TOOLTIP_MOTIONS.includes(motion) ? motion : 'fade'
  const reduceMotion = useReducedMotion()
  const exitMs = reduceMotion ? 0 : presenceMs(timing.duration, timing.delay, OVERLAY_DURATION)
  const motionClasses = overlayMotionClasses(resolved, 'tooltip')
  // Timing vars must live on the tip: portaled tips do not inherit from the trigger root.
  const timingStyle = motionTimingStyle(timing)

  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const tipRef = useRef(null)
  const tipId = useId()
  const showTimer = useRef(0)
  const [open, setOpen] = useState(false)
  const { mounted, visible } = usePresence(open, exitMs)
  const [coords, setCoords] = useState({ top: 0, left: 0, strategy: 'fixed' })

  const measure = useCallback(() => {
    const trigger = triggerRef.current
    const tip = tipRef.current
    if (!trigger || !tip) return
    const triggerRect = trigger.getBoundingClientRect()
    const tipRect = tip.getBoundingClientRect()
    const containerRect = contained ? rootRef.current?.getBoundingClientRect() ?? null : null
    setCoords(
      computeFloatingPosition(triggerRect, { width: tipRect.width, height: tipRect.height }, {
        side,
        align: 'center',
        offset: 8,
        contained,
        containerRect,
      }),
    )
  }, [contained, side])

  useIsoLayout(() => {
    if (!mounted) return
    measure()
  }, [mounted, measure, visible, content, side])

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

  const show = () => {
    clearTimeout(showTimer.current)
    if (reduceMotion) {
      setOpen(true)
      return
    }
    showTimer.current = window.setTimeout(() => setOpen(true), delayDuration)
  }

  const hide = () => {
    clearTimeout(showTimer.current)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      const root = rootRef.current
      const tip = tipRef.current
      if (root?.contains(event.target) || tip?.contains(event.target)) return
      hide()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  useEffect(() => () => clearTimeout(showTimer.current), [])

  const tip = mounted ? (
    <div
      ref={tipRef}
      id={tipId}
      role="tooltip"
      data-motion={resolved}
      style={{
        ...timingStyle,
        position: coords.strategy,
        top: coords.top,
        left: coords.left,
        zIndex: contained ? 30 : 9999,
      }}
      className={cn(
        'pointer-events-none max-w-[min(16rem,calc(100vw-1rem))] rounded-lg border border-neutral-200 bg-neutral-900 px-2.5 py-1.5 text-[12px] font-medium leading-snug text-white shadow-lg',
        motionClasses.transition,
        visible ? motionClasses.open : motionClasses.closed,
        className,
      )}
    >
      {content}
    </div>
  ) : null

  const child = isValidElement(children)
    ? cloneElement(children, {
        ref: (node) => {
          triggerRef.current = node
          const { ref } = children
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        },
        'aria-describedby': open ? tipId : undefined,
        onMouseEnter: (event) => {
          children.props.onMouseEnter?.(event)
          show()
        },
        onMouseLeave: (event) => {
          children.props.onMouseLeave?.(event)
          hide()
        },
        onPointerEnter: (event) => {
          children.props.onPointerEnter?.(event)
          if (event.pointerType === 'mouse') show()
        },
        onPointerLeave: (event) => {
          children.props.onPointerLeave?.(event)
          if (event.pointerType === 'mouse') hide()
        },
        onFocus: (event) => {
          children.props.onFocus?.(event)
          show()
        },
        onBlur: (event) => {
          children.props.onBlur?.(event)
          hide()
        },
        onPointerDown: (event) => {
          children.props.onPointerDown?.(event)
          if (event.pointerType !== 'mouse') {
            setOpen((v) => !v)
          }
        },
      })
    : children

  return (
    <span
      ref={rootRef}
      className={cn('inline-flex min-w-0 max-w-full', className)}
      style={{ ...motionStyle, ...dom.style }}
      data-motion={resolved}
      {...dom}
    >
      {child}
      {contained ? tip : typeof document !== 'undefined' ? createPortal(tip, document.body) : tip}
    </span>
  )
}

export function FadeTooltip(props) {
  return <Tooltip {...props} motion="fade" />
}
export function ScaleTooltip(props) {
  return <Tooltip {...props} motion="scale" />
}
export function SlideTooltip(props) {
  return <Tooltip {...props} motion="slide" />
}
export function RiseTooltip(props) {
  return <Tooltip {...props} motion="rise" />
}
export function BlurTooltip(props) {
  return <Tooltip {...props} motion="blur" />
}
export function PopTooltip(props) {
  return <Tooltip {...props} motion="pop" />
}
export function GrowTooltip(props) {
  return <Tooltip {...props} motion="grow" />
}
export function LiftTooltip(props) {
  return <Tooltip {...props} motion="lift" />
}
