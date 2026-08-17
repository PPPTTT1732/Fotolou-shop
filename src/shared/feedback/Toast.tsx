import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

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

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 bg-stone-900 text-white rounded-xl shadow-lg border border-stone-800 animate-in slide-in-from-bottom-2 duration-150"
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-stone-100">{toast.title}</h4>
            {toast.description && <p className="text-xs text-stone-400 mt-0.5">{toast.description}</p>}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-stone-500 hover:text-stone-300 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
