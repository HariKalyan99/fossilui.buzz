import { cn } from '../lib/cn.js'
import { INPUT_BASE } from './shared/constants.js'
import { FieldIcon, createAnimatedInput } from './shared/createAnimatedInput.jsx'

const EDGE = 'pointer-events-none absolute duration-150 ease-linear motion-reduce:transition-none'

/** An accent border draws itself around the field, edge by edge, on focus. */
export const BorderDrawInput = createAnimatedInput({
  displayName: 'BorderDrawInput',
  renderField: ({ icon, invalid, heightClass, inputClassName, inputProps }) => {
    const accent = invalid ? 'bg-rose-500' : 'bg-indigo-500'
    return (
      <div
        className={cn(
          'group/input relative flex w-full items-center border bg-white px-3',
          invalid ? 'border-rose-200' : 'border-neutral-200',
          heightClass,
        )}
      >
        <FieldIcon icon={icon} />
        <input {...inputProps} className={cn(INPUT_BASE, inputClassName)} />
        <span
          aria-hidden
          className={cn(EDGE, accent, '-left-px -top-px h-0.5 w-[calc(100%+2px)] origin-left scale-x-0 transition-transform delay-0 group-focus-within/input:scale-x-100')}
        />
        <span
          aria-hidden
          className={cn(EDGE, accent, '-right-px -top-px h-[calc(100%+2px)] w-0.5 origin-top scale-y-0 transition-transform delay-0 group-focus-within/input:scale-y-100 group-focus-within/input:delay-150')}
        />
        <span
          aria-hidden
          className={cn(EDGE, accent, '-bottom-px -right-px h-0.5 w-[calc(100%+2px)] origin-right scale-x-0 transition-transform delay-0 group-focus-within/input:scale-x-100 group-focus-within/input:delay-300')}
        />
        <span
          aria-hidden
          className={cn(EDGE, accent, '-bottom-px -left-px h-[calc(100%+2px)] w-0.5 origin-bottom scale-y-0 transition-transform delay-0 group-focus-within/input:scale-y-100 group-focus-within/input:delay-[450ms]')}
        />
      </div>
    )
  },
})
