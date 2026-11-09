import { useId, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../lib/cn.js'
import { splitMotionProps } from '../lib/animationTiming.js'
import { TOGGLE_COLORS, toggleAccent, toggleColorTokens } from '../toggles/colors.js'

export const CHECKBOX_MOTIONS = ['check', 'pop']

const TIMING =
  'delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,260ms)] ease-[var(--fossil-ease,var(--fossil-ease-out))] motion-reduce:transition-none'

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
 * @param {typeof CHECKBOX_MOTIONS[number]} [props.motion]
 * @param {typeof TOGGLE_COLORS[number]} [props.color]
 * @param {boolean} [props.checked]
 * @param {boolean} [props.defaultChecked]
 * @param {(checked: boolean) => void} [props.onCheckedChange]
 * @param {boolean} [props.disabled]
 * @param {import('react').ReactNode} [props.label]
 */
export function Checkbox(props) {
  const { rest, style } = splitMotionProps(props)
  const {
    motion = 'check',
    color,
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    label,
    className,
    id: idProp,
    ...dom
  } = rest

  const resolved = CHECKBOX_MOTIONS.includes(motion) ? motion : 'check'
  const accent = toggleColorTokens(color, resolved)
  const [on, setOn] = useControllable(checked, defaultChecked, onCheckedChange)
  const reactId = useId()
  const id = idProp ?? reactId

  return (
    <label
      className={cn(
        'inline-flex max-w-full cursor-pointer items-center gap-2.5',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      style={style}
      data-motion={resolved}
      data-color={toggleAccent(color, resolved)}
      {...dom}
    >
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={on}
        disabled={disabled}
        onClick={() => setOn(!on)}
        className={cn(
          'relative inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden border',
          'focus-visible:outline-none focus-visible:ring-2',
          accent.focusRing,
          TIMING,
          'transition-[background-color,border-color,transform,box-shadow]',
          resolved === 'pop' ? 'rounded-full' : 'rounded-md',
          on
            ? cn(
                accent.track,
                'text-white',
                resolved === 'pop' && cn('scale-100', accent.softRing),
              )
            : cn(
                'border-neutral-300 bg-white text-transparent',
                resolved === 'pop' && 'scale-90',
              ),
          resolved === 'pop' && 'ease-[var(--fossil-ease,var(--fossil-ease-spring))]',
        )}
      >
        <Check
          aria-hidden
          strokeWidth={2.75}
          className={cn('h-3.5 w-3.5', TIMING, 'transition-[opacity,transform,filter,clip-path]', markClass(resolved, on))}
        />
      </button>
      {label ? (
        <span className="min-w-0 self-center text-[13px] font-medium leading-none text-neutral-800">
          {label}
        </span>
      ) : null}
    </label>
  )
}

function markClass(motion, on) {
  switch (motion) {
    case 'pop':
      return on ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
    case 'check':
    default:
      return on ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
  }
}

export function CheckCheckbox(props) {
  return <Checkbox {...props} motion="check" />
}
export function PopCheckbox(props) {
  return <Checkbox {...props} motion="pop" />
}
