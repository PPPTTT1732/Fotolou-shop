import { Client } from '../../../types/client';
import { LocalStorageService } from '../../../infrastructure/storage/local-storage';
import { INITIAL_CLIENTS } from '../../../constants/mock-data';
import { SyncManager } from '../../../pwa/sync/sync-manager';

const STORAGE_KEY = 'clients_data';

export class ClientRepository {
  static getAll(): Client[] {
    return LocalStorageService.getItem<Client[]>(STORAGE_KEY, INITIAL_CLIENTS);
  }

  static saveAll(clients: Client[]): void {
    LocalStorageService.setItem(STORAGE_KEY, clients);
  }

  static getById(id: string): Client | null {
    const all = this.getAll();
    return all.find(c => c.id === id) || null;
  }

  static create(client: Client): Client {
    const all = this.getAll();
    const updated = [client, ...all];
    this.saveAll(updated);
    SyncManager.addToQueue({
      entityType: 'client',
      action: 'create',
      payload: client as unknown as Record<string, unknown>,
    });
    return client;
  }
}
