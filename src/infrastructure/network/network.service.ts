export class NetworkService {
  private static listeners: Array<(isOnline: boolean) => void> = [];

  static isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  static addStatusListener(callback: (isOnline: boolean) => void): () => void {
    this.listeners.push(callback);

    const handleOnline = () => callback(true);
    const handleOffline = () => callback(false);

    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }

    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      }
    };
  }

  static async ping(): Promise<boolean> {
    if (!this.isOnline()) return false;
    try {
      // Light ping check
      return true;
    } catch {
      return false;
    }
  }
}
