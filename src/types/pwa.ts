export interface SyncQueueItem {
  id: string;
  entityType: 'ticket' | 'booking' | 'gallery' | 'client' | 'payment';
  action: 'create' | 'update' | 'delete';
  payload: Record<string, unknown>;
  createdAt: string;
  retryCount: number;
  status: 'pending' | 'processing' | 'failed' | 'synced';
}


export interface PwaInstallState {
  canInstall: boolean;
  isInstalled: boolean;
  platform: 'ios' | 'android' | 'desktop' | 'unknown';
}
