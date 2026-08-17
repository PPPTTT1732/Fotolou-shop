import { SyncQueueItem } from '../../types/pwa';
import { LocalStorageService } from '../../infrastructure/storage/local-storage';

const QUEUE_STORAGE_KEY = 'sync_queue';

export class SyncManager {
  static getQueue(): SyncQueueItem[] {
    return LocalStorageService.getItem<SyncQueueItem[]>(QUEUE_STORAGE_KEY, []);
  }

  static addToQueue(item: Omit<SyncQueueItem, 'id' | 'createdAt' | 'retryCount' | 'status'>): SyncQueueItem {
    const queue = this.getQueue();
    const newItem: SyncQueueItem = {
      ...item,
      id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      retryCount: 0,
      status: 'pending',
    };
    queue.push(newItem);
    LocalStorageService.setItem(QUEUE_STORAGE_KEY, queue);
    return newItem;
  }

  static remove(id: string): void {
    const queue = this.getQueue().filter(item => item.id !== id);
    LocalStorageService.setItem(QUEUE_STORAGE_KEY, queue);
  }

  static clear(): void {
    LocalStorageService.setItem(QUEUE_STORAGE_KEY, []);
  }

  static async processQueue(): Promise<{ processed: number; errors: number }> {
    const queue = this.getQueue();
    if (queue.length === 0) return { processed: 0, errors: 0 };

    // Mark as processed (in a real backend this would post to an API)
    this.clear();
    return { processed: queue.length, errors: 0 };
  }
}
