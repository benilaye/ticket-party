import * as qrcode from 'qrcode';
import { UI_CONSTANTS } from '../config/constants';

class QRCodeService {
  async generateQRCode(data: string): Promise<string> {
    try {
      return await qrcode.toDataURL(data, {
        width: UI_CONSTANTS.DEFAULT_QR_SIZE
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      return '';
    }
  }
}

export const qrcodeService = new QRCodeService();