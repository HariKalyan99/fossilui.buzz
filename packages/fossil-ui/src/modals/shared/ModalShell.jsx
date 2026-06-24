import { forwardRef, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/cn.js'
import { MODAL_SIZES } from './constants.js'
import { getModalMotionClasses } from './getModalMotionClasses.js'

export const ModalShell = forwardRef(function ModalShell(
  {
    open,
    onOpenChange,
    title,
    description,
    children,
    size = 'md',
    motion = 'fade',
    className,
    showClose = true,
    footer,
    ...props
  },
  ref,
) {
  const titleId = useId()
  const descriptionId = useId()
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }
    setVisible(false)
    const timer = window.setTimeout(() => setMounted(false), 220)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') onOpenChange?.(false)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onOpenChange])

  if (!mounted || typeof document === 'undefined') return null

  const motionClasses = getModalMotionClasses(motion, visible)
  const isDrawer = motion === 'drawerRight'
  const isBlur = motion === 'blurOverlay'

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex',
        motionClasses.container,
        visible ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog overlay"
        className={cn(
          'absolute inset-0',
          !isBlur && 'bg-neutral-900/35 backdrop-blur-[2px]',
          motionClasses.overlay,
        )}
        onClick={() => onOpenChange?.(false)}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          'relative w-full border border-neutral-200 bg-white',
          isDrawer ? 'p-6' : 'rounded-2xl p-6',
          'shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18),0_2px_8px_rgba(15,23,42,0.06)]',
          MODAL_SIZES[size] ?? MODAL_SIZES.md,
          motionClasses.panel,
          className,
        )}
        {...props}
      >
        {showClose ? (
          <button
            type="button"
            onClick={() => onOpenChange?.(false)}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        ) : null}
        {title ? (
          <h2 id={titleId} className="pr-8 text-[16px] font-semibold tracking-tight text-neutral-900">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p id={descriptionId} className={cn('text-[13px] leading-relaxed text-neutral-600', title && 'mt-1.5')}>
            {description}
          </p>
        ) : null}
        {children ? <div className={cn((title || description) && 'mt-4')}>{children}</div> : null}
        {footer ? <div className="mt-5 flex flex-wrap justify-end gap-2">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  )
})
