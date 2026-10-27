import { forwardRef, useCallback, useId, useLayoutEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { FEEDBACK_TONES, TONE_STYLES } from '../feedback/tones.js'
import { cn } from '../lib/cn.js'
import { usePresence, useReducedMotion } from '../lib/motion.js'
import {
  ALERT_DIRECTIONS,
  ALERT_FILL_MODES,
  ALERT_KEYFRAMES,
  ALERT_MOTIONS,
  ALERT_PLAY_STATES,
  playAlertAnimation,
  resolveAlertTiming,
} from './constants.js'

/**
 * @typedef {import('react').HTMLAttributes<HTMLDivElement> & {
 *   motion?: 'slide' | 'rise' | 'slideRight' | 'shake' | 'fade' | 'scale' | 'pop' | 'blur'
 *   duration?: number
 *   easing?: string
 *   delay?: number
 *   direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
 *   iterationCount?: number | 'infinite'
 *   fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
 *   playState?: 'running' | 'paused'
 *   tone?: 'info' | 'success' | 'warning' | 'error'
 *   title?: import('react').ReactNode
 *   description?: import('react').ReactNode
 *   open?: boolean
 *   onClose?: () => void
 *   dismissible?: boolean
 *   icon?: import('react').ReactNode
 * }} FossilAlertProps
 */

export const Alert = forwardRef(function Alert(
  {
    motion = 'slide',
    duration,
    easing,
    delay,
    direction,
    iterationCount,
    fillMode,
    playState,
    tone = 'info',
    title,
    description,
    children,
    open,
    onClose,
    dismissible = false,
    icon,
    className,
    ...rest
  },
  ref,
) {
  const toneStyle = TONE_STYLES[tone] ?? TONE_STYLES.info
  const reduceMotion = useReducedMotion()
  const timing = resolveAlertTiming(motion, { duration, easing, delay, direction, iterationCount, fillMode, playState })
  const isControlled = open !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState(true)
  const shown = isControlled ? open : uncontrolledOpen
  const { mounted, visible } = usePresence(Boolean(shown), reduceMotion ? 0 : timing.exitMs)
  const titleId = useId()
  const localRef = useRef(null)
  const entered = useRef(false)

  const setRef = useCallback(
    (node) => {
      localRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  useLayoutEffect(() => {
    const node = localRef.current
    if (!node) return undefined
    const frames = ALERT_KEYFRAMES[motion] ?? ALERT_KEYFRAMES.slide

    if (reduceMotion) {
      node.getAnimations().forEach((animation) => animation.cancel())
      return undefined
    }

    if (!visible) {
      if (!entered.current) {
        const hold = playAlertAnimation(
          node,
          [frames[0]],
          { ...timing, duration: 1, delay: 0, iterations: 1, fill: 'both' },
          { playState: 'paused' },
        )
        return () => hold?.cancel()
      }
      const exit = playAlertAnimation(
        node,
        [...frames].reverse(),
        { ...timing, delay: 0, iterations: 1, direction: 'normal', fill: 'both' },
        { playState: 'running' },
      )
      return () => exit?.cancel()
    }

    entered.current = true
    const enter = playAlertAnimation(node, frames, timing, { playState: timing.playState })
    return () => enter?.cancel()
  }, [
    visible,
    motion,
    reduceMotion,
    timing.duration,
    timing.easing,
    timing.delay,
    timing.direction,
    timing.iterations,
    timing.fill,
    timing.playState,
  ])

  if (!mounted) return null

  const canDismiss = dismissible || typeof onClose === 'function'
  const close = () => {
    if (!isControlled) setUncontrolledOpen(false)
    onClose?.()
  }
  const ToneIcon = toneStyle.Icon

  return (
    <div
      ref={setRef}
      role={toneStyle.role}
      aria-labelledby={title ? titleId : undefined}
      className={cn(
        'relative flex w-full gap-3 rounded-xl border px-3.5 py-3 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)]',
        toneStyle.root,
        className,
      )}
      {...rest}
    >
      <span className={cn('mt-0.5 inline-flex shrink-0', toneStyle.icon)} aria-hidden>
        {icon ?? <ToneIcon className="h-4 w-4" strokeWidth={2} />}
      </span>
      <div className={cn('min-w-0 flex-1', canDismiss && 'pr-6')}>
        {title ? (
          <p id={titleId} className="text-[13.5px] font-semibold leading-snug">
            {title}
          </p>
        ) : null}
        {description ? (
          <p className={cn('text-[13px] leading-relaxed opacity-80', title && 'mt-0.5')}>{description}</p>
        ) : null}
        {children ? <div className={cn(title || description ? 'mt-2' : undefined)}>{children}</div> : null}
      </div>
      {canDismiss ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={close}
          className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-md text-current opacity-60 transition-[opacity,background-color,rotate] duration-200 hover:rotate-90 hover:bg-black/5 hover:opacity-100"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      ) : null}
    </div>
  )
})

function namedAlert(motion) {
  const Named = forwardRef(function NamedAlert(props, ref) {
    return <Alert ref={ref} {...props} motion={motion} />
  })
  Named.displayName = `${motion[0].toUpperCase()}${motion.slice(1)}Alert`
  return Named
}

export const SlideAlert = namedAlert('slide')
export const RiseAlert = namedAlert('rise')
export const SlideRightAlert = namedAlert('slideRight')
export const ShakeAlert = namedAlert('shake')
export const FadeAlert = namedAlert('fade')
export const ScaleAlert = namedAlert('scale')
export const PopAlert = namedAlert('pop')
export const BlurAlert = namedAlert('blur')

export {
  ALERT_DIRECTIONS,
  ALERT_FILL_MODES,
  ALERT_MOTIONS,
  ALERT_PLAY_STATES,
  FEEDBACK_TONES as ALERT_TONES,
}
