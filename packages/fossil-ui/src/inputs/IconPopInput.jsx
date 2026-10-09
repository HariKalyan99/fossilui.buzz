import { Search } from 'lucide-react'
import { cn } from '../lib/cn.js'
import { INPUT_BASE, INPUT_BOX, boxBorderClass } from './shared/constants.js'
import { FieldIcon, createAnimatedInput } from './shared/createAnimatedInput.jsx'

/** Leading icon springs, tilts, and takes the accent color on focus. Defaults to a search icon. */
export const IconPopInput = createAnimatedInput({
  displayName: 'IconPopInput',
  renderField: ({ icon, invalid, heightClass, inputClassName, inputProps }) => (
    <div
      className={cn(
        INPUT_BOX,
        heightClass,
        boxBorderClass(invalid),
        invalid ? 'focus-within:border-rose-400' : 'focus-within:border-indigo-300',
      )}
    >
      <FieldIcon
        icon={icon ?? <Search strokeWidth={2} />}
        className={cn(
          'transition-[color,scale,rotate] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none',
          'group-focus-within/input:scale-125 group-focus-within/input:-rotate-12',
          invalid ? 'group-focus-within/input:text-rose-500' : 'group-focus-within/input:text-indigo-500',
        )}
      />
      <input {...inputProps} className={cn(INPUT_BASE, inputClassName)} />
    </div>
  ),
})
