import { forwardRef } from 'react'
import { Checkbox } from './Checkbox.jsx'
import { Field } from './Field.jsx'
import { Input } from './Input.jsx'
import { Select } from './Select.jsx'
import { Switch } from './Switch.jsx'
import { Textarea } from './Input.jsx'

export const DefaultInput = forwardRef(function DefaultInput(props, ref) {
  return <Input ref={ref} motion="default" {...props} />
})

export const UnderlineInput = forwardRef(function UnderlineInput(props, ref) {
  return <Input ref={ref} motion="underline" {...props} />
})

export const FilledInput = forwardRef(function FilledInput(props, ref) {
  return <Input ref={ref} motion="filled" {...props} />
})

export const GhostInput = forwardRef(function GhostInput(props, ref) {
  return <Input ref={ref} motion="ghost" {...props} />
})

export const RingGlowInput = forwardRef(function RingGlowInput(props, ref) {
  return <Input ref={ref} motion="ringGlow" {...props} />
})

export const CompactInput = forwardRef(function CompactInput(props, ref) {
  return <Input ref={ref} motion="compact" {...props} />
})

export const SearchInput = forwardRef(function SearchInput({ className, ...props }, ref) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </span>
      <Input ref={ref} motion="search" className={className} {...props} />
    </div>
  )
})

export const TextareaInput = forwardRef(function TextareaInput(props, ref) {
  return <Textarea ref={ref} motion="default" {...props} />
})

export const SelectInput = forwardRef(function SelectInput(props, ref) {
  return <Select ref={ref} motion="default" {...props} />
})

export const CheckboxInput = forwardRef(function CheckboxInput(props, ref) {
  return <Checkbox ref={ref} {...props} />
})

export const SwitchInput = forwardRef(function SwitchInput(props, ref) {
  return <Switch ref={ref} {...props} />
})

export function FieldInput({ label = 'Email', htmlFor = 'fossil-field-email', hint, ...props }) {
  return (
    <Field label={label} htmlFor={htmlFor} hint={hint}>
      <Input id={htmlFor} motion="default" {...props} />
    </Field>
  )
}

export const ErrorInput = forwardRef(function ErrorInput(props, ref) {
  return <Input ref={ref} motion="error" error {...props} />
})

export const SuccessInput = forwardRef(function SuccessInput(props, ref) {
  return <Input ref={ref} motion="success" {...props} />
})
