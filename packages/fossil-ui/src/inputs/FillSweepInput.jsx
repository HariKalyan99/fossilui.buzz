import { cn } from '../lib/cn.js'
import { INPUT_BASE, INPUT_BOX, boxBorderClass } from './shared/constants.js'
import { FieldIcon, createAnimatedInput } from './shared/createAnimatedInput.jsx'

/** A tinted fill sweeps across the field from the left on focus. */
export const FillSweepInput = createAnimatedInput({
  displayName: 'FillSweepInput',
  renderField: ({ icon, invalid, heightClass, inputClassName, inputProps }) => (
    <div
      className={cn(
        INPUT_BOX,
        heightClass,
        boxBorderClass(invalid),
        invalid ? 'focus-within:border-rose-300' : 'focus-within:border-indigo-200',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 origin-left scale-x-0',
          'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within/input:scale-x-100 motion-reduce:transition-none',
          invalid ? 'bg-rose-50' : 'bg-indigo-50/80',
        )}
      />
      <FieldIcon icon={icon} />
      <input {...inputProps} className={cn(INPUT_BASE, inputClassName)} />
    </div>
  ),
})
