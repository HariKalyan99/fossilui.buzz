import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { TONE_STYLES } from '../feedback/tones.js'
import { cn } from '../lib/cn.js'
import { motionTimingStyle, presenceMs } from '../lib/animationTiming.js'
import { TRANSITION_MOTION, usePresence, useReducedMotion } from '../lib/motion.js'
import { normalizeToast, registerToastProvider, TOAST_MOTIONS } from './store.js'

const MAX_TOASTS = 5

/** Standard viewport anchors — same set as Sonner / react-hot-toast. */
export const TOAST_POSITIONS = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
]

/**
 * Insets respect notch / home-indicator safe areas on phones.
 * Tailwind v4 keeps commas in these nested arbitrary values (no spaces after commas).
 */
const POSITION_CLASSES = {
  'top-left':
    'top-[max(0.75rem,env(safe-area-inset-top,0px))] left-[max(0.75rem,env(safe-area-inset-left,0px))] sm:top-[max(1rem,env(safe-area-inset-top,0px))] sm:left-[max(1rem,env(safe-area-inset-left,0px))]',
  'top-center':
    'top-[max(0.75rem,env(safe-area-inset-top,0px))] left-1/2 -translate-x-1/2 sm:top-[max(1rem,env(safe-area-inset-top,0px))]',
  'top-right':
    'top-[max(0.75rem,env(safe-area-inset-top,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))] sm:top-[max(1rem,env(safe-area-inset-top,0px))] sm:right-[max(1rem,env(safe-area-inset-right,0px))]',
  'bottom-left':
    'bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] left-[max(0.75rem,env(safe-area-inset-left,0px))] sm:bottom-[max(1rem,env(safe-area-inset-bottom,0px))] sm:left-[max(1rem,env(safe-area-inset-left,0px))]',
  'bottom-center':
    'bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 sm:bottom-[max(1rem,env(safe-area-inset-bottom,0px))]',
  'bottom-right':
    'bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))] sm:bottom-[max(1rem,env(safe-area-inset-bottom,0px))] sm:right-[max(1rem,env(safe-area-inset-right,0px))]',
}

function isBottomPosition(position) {
  return position.startsWith('bottom')
}

function isLeftPosition(position) {
  return position.endsWith('left')
}

/** Enter/exit classes for each provider motion. Stack only changes the layout. */
function toastEnter(motion, position) {
  const slideHidden = isLeftPosition(position)
    ? 'opacity-0 -translate-x-6'
    : 'opacity-0 translate-x-6'
  const map = {
    slide: { hidden: slideHidden, shown: 'opacity-100 translate-x-0' },
    rise: { hidden: 'opacity-0 translate-y-4', shown: 'opacity-100 translate-y-0' },
    drop: { hidden: 'opacity-0 -translate-y-4', shown: 'opacity-100 translate-y-0' },
    fade: { hidden: 'opacity-0', shown: 'opacity-100' },
    scale: { hidden: 'opacity-0 scale-95', shown: 'opacity-100 scale-100' },
    pop: { hidden: 'opacity-0 scale-90', shown: 'opacity-100 scale-100' },
    blur: { hidden: 'opacity-0 blur-sm', shown: 'opacity-100 blur-none' },
    stack: { hidden: 'opacity-0', shown: 'opacity-100' },
  }
  return map[motion] ?? map.slide
}

const ToastContext = createContext(null)

/** Imperative toast helpers bound to the nearest ToastProvider. */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used inside <ToastProvider>.')
  }
  return context
}

