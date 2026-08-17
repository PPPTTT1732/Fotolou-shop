import { Booking } from '../../../types/booking';
import { LocalStorageService } from '../../../infrastructure/storage/local-storage';
import { INITIAL_BOOKINGS } from '../../../constants/mock-data';
import { SyncManager } from '../../../pwa/sync/sync-manager';

const STORAGE_KEY = 'reservations_data';

export class ReservationRepository {
  static getAll(): Booking[] {
    return LocalStorageService.getItem<Booking[]>(STORAGE_KEY, INITIAL_BOOKINGS);
  }

  static saveAll(bookings: Booking[]): void {
    LocalStorageService.setItem(STORAGE_KEY, bookings);
  }

  static getById(id: string): Booking | null {
    const all = this.getAll();
    return all.find(b => b.id === id) || null;
  }

  static create(booking: Booking): Booking {
    const all = this.getAll();
    const updated = [booking, ...all];
    this.saveAll(updated);
    SyncManager.addToQueue({
      entityType: 'booking',
      action: 'create',
      payload: booking as unknown as Record<string, unknown>,
    });
    return booking;
  }

  static update(booking: Booking): Booking {
    const all = this.getAll();
    const updated = all.map(b => (b.id === booking.id ? booking : b));
    this.saveAll(updated);
    SyncManager.addToQueue({
      entityType: 'booking',
      action: 'update',
      payload: booking as unknown as Record<string, unknown>,
    });
    return booking;
  }

  static delete(id: string): void {
    const all = this.getAll();
    const updated = all.filter(b => b.id !== id);
    this.saveAll(updated);
    SyncManager.addToQueue({
      entityType: 'booking',
      action: 'delete',
      payload: { id },
    });
  }
}
