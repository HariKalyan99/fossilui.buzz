import { forwardRef, useEffect, useId, useRef } from 'react'
import { cn } from '../../lib/cn.js'
import { useReducedMotion } from '../../lib/motion.js'
import { INPUT_SIZE_CLASSES, INPUT_SIZES } from './constants.js'

const SHAKE_KEYFRAMES = [
  { transform: 'translateX(0)' },
  { transform: 'translateX(-6px)' },
  { transform: 'translateX(5px)' },
  { transform: 'translateX(-3px)' },
  { transform: 'translateX(2px)' },
  { transform: 'translateX(0)' },
]

/** Shakes the field once whenever a new error appears. */
function useErrorShake(ref, error, reduceMotion) {
  const previous = useRef(error)

  useEffect(() => {
    const was = previous.current
    previous.current = error
    if (!error || error === was || reduceMotion) return
    ref.current?.animate?.(SHAKE_KEYFRAMES, { duration: 380, easing: 'ease-out' })
  }, [ref, error, reduceMotion])
}

/**
 * @typedef {import('react').InputHTMLAttributes<HTMLInputElement> & {
 *   label?: import('react').ReactNode
 *   helperText?: import('react').ReactNode
 *   error?: boolean | string
 *   size?: 'sm' | 'md' | 'lg'
 *   icon?: import('react').ReactNode
 *   inputClassName?: string
 * }} FossilInputProps
 */

/**
 * Factory for animated inputs with shared label, helper text, and error handling.
 *
 * @param {object} config
 * @param {string} config.displayName
 * @param {boolean} [config.outerLabel] render the label above the field
 * @param {(field: object) => import('react').ReactNode} config.renderField
 */
export function createAnimatedInput({ displayName, outerLabel = true, renderField }) {
  const Component = forwardRef(function AnimatedInput(props, ref) {
    const {
      label,
      helperText,
      error,
      size = 'md',
      icon,
      className,
      style,
      inputClassName,
      id: idProp,
      disabled,
      ...nativeProps
    } = props

    const generatedId = useId()
    const id = idProp ?? generatedId
    const messageId = `${id}-message`
    const rootRef = useRef(null)
    const reduceMotion = useReducedMotion()
    useErrorShake(rootRef, error, reduceMotion)

    const invalid = Boolean(error)
    const message = typeof error === 'string' && error ? error : helperText
    const safeSize = INPUT_SIZES.includes(size) ? size : 'md'

    const field = {
      id,
      label,
      icon,
      invalid,
      disabled,
      size: safeSize,
      heightClass: INPUT_SIZE_CLASSES[safeSize],
      inputClassName,
      inputProps: {
        ...nativeProps,
        id,
        ref,
        disabled,
        'aria-invalid': invalid || undefined,
        'aria-describedby': message ? messageId : undefined,
      },
    }

    return (
      <div
        ref={rootRef}
        className={cn('relative w-full min-w-0', disabled && 'opacity-60', className)}
        style={style}
      >
        {outerLabel && label ? (
          <label htmlFor={id} className="mb-1.5 block text-[12.5px] font-medium text-neutral-700">
            {label}
          </label>
        ) : null}
        {renderField(field)}
        {message ? (
          <p
            id={messageId}
            className={cn('mt-1.5 text-[12px] leading-snug', invalid ? 'text-rose-600' : 'text-neutral-500')}
          >
            {message}
          </p>
        ) : null}
      </div>
    )
  })
  Component.displayName = displayName
  return Component
}

export function FieldIcon({ icon, className }) {
  if (!icon) return null
  return (
    <span aria-hidden className={cn('relative z-[1] mr-2 inline-flex shrink-0 text-neutral-400 [&_svg]:h-4 [&_svg]:w-4', className)}>
      {icon}
    </span>
  )
}
