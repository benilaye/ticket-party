export interface Ticket {
  id: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  ticketHolder: string;
  price: number;
  qrCode: string;
  isUsed: boolean;
  createdAt: string;
}