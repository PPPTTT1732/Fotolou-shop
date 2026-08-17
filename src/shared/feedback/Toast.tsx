import React from 'react';
import { Check, AlertCircle, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  const current = toasts[0];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex justify-center items-center w-full px-4 max-w-sm">
      <div
        key={current.id}
        onClick={() => onDismiss(current.id)}
        className="pointer-events-auto bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-slate-700/60 flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-150 cursor-pointer"
      >
        {current.type === 'success' && (
          <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[2.5]" />
          </span>
        )}
        {current.type === 'error' && (
          <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-3 h-3 stroke-[2.5]" />
          </span>
        )}
        {current.type === 'info' && (
          <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Info className="w-3 h-3 stroke-[2.5]" />
          </span>
        )}
        <span className="truncate max-w-[240px] text-[11.5px] font-medium">{current.title}</span>
      </div>
    </div>
  );
};
