import { cn } from '../lib/cn.js'
import { INPUT_BASE, INPUT_BOX, boxBorderClass } from './shared/constants.js'
import { FieldIcon, createAnimatedInput } from './shared/createAnimatedInput.jsx'

/** Label rests inside the field and floats onto the border on focus or when filled. */
export const FloatingLabelInput = createAnimatedInput({
  displayName: 'FloatingLabelInput',
  outerLabel: false,
  renderField: ({ id, label, icon, invalid, heightClass, inputClassName, inputProps }) => (
    <div
      className={cn(
        INPUT_BOX,
        'overflow-visible',
        heightClass,
        boxBorderClass(invalid),
        invalid ? 'focus-within:border-rose-400' : 'focus-within:border-indigo-400',
      )}
    >
      <FieldIcon icon={icon} />
      <input
        {...inputProps}
        // :placeholder-shown drives the float, so a placeholder must always exist.
        placeholder={inputProps.placeholder || ' '}
        className={cn(
          INPUT_BASE,
          'placeholder:text-transparent group-focus-within/input:placeholder:text-neutral-400',
          inputClassName,
        )}
      />
      {label ? (
        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute top-1/2 z-[2] origin-left -translate-y-1/2 rounded-sm bg-white px-1 text-neutral-500',
            'transition-[top,scale,color] duration-200 ease-out motion-reduce:transition-none',
            icon ? 'left-8' : 'left-2',
            'group-focus-within/input:top-0 group-focus-within/input:scale-[0.82]',
            'peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.82]',
            invalid ? 'group-focus-within/input:text-rose-600' : 'group-focus-within/input:text-indigo-600',
          )}
        >
          {label}
        </label>
      ) : null}
    </div>
  ),
})
