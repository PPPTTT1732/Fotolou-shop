import { useState, useEffect, useCallback } from 'react';
import { SyncManager } from '../sync/sync-manager';
import { useNetworkStatus } from '../../platform/hooks/useNetworkStatus';

export function useOfflineSync() {
  const isOnline = useNetworkStatus();
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const refreshCount = useCallback(() => {
    const queue = SyncManager.getQueue();
    setPendingCount(queue.length);
  }, []);

  useEffect(() => {
    refreshCount();
    const interval = setInterval(refreshCount, 4000);
    return () => clearInterval(interval);
  }, [refreshCount]);

  useEffect(() => {
    if (isOnline && pendingCount > 0) {
      setIsSyncing(true);
      SyncManager.processQueue().then(() => {
        setIsSyncing(false);
        refreshCount();
      });
    }
  }, [isOnline, pendingCount, refreshCount]);

  const forceSync = async () => {
    setIsSyncing(true);
    await SyncManager.processQueue();
    setIsSyncing(false);
    refreshCount();
  };

  return { isOnline, pendingCount, isSyncing, forceSync, refreshCount };
}
