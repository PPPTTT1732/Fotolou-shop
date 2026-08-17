import { APP_CONFIG } from '../../config/app.config';

export class LocalStorageService {
  private static prefix = APP_CONFIG.pwa.storagePrefix;

  static getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(`${this.prefix}${key}`);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (err) {
      console.warn(`[LocalStorage] Error reading key ${key}:`, err);
      return defaultValue;
    }
  }

  static setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`[LocalStorage] Error writing key ${key}:`, err);
      return false;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(`${this.prefix}${key}`);
    } catch (err) {
      console.error(`[LocalStorage] Error removing key ${key}:`, err);
    }
  }
}
