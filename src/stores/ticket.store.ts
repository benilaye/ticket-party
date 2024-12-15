import { writable } from 'svelte/store';
import type { Ticket } from '../models/ticket.model';
import { generateUUID } from '../utils/uuid';
import { storageService } from '../services/storage.service';
import { MESSAGES } from '../config/constants';

function createTicketStore() {
  const { subscribe, set, update } = writable<Ticket[]>(storageService.getTickets());

  return {
    subscribe,
    createTicket: (ticketData: Omit<Ticket, 'id' | 'qrCode' | 'isUsed' | 'createdAt'>) => {
      const newTicket: Ticket = {
        ...ticketData,
        id: generateUUID(),
        qrCode: generateUUID(),
        isUsed: false,
        createdAt: new Date().toISOString(),
      };

      update(tickets => {
        const updatedTickets = [...tickets, newTicket];
        storageService.saveTickets(updatedTickets);
        return updatedTickets;
      });

      return newTicket;
    },
    validateTicket: (qrCode: string) => {
      let result = { valid: false, message: MESSAGES.INVALID_TICKET };

      update(tickets => {
        const ticketIndex = tickets.findIndex(t => t.qrCode === qrCode);
        if (ticketIndex === -1) {
          return tickets;
        }

        if (tickets[ticketIndex].isUsed) {
          result = { valid: false, message: MESSAGES.TICKET_USED };
          return tickets;
        }

        const updatedTickets = tickets.map((t, index) =>
          index === ticketIndex ? { ...t, isUsed: true } : t
        );
        
        storageService.saveTickets(updatedTickets);
        result = { valid: true, message: MESSAGES.TICKET_VALID };
        return updatedTickets;
      });

      return result;
    }
  };
}

export const ticketStore = createTicketStore();