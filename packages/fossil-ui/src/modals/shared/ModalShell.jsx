import { forwardRef, useCallback, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../lib/cn.js'
import { usePresence, useReducedMotion } from '../../lib/motion.js'
import {
  MODAL_DURATION,
  MODAL_LAYOUTS,
  MODAL_MOTION_STYLES,
  MODAL_SIZE_CLASSES,
  MODAL_SIZES,
} from './constants.js'

const ACTION_BUTTON =
  'inline-flex h-9 items-center justify-center rounded-lg px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'

/**
 * @typedef {import('react').HTMLAttributes<HTMLDivElement> & {
 *   open?: boolean
 *   onClose?: () => void
 *   onConfirm?: () => void
 *   title?: import('react').ReactNode
 *   description?: import('react').ReactNode
 *   confirmLabel?: string
 *   cancelLabel?: string
 *   size?: 'sm' | 'md' | 'lg'
 *   tone?: 'default' | 'danger'
 *   closeOnOverlay?: boolean
 *   showClose?: boolean
 *   contained?: boolean
 *   overlayClassName?: string
 * }} FossilModalProps
 */

export const ModalShell = forwardRef(function ModalShell(
  {
    motion = 'scaleFade',
    open = false,
    onClose,
    onConfirm,
    title,
    description,
    children,
    confirmLabel,
    cancelLabel,
    size = 'md',
    tone = 'default',
    closeOnOverlay = true,
    showClose = true,
    contained = false,
    className,
    overlayClassName,
    ...rest
  },
  ref,
) {
  const style = MODAL_MOTION_STYLES[motion] ?? MODAL_MOTION_STYLES.scaleFade
  const layout = MODAL_LAYOUTS[style.layout]
  const reduceMotion = useReducedMotion()
  const { mounted, visible } = usePresence(open, reduceMotion ? 0 : MODAL_DURATION)
  const panelRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onCloseRef.current?.()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Contained previews must not steal focus or lock page scroll.
  useEffect(() => {
    if (!open || contained) return undefined
    const previous = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const frame = requestAnimationFrame(() => panelRef.current?.focus())
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = overflow
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [open, contained])

  const setPanelRef = useCallback(
    (node) => {
      panelRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  if (!mounted) return null

  const close = () => onCloseRef.current?.()
  const safeSize = MODAL_SIZES.includes(size) ? size : 'md'

  const content = (
    <div className={cn(contained ? 'absolute' : 'fixed', 'inset-0 z-50 flex', layout.wrapper)}>
      <div
        aria-hidden
        onClick={closeOnOverlay ? close : undefined}
        className={cn(
          'absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none',
          visible ? 'opacity-100' : 'opacity-0',
          overlayClassName,
        )}
      />
      <div
        ref={setPanelRef}
        role="dialog"
        aria-modal={contained ? undefined : true}
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(
          'relative border border-neutral-200 bg-white p-5 text-left shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] outline-none sm:p-6',
          layout.panel,
          style.layout !== 'right' && MODAL_SIZE_CLASSES[safeSize],
          style.transition,
          'motion-reduce:transition-none',
          visible ? style.shown : style.hidden,
          className,
        )}
        {...rest}
      >
        {showClose ? (
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition-[color,background-color,rotate] duration-200 hover:rotate-90 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        ) : null}

        {title ? (
          <h2 id={titleId} className="pr-8 text-[17px] font-semibold tracking-tight text-neutral-900">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p id={descriptionId} className="mt-1.5 text-[13.5px] leading-relaxed text-neutral-600">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-4">{children}</div> : null}

        {confirmLabel || cancelLabel ? (
          <div
            className={cn(
              'mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
              style.layout === 'right' && 'mt-auto pt-6',
            )}
          >
            {cancelLabel ? (
              <button
                type="button"
                onClick={close}
                className={cn(ACTION_BUTTON, 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50')}
              >
                {cancelLabel}
              </button>
            ) : null}
            {confirmLabel ? (
              <button
                type="button"
                onClick={onConfirm ?? close}
                className={cn(
                  ACTION_BUTTON,
                  tone === 'danger'
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800',
                )}
              >
                {confirmLabel}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )

  if (contained || typeof document === 'undefined') return content
  return createPortal(content, document.body)
})
