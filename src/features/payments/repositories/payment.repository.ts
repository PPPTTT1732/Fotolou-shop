import { PaymentRecord } from '../../../types/payment';
import { LocalStorageService } from '../../../infrastructure/storage/local-storage';
import { INITIAL_PAYMENTS } from '../../../constants/mock-data';
import { SyncManager } from '../../../pwa/sync/sync-manager';

const STORAGE_KEY = 'payments_data';

export class PaymentRepository {
  static getAll(): PaymentRecord[] {
    return LocalStorageService.getItem<PaymentRecord[]>(STORAGE_KEY, INITIAL_PAYMENTS);
  }

  static saveAll(payments: PaymentRecord[]): void {
    LocalStorageService.setItem(STORAGE_KEY, payments);
  }

  static create(payment: PaymentRecord): PaymentRecord {
    const all = this.getAll();
    const updated = [payment, ...all];
    this.saveAll(updated);
    SyncManager.addToQueue({
      entityType: 'payment',
      action: 'create',
      payload: payment as unknown as Record<string, unknown>,
    });
    return payment;
  }
}
