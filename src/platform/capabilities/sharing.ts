export interface ShareDataPayload {
  title: string;
  text?: string;
  url?: string;
}

export class SharingCapability {
  static canShare(): boolean {
    return typeof navigator !== 'undefined' && !!navigator.share;
  }

  static async share(payload: ShareDataPayload): Promise<{ success: boolean; method: 'native' | 'clipboard' }> {
    if (this.canShare()) {
      try {
        await navigator.share({
          title: payload.title,
          text: payload.text,
          url: payload.url || window.location.href,
        });
        return { success: true, method: 'native' };
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          return { success: false, method: 'native' };
        }
      }
    }

    // Fallback to clipboard
    try {
      const textToCopy = [payload.title, payload.text, payload.url || window.location.href]
        .filter(Boolean)
        .join(' - ');
      await navigator.clipboard.writeText(textToCopy);
      return { success: true, method: 'clipboard' };
    } catch {
      return { success: false, method: 'clipboard' };
    }
  }
}
