import { useState, useCallback, useRef } from 'react';
import { ToastMessage } from './Toast';

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const addToast = useCallback((title: string, _description?: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast_${Date.now()}`;

    // Always clear existing timer and show only 1 subtle notification
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToasts([{ id, title, type }]);

    timerRef.current = setTimeout(() => {
      setToasts([]);
    }, 1800);
  }, []);

  const dismissToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToasts([]);
  }, []);

  return { toasts, addToast, dismissToast };
}
