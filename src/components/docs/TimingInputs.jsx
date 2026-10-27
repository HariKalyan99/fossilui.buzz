import { cn } from '../../lib/cn'
import { SELECT_CLASS } from './ComponentConfigurator'

const FIELDS = [
  { key: 'duration', label: 'Duration (ms)', placeholder: 'Default' },
  { key: 'easing', label: 'Easing', placeholder: 'ease-out or cubic-bezier(...)', wide: true },
  { key: 'delay', label: 'Delay (ms)', placeholder: '0' },
]

/** Duration, easing, and delay controls shared by the custom configurators. */
export function TimingInputs({ values, onChange, durationLabel = 'Duration (ms)' }) {
  return FIELDS.map((field) => (
    <label key={field.key} className={cn('min-w-0 space-y-1.5', field.wide && 'md:col-span-2')}>
      <span className="text-[12px] font-medium text-neutral-600">{field.key === 'duration' ? durationLabel : field.label}</span>
      <input
        value={values[field.key] ?? ''}
        placeholder={field.placeholder}
        onChange={(event) => onChange(field.key, event.target.value)}
        className={cn(SELECT_CLASS, 'px-2.5')}
      />
    </label>
  ))
}
