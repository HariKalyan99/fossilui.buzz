import { ChevronDown } from 'lucide-react'

const control =
  'block w-full min-h-13 border bg-ink px-4 py-3 text-base text-bone placeholder:text-ash/60 transition-colors duration-300 focus:border-volt aria-[invalid=true]:border-alert'

function describedBy(name, hint, error) {
  return [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(' ') || undefined
}

export function Field({ name, label, required, hint, error, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="type-eyebrow flex items-center gap-2 text-bone/85">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-volt">
            *
          </span>
        ) : (
          <span className="text-ash normal-case tracking-normal">(optional)</span>
        )}
      </label>
      <div className="mt-3">{children}</div>
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-2 text-xs text-ash">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm font-medium text-alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function Input({ name, error, hint, required, className = '', ...props }) {
  return (
    <input
      id={name}
      name={name}
      required={required}
      aria-required={required || undefined}
      aria-invalid={Boolean(error)}
      aria-describedby={describedBy(name, hint, error)}
      className={`${control} ${error ? 'border-alert' : 'border-bone/15 hover:border-bone/35'} ${className}`}
      {...props}
    />
  )
}

export function Textarea({ name, error, hint, required, className = '', ...props }) {
  return (
    <textarea
      id={name}
      name={name}
      required={required}
      aria-required={required || undefined}
      aria-invalid={Boolean(error)}
      aria-describedby={describedBy(name, hint, error)}
      className={`${control} min-h-36 resize-y ${error ? 'border-alert' : 'border-bone/15 hover:border-bone/35'} ${className}`}
      {...props}
    />
  )
}

export function Select({ name, error, hint, required, options, placeholder, className = '', ...props }) {
  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        required={required}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(name, hint, error)}
        className={`${control} appearance-none pr-12 ${error ? 'border-alert' : 'border-bone/15 hover:border-bone/35'} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ash"
      />
    </div>
  )
}

export function ChoiceGroup({ name, label, options, value, onChange, error, required }) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="type-eyebrow flex items-center gap-2 text-bone/85">
        {label}
        {required && (
          <span aria-hidden="true" className="text-volt">
            *
          </span>
        )}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value === o.value
          return (
            <label
              key={o.value}
              className={`relative inline-flex min-h-12 cursor-pointer items-center border px-4 text-sm font-semibold transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-volt ${
                checked ? 'border-volt bg-volt text-ink' : 'border-bone/15 text-bone hover:border-bone/40'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          )
        })}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm font-medium text-alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}
