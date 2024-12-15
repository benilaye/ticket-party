import { BarcodeScanner } from '@nativescript/barcodescanner';
import { MESSAGES, UI_CONSTANTS } from '../config/constants';

class ScannerService {
  private scanner: BarcodeScanner;

  constructor() {
    this.scanner = new BarcodeScanner();
  }

  async checkAvailability(): Promise<boolean> {
    return await this.scanner.available();
  }

  async scan(): Promise<string> {
    const result = await this.scanner.scan({
      formats: UI_CONSTANTS.SCAN_FORMATS,
      message: MESSAGES.SCAN_INSTRUCTIONS,
      showFlipCameraButton: true,
      preferFrontCamera: false,
      showTorchButton: true,
    });
    
    return result.text;
  }

  stop(): void {
    this.scanner.stop();
  }
}

export const scannerService = new ScannerService();