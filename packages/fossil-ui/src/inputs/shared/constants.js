export const INPUT_SIZES = /** @type {const} */ (['sm', 'md', 'lg'])

export const INPUT_SIZE_CLASSES = {
  sm: 'h-9 text-[13px]',
  md: 'h-10 text-[14px]',
  lg: 'h-11 text-[15px]',
}

export const INPUT_BASE =
  'peer relative z-[1] h-full w-full min-w-0 bg-transparent text-neutral-900 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed'

/** Bordered field surface shared by most variants. */
export const INPUT_BOX =
  'group/input relative flex w-full items-center overflow-hidden rounded-lg border bg-white px-3 transition-[border-color,box-shadow,background-color] duration-200 motion-reduce:transition-none'

export function boxBorderClass(invalid) {
  return invalid ? 'border-rose-300' : 'border-neutral-200 hover:border-neutral-300'
}
