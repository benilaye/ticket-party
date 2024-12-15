import { storageService } from './storage.service';
import { generateUUID } from '../utils/uuid';
import type { Ticket } from '../models/ticket.model';
import type { TicketFormData } from '../models/form.model';

class TicketService {
  createTicket(formData: TicketFormData): Ticket {
    const ticket: Ticket = {
      ...formData,
      id: generateUUID(),
      qrCode: generateUUID(),
      isUsed: false,
      createdAt: new Date().toISOString()
    };

    const tickets = this.getTickets();
    tickets.push(ticket);
    this.saveTickets(tickets);

    return ticket;
  }

  validateTicket(qrCode: string): { valid: boolean; message: string } {
    const tickets = this.getTickets();
    const ticket = tickets.find(t => t.qrCode === qrCode);

    if (!ticket) {
      return { valid: false, message: 'Invalid ticket' };
    }

    if (ticket.isUsed) {
      return { valid: false, message: 'Ticket has already been used' };
    }

    ticket.isUsed = true;
    this.saveTickets(tickets);

    return { valid: true, message: 'Ticket validated successfully' };
  }

  private getTickets(): Ticket[] {
    return storageService.getTickets();
  }

  private saveTickets(tickets: Ticket[]): void {
    storageService.saveTickets(tickets);
  }
}

export const ticketService = new TicketService();