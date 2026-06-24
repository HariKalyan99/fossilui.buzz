import { forwardRef } from 'react'
import {
  CheckboxInput,
  CompactInput,
  DefaultInput,
  ErrorInput,
  FieldInput,
  FilledInput,
  GhostInput,
  RingGlowInput,
  SearchInput,
  SelectInput,
  SuccessInput,
  SwitchInput,
  TextareaInput,
  UnderlineInput,
} from './variants.jsx'

const MOTION_COMPONENTS = {
  default: DefaultInput,
  underline: UnderlineInput,
  filled: FilledInput,
  ghost: GhostInput,
  ringGlow: RingGlowInput,
  compact: CompactInput,
  search: SearchInput,
  textarea: TextareaInput,
  select: SelectInput,
  checkbox: CheckboxInput,
  switch: SwitchInput,
  field: FieldInput,
  error: ErrorInput,
  success: SuccessInput,
}

export const INPUT_MOTIONS = /** @type {const} */ (Object.keys(MOTION_COMPONENTS))

/**
 * Input family with style variants.
 * Example: <FossilInput motion="underline" placeholder="Name" />
 */
export const FossilInput = forwardRef(function FossilInput({ motion = 'default', ...props }, ref) {
  const Comp = MOTION_COMPONENTS[motion] ?? DefaultInput
  return <Comp ref={ref} {...props} />
})
