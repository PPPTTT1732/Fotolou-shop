import React from 'react';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useOfflineSync } from './useOfflineSync';

export const OfflineBanner: React.FC = () => {
  const { isOnline, pendingCount, isSyncing, forceSync } = useOfflineSync();

  if (isOnline && pendingCount === 0) return null;

  return (
    <aside aria-label="Notification d'état de synchronisation" className={`px-4 py-2 text-xs font-medium flex items-center justify-between border-b transition-colors ${
      !isOnline 
        ? 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300' 
        : 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300'
    }`}>
      <div className="flex items-center gap-2">
        {!isOnline ? (
          <>
            <WifiOff className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>Mode Hors-Ligne actif. Vos modifications sont sauvegardées localement.</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>En attente de synchronisation ({pendingCount} élément{pendingCount > 1 ? 's' : ''})</span>
          </>
        )}
      </div>

      {pendingCount > 0 && (
        <button
          onClick={forceSync}
          disabled={isSyncing || !isOnline}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-900/10 dark:bg-white/10 hover:bg-stone-900/20 dark:hover:bg-white/20 rounded text-xs transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Synchronisation...' : 'Synchroniser'}
        </button>
      )}
    </aside>
  );
};
