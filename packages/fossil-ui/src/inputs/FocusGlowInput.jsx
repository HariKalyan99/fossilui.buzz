import { cn } from '../lib/cn.js'
import { INPUT_BASE, INPUT_BOX, boxBorderClass } from './shared/constants.js'
import { FieldIcon, createAnimatedInput } from './shared/createAnimatedInput.jsx'

/** Border tints and a soft ring glows around the field on focus. */
export const FocusGlowInput = createAnimatedInput({
  displayName: 'FocusGlowInput',
  renderField: ({ icon, invalid, heightClass, inputClassName, inputProps }) => (
    <div
      className={cn(
        INPUT_BOX,
        heightClass,
        boxBorderClass(invalid),
        invalid
          ? 'focus-within:border-rose-400 focus-within:shadow-[0_0_0_4px_rgba(244,63,94,0.14)]'
          : 'focus-within:border-indigo-400 focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.15)]',
      )}
    >
      <FieldIcon icon={icon} />
      <input {...inputProps} className={cn(INPUT_BASE, inputClassName)} />
    </div>
  ),
})
