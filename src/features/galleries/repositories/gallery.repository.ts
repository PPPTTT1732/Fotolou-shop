import { Gallery } from '../../../types/gallery';
import { LocalStorageService } from '../../../infrastructure/storage/local-storage';
import { INITIAL_GALLERIES } from '../../../constants/mock-data';
import { SyncManager } from '../../../pwa/sync/sync-manager';

const STORAGE_KEY = 'galleries_data';

export class GalleryRepository {
  static getAll(): Gallery[] {
    return LocalStorageService.getItem<Gallery[]>(STORAGE_KEY, INITIAL_GALLERIES);
  }

  static saveAll(galleries: Gallery[]): void {
    LocalStorageService.setItem(STORAGE_KEY, galleries);
  }

  static getById(id: string): Gallery | null {
    const all = this.getAll();
    return all.find(g => g.id === id) || null;
  }

  static create(gallery: Gallery): Gallery {
    const all = this.getAll();
    const updated = [gallery, ...all];
    this.saveAll(updated);
    SyncManager.addToQueue({
      entityType: 'gallery',
      action: 'create',
      payload: gallery as unknown as Record<string, unknown>,
    });
    return gallery;
  }

  static update(gallery: Gallery): Gallery {
    const all = this.getAll();
    const updated = all.map(g => (g.id === gallery.id ? gallery : g));
    this.saveAll(updated);
    SyncManager.addToQueue({
      entityType: 'gallery',
      action: 'update',
      payload: gallery as unknown as Record<string, unknown>,
    });
    return gallery;
  }
}
