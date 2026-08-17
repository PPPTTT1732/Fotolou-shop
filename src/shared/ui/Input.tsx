import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-xl border px-3.5 py-2 text-sm bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all ${
          error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : 'border-stone-200 dark:border-stone-700'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-stone-500 dark:text-stone-400">{helperText}</p>
      ) : null}
    </div>
  );
};
