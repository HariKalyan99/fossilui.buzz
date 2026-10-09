import { useEffect, useRef } from 'react'
import { cn } from '../lib/cn.js'
import { INPUT_BASE } from './shared/constants.js'
import { FieldIcon, createAnimatedInput } from './shared/createAnimatedInput.jsx'

const RING_GRADIENTS = {
  default: 'linear-gradient(90deg, #6366f1, #d946ef, #f59e0b, #6366f1)',
  invalid: 'linear-gradient(90deg, #f43f5e, #fb923c, #f43f5e)',
}

/** Cuts the gradient down to a ring the width of the padding, so it sits exactly on the border. */
const RING_MASK = {
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
}

/** Gradient ring that fades in on focus and keeps flowing around the field while focused. */
function GradientRing({ invalid }) {
  const ringRef = useRef(null)

  useEffect(() => {
    const ring = ringRef.current
    const host = ring?.parentElement
    if (!ring || !host || typeof ring.animate !== 'function') return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    let flow = null
    const start = () => {
      flow ??= ring.animate(
        [{ backgroundPosition: '0% 50%' }, { backgroundPosition: '200% 50%' }],
        { duration: 3200, iterations: Infinity },
      )
    }
    const stop = () => {
      flow?.cancel()
      flow = null
    }

    host.addEventListener('focusin', start)
    host.addEventListener('focusout', stop)
    return () => {
      stop()
      host.removeEventListener('focusin', start)
      host.removeEventListener('focusout', stop)
    }
  }, [])

  return (
    <span
      ref={ringRef}
      aria-hidden
      className={cn(
        'pointer-events-none absolute -inset-px rounded-[inherit] p-[1.5px] opacity-0',
        'transition-opacity duration-300 ease-out group-focus-within/input:opacity-100 motion-reduce:transition-none',
      )}
      style={{
        ...RING_MASK,
        backgroundImage: invalid ? RING_GRADIENTS.invalid : RING_GRADIENTS.default,
        backgroundSize: '200% 100%',
      }}
    />
  )
}

/** A multi-color gradient border fades in and flows around the edge on focus. */
export const GradientBorderInput = createAnimatedInput({
  displayName: 'GradientBorderInput',
  renderField: ({ icon, invalid, heightClass, inputClassName, inputProps }) => (
    <div
      className={cn(
        'group/input relative flex w-full items-center rounded-lg border bg-white px-3',
        'transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none',
        invalid
          ? 'border-rose-300 focus-within:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]'
          : 'border-neutral-200 hover:border-neutral-300 focus-within:shadow-[0_0_0_4px_rgba(168,85,247,0.1)]',
        heightClass,
      )}
    >
      <GradientRing invalid={invalid} />
      <FieldIcon icon={icon} />
      <input {...inputProps} className={cn(INPUT_BASE, inputClassName)} />
    </div>
  ),
})
