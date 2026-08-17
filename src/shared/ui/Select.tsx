import React, { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full rounded-xl border px-3.5 py-2 text-sm bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all ${
          error ? 'border-rose-500' : 'border-stone-200 dark:border-stone-700'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  );
};
