import { cn } from '../lib/cn.js'
import { INPUT_BASE } from './shared/constants.js'
import { FieldIcon, createAnimatedInput } from './shared/createAnimatedInput.jsx'

/** Minimal underline field; an accent line grows from the center on focus. */
export const UnderlineGrowInput = createAnimatedInput({
  displayName: 'UnderlineGrowInput',
  renderField: ({ icon, invalid, heightClass, inputClassName, inputProps }) => (
    <div
      className={cn(
        'group/input relative flex w-full items-center border-b',
        invalid ? 'border-rose-300' : 'border-neutral-300',
        heightClass,
      )}
    >
      <FieldIcon icon={icon} className="transition-colors duration-300 group-focus-within/input:text-indigo-500" />
      <input {...inputProps} className={cn(INPUT_BASE, 'px-0.5', inputClassName)} />
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 -bottom-px h-0.5 origin-center scale-x-0 rounded-full',
          'transition-transform duration-300 ease-out group-focus-within/input:scale-x-100 motion-reduce:transition-none',
          invalid ? 'bg-rose-500' : 'bg-indigo-500',
        )}
      />
    </div>
  ),
})
