import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { TONE_STYLES } from '../feedback/tones.js'
import { cn } from '../lib/cn.js'
import { motionTimingStyle, presenceMs } from '../lib/animationTiming.js'
import { TRANSITION_MOTION, usePresence, useReducedMotion } from '../lib/motion.js'
import { normalizeToast, registerToastProvider, TOAST_MOTIONS } from './store.js'

const MAX_TOASTS = 5

/** Enter/exit classes for each provider motion. Stack only changes the layout. */
const TOAST_ENTER = {
  slide: { hidden: 'opacity-0 translate-x-6', shown: 'opacity-100 translate-x-0' },
  rise: { hidden: 'opacity-0 translate-y-4', shown: 'opacity-100 translate-y-0' },
  drop: { hidden: 'opacity-0 -translate-y-4', shown: 'opacity-100 translate-y-0' },
  fade: { hidden: 'opacity-0', shown: 'opacity-100' },
  scale: { hidden: 'opacity-0 scale-95', shown: 'opacity-100 scale-100' },
  pop: { hidden: 'opacity-0 scale-90', shown: 'opacity-100 scale-100' },
  blur: { hidden: 'opacity-0 blur-sm', shown: 'opacity-100 blur-none' },
  stack: { hidden: 'opacity-0', shown: 'opacity-100' },
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

function ToastCard({ item, motion, depth, onClose }) {
  const reduceMotion = useReducedMotion()
  const enterFallback = motion === 'pop' ? 420 : 300
  const exitMs = presenceMs(item.enterDuration, item.delay, enterFallback)
  const { mounted, visible } = usePresence(item.open, reduceMotion ? 0 : exitMs)
  const tone = TONE_STYLES[item.tone] ?? TONE_STYLES.info
  const ToneIcon = tone.Icon
  const barRef = useRef(null)
  const animRef = useRef(null)
  const closeRef = useRef(onClose)

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
  const enter = TOAST_ENTER[motion] ?? TOAST_ENTER.slide
  const enterHidden = reduceMotion ? 'opacity-0' : enter.hidden
  const enterShown = reduceMotion ? 'opacity-100' : enter.shown

  return (
    <li
      className={cn(
        stacked && 'col-start-1 row-start-1 w-full origin-top transition-[transform,opacity] delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,300ms)] ease-[var(--fossil-ease,var(--default-transition-timing-function))]',
      )}
      style={{
        ...motionTimingStyle({ duration: item.enterDuration, easing: item.easing, delay: item.delay }),
        ...(stacked
          ? {
              zIndex: 20 - depth,
              transform: `translateY(${depth * 18}px) scale(${Math.max(0.88, 1 - depth * 0.045)})`,
              opacity: depth > 2 ? 0 : undefined,
            }
          : null),
      }}
    >
      <div
        role={tone.role}
        onPointerEnter={() => animRef.current?.pause()}
        onPointerLeave={() => animRef.current?.play()}
        className={cn(
          'pointer-events-auto relative flex w-full gap-3 overflow-hidden rounded-xl border px-3.5 py-3 text-left shadow-[0_12px_32px_-16px_rgba(15,23,42,0.45)]',
          tone.root,
          TRANSITION_MOTION,
          motion === 'pop'
            ? 'delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,420ms)] ease-[var(--fossil-ease,var(--fossil-ease-spring))]'
            : 'delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,300ms)] ease-[var(--fossil-ease,var(--fossil-ease-out))]',
          'motion-reduce:transition-none',
          visible ? enterShown : enterHidden,
          depth > 0 && 'pointer-events-none',
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
    </li>
  )
}

/**
 * @param {{
 *   motion?: 'slide' | 'rise' | 'drop' | 'fade' | 'scale' | 'pop' | 'blur' | 'stack'
 *   contained?: boolean
 *   children?: import('react').ReactNode
 *   className?: string
 * }} props
 */
export function ToastProvider({ motion = 'slide', contained = false, children, className }) {
  const safeMotion = TOAST_MOTIONS.includes(motion) ? motion : 'slide'
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
        'pointer-events-none z-[70] flex w-[min(22rem,calc(100%-1.5rem))]',
        contained ? 'absolute top-3 left-3 z-20' : 'fixed top-3 right-3 sm:top-4 sm:right-4',
        className,
      )}
    >
      <ol
        aria-label="Notifications"
        className={cn(
          'w-full',
          safeMotion === 'stack' ? 'grid' : 'flex max-h-[70vh] flex-col gap-2 overflow-y-auto',
        )}
      >
        {items.map((item, index) => (
          <ToastCard
            key={item.id}
            item={item}
            motion={safeMotion}
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
