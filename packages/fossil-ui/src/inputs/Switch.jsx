import { forwardRef, useId } from 'react'
import { cn } from '../lib/cn.js'

export const Switch = forwardRef(function Switch(
  { className, label, id, checked, defaultChecked, onChange, disabled, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id || autoId

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-center gap-2.5',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className,
      )}
    >
      <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          aria-hidden
          className={cn(
            'absolute inset-0 rounded-full bg-neutral-200 transition-colors duration-200',
            'peer-checked:bg-indigo-600 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500/30',
          )}
        />
        <span
          aria-hidden
          className={cn(
            'absolute left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200',
            'peer-checked:translate-x-4',
          )}
        />
      </span>
      {label ? <span className="text-[13px] text-neutral-700">{label}</span> : null}
    </label>
  )
})
