import { VirtualTicket } from '../../../types/ticket';
import { LocalStorageService } from '../../../infrastructure/storage/local-storage';
import { INITIAL_TICKETS } from '../../../constants/services';
import { SyncManager } from '../../../pwa/sync/sync-manager';

const STORAGE_KEY = 'fotolou_virtual_tickets';

export class TicketRepository {
  static getAll(): VirtualTicket[] {
    return LocalStorageService.getItem<VirtualTicket[]>(STORAGE_KEY, INITIAL_TICKETS);
  }

  static saveAll(tickets: VirtualTicket[]): void {
    LocalStorageService.setItem(STORAGE_KEY, tickets);
  }

  static create(ticket: VirtualTicket): VirtualTicket {
    const all = this.getAll();
    const updated = [...all, ticket];
    this.saveAll(updated);
    SyncManager.addToQueue({
      entityType: 'ticket',
      action: 'create',
      payload: ticket as unknown as Record<string, unknown>,
    });
    return ticket;
  }

  static update(id: string, updates: Partial<VirtualTicket>): VirtualTicket | null {
    const all = this.getAll();
    const index = all.findIndex(t => t.id === id);
    if (index === -1) return null;

    const updated = { ...all[index], ...updates };
    all[index] = updated;
    this.saveAll(all);
    return updated;
  }
}
