import { cn } from '../lib/cn.js'
import { INPUT_BASE, INPUT_BOX, boxBorderClass } from './shared/constants.js'
import { FieldIcon, createAnimatedInput } from './shared/createAnimatedInput.jsx'

/** Placeholder text slides away and fades on focus, making room to type. */
export const PlaceholderSlideInput = createAnimatedInput({
  displayName: 'PlaceholderSlideInput',
  renderField: ({ icon, invalid, heightClass, inputClassName, inputProps }) => {
    const { placeholder, ...rest } = inputProps
    return (
      <div
        className={cn(
          INPUT_BOX,
          heightClass,
          boxBorderClass(invalid),
          invalid ? 'focus-within:border-rose-400' : 'focus-within:border-neutral-900',
        )}
      >
        <FieldIcon icon={icon} />
        <span className="relative flex h-full min-w-0 flex-1 items-center">
          <input
            {...rest}
            placeholder=" "
            className={cn(INPUT_BASE, 'placeholder:text-transparent', inputClassName)}
          />
          {placeholder ? (
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-y-0 left-0 flex items-center truncate text-neutral-400',
                'transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none',
                'group-focus-within/input:translate-x-6 group-focus-within/input:opacity-0',
                'peer-[:not(:placeholder-shown)]:opacity-0',
              )}
            >
              {placeholder}
            </span>
          ) : null}
        </span>
      </div>
    )
  },
})