function ToastCard({ item, motion, position, depth, onClose }) {
  const reduceMotion = useReducedMotion()
  const enterFallback = motion === 'pop' ? 420 : 300
  const exitMs = presenceMs(item.enterDuration, item.delay, enterFallback)
  const { mounted, visible } = usePresence(item.open, reduceMotion ? 0 : exitMs)
  const tone = TONE_STYLES[item.tone] ?? TONE_STYLES.info
  const ToneIcon = tone.Icon
  const barRef = useRef(null)
  const animRef = useRef(null)
  const closeRef = useRef(onClose)
  const bottom = isBottomPosition(position)

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!item.open) animRef.current?.cancel()
  }, [item.open])

  useEffect(() => {
    if (!item.duration || reduceMotion) {
      if (!item.duration) return undefined
      const timer = setTimeout(() => closeRef.current(item.id), item.duration)
      return () => clearTimeout(timer)
    }
    const node = barRef.current
    if (!node) return undefined
    const animation = node.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], {
      duration: item.duration,
      easing: 'linear',
      fill: 'forwards',
    })
    animRef.current = animation
    animation.onfinish = () => closeRef.current(item.id)
    return () => animation.cancel()
  }, [item.duration, item.id, reduceMotion])

  if (!mounted) return null

  const stacked = motion === 'stack'
  const enter = toastEnter(motion, position)
  const enterHidden = reduceMotion ? 'opacity-0' : enter.hidden
  const enterShown = reduceMotion ? 'opacity-100' : enter.shown
  const stackOffset = bottom ? -depth * 18 : depth * 18

  return (
    <li
      className={cn(
        stacked &&
          cn(
            'col-start-1 row-start-1 w-full transition-[transform,opacity] delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,300ms)] ease-[var(--fossil-ease,var(--default-transition-timing-function))]',
            bottom ? 'origin-bottom' : 'origin-top',
          ),
      )}
      style={{
        ...motionTimingStyle({ duration: item.enterDuration, easing: item.easing, delay: item.delay }),
        ...(stacked
          ? {
              zIndex: 20 - depth,
              transform: `translateY(${stackOffset}px) scale(${Math.max(0.88, 1 - depth * 0.045)})`,
              opacity: depth > 2 ? 0 : undefined,
            }
          : null),
      }}
    >
      <div
        className={cn(
          'pointer-events-auto w-full rounded-xl shadow-[0_4px_14px_-4px_rgba(15,23,42,0.14)]',
          TRANSITION_MOTION,
          motion === 'pop'
            ? 'delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,420ms)] ease-[var(--fossil-ease,var(--fossil-ease-spring))]'
            : 'delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,300ms)] ease-[var(--fossil-ease,var(--fossil-ease-out))]',
          'motion-reduce:transition-none',
          visible ? enterShown : enterHidden,
          depth > 0 && 'pointer-events-none',
        )}
      >
        <div
          role={tone.role}
          onPointerEnter={() => animRef.current?.pause()}
          onPointerLeave={() => animRef.current?.play()}
          className={cn(
            'relative flex w-full gap-3 overflow-hidden rounded-xl border px-3.5 py-3 text-left',
            tone.root,
          )}
        >
          <span className={cn('mt-0.5 inline-flex shrink-0', tone.icon)} aria-hidden>
            <ToneIcon className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1 pr-6">
            {item.title ? <p className="text-[13.5px] font-semibold leading-snug">{item.title}</p> : null}
            {item.description ? (
              <p className={cn('text-[13px] leading-relaxed opacity-80', item.title && 'mt-0.5')}>{item.description}</p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => onClose(item.id)}
            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-md text-current opacity-60 transition-[opacity,background-color,rotate] duration-200 hover:rotate-90 hover:bg-black/5 hover:opacity-100"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          {item.duration > 0 && !reduceMotion && depth === 0 ? (
            <span ref={barRef} aria-hidden className={cn('absolute inset-x-0 bottom-0 h-0.5 origin-left bg-current', tone.icon)} />
          ) : null}
        </div>
      </div>
    </li>
  )
}

/**
 * @param {{
 *   motion?: 'slide' | 'rise' | 'drop' | 'fade' | 'scale' | 'pop' | 'blur' | 'stack'
 *   position?: typeof TOAST_POSITIONS[number]
 *   contained?: boolean
 *   children?: import('react').ReactNode
 *   className?: string
 * }} props
 */
export function ToastProvider({
  motion = 'slide',
  position = 'top-right',
  contained = false,
  children,
  className,
}) {
  const safeMotion = TOAST_MOTIONS.includes(motion) ? motion : 'slide'
  const safePosition = TOAST_POSITIONS.includes(position) ? position : 'top-right'
  const bottom = isBottomPosition(safePosition)
  const reduceMotion = useReducedMotion()
  const [items, setItems] = useState([])
  const itemsRef = useRef(items)
  itemsRef.current = items

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const close = useCallback(
    (id) => {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, open: false } : item)))
      const item = itemsRef.current.find((entry) => entry.id === id)
      const wait = reduceMotion ? 0 : presenceMs(item?.enterDuration, item?.delay, safeMotion === 'pop' ? 420 : 300)
      window.setTimeout(() => remove(id), wait)
    },
    [reduceMotion, remove, safeMotion],
  )

  const push = useCallback((input) => {
    const item = input?.id ? input : normalizeToast(input)
    setItems((prev) => [item, ...prev].slice(0, MAX_TOASTS))
    return item.id
  }, [])

  const dismiss = useCallback(
    (id) => {
      if (id) {
        close(id)
        return
      }
      itemsRef.current.forEach((item) => close(item.id))
    },
    [close],
  )

  useEffect(() => registerToastProvider({ contained, push, dismiss }), [contained, push, dismiss])

  const api = useMemo(() => ({ toast: push, dismiss }), [push, dismiss])

  const viewport = (
    <div
      className={cn(
        'pointer-events-none z-[70] flex w-full',
        contained
          ? 'absolute z-20 max-w-[min(22rem,calc(100%-1.5rem))]'
          : 'fixed max-w-[min(22rem,calc(100vw-1.5rem-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px)))]',
        POSITION_CLASSES[safePosition],
        className,
      )}
    >
      <ol
        aria-label="Notifications"
        className={cn(
          'w-full overscroll-contain',
          safeMotion === 'stack'
            ? 'grid'
            : cn(
                'flex gap-2 overflow-y-auto',
                bottom ? 'flex-col-reverse' : 'flex-col',
                contained
                  ? 'max-h-[min(12rem,calc(100%-5rem))]'
                  : 'max-h-[min(70vh,calc(100dvh-2rem-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px)))]',
              ),
        )}
      >
        {items.map((item, index) => (
          <ToastCard
            key={item.id}
            item={item}
            motion={safeMotion}
            position={safePosition}
            depth={safeMotion === 'stack' ? index : 0}
            onClose={close}
          />
        ))}
      </ol>
    </div>
  )

  const layer =
    contained || typeof document === 'undefined' ? viewport : createPortal(viewport, document.body)

  return (
    <ToastContext.Provider value={api}>
      {children}
      {layer}
    </ToastContext.Provider>
  )
}

export { TOAST_MOTIONS }
