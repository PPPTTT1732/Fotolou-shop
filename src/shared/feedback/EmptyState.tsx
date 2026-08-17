import React from 'react';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30">
      <div className="p-3.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1">{title}</h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
