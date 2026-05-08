import { cn } from '../../lib/cn';
import { ChevronDown } from 'lucide-react';

export default function Select({ label, value, onChange, options, className, id, ...props }) {
  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="input appearance-none pr-9"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-surface">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}
