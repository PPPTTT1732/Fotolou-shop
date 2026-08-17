import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'flat' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  const base = 'bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl transition-all duration-150';

  const variants = {
    default: 'shadow-xs',
    flat: 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800/80',
    interactive: 'hover:border-amber-500/50 hover:shadow-md cursor-pointer active:scale-[0.99]',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-7',
  };

  return (
    <div className={`${base} ${variants[variant]} ${paddings[padding]} ${className}`} {...props}>
      {children}
    </div>
  );
};
