export interface CameraCaptureResult {
  file: File;
  dataUrl: string;
}

export class CameraCapability {
  static isAvailable(): boolean {
    return (
      typeof navigator !== 'undefined' &&
      !!navigator.mediaDevices &&
      !!navigator.mediaDevices.getUserMedia
    );
  }

  static async selectOrCaptureImage(): Promise<CameraCaptureResult | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';

      input.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) {
          resolve(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            file,
            dataUrl: reader.result as string,
          });
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      };

      input.click();
    });
  }
}
