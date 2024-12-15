import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateId, generateQRCode } from '../utils/id';
import type { Ticket } from '../types/ticket';
import { MESSAGES } from '../config/constants';

interface TicketStore {
  tickets: Ticket[];
  createTicket: (ticketData: Omit<Ticket, 'id' | 'qrCode' | 'isUsed' | 'createdAt'>) => Ticket;
  validateTicket: (qrCode: string) => { valid: boolean; message: string };
}

export const useTicketStore = create<TicketStore>()(
  persist(
    (set, get) => ({
      tickets: [],
      createTicket: (ticketData) => {
        const newTicket: Ticket = {
          ...ticketData,
          id: generateId(),
          qrCode: generateQRCode(),
          isUsed: false,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          tickets: [...state.tickets, newTicket],
        }));
        
        return newTicket;
      },
      validateTicket: (qrCode) => {
        const tickets = get().tickets;
        const ticket = tickets.find((t) => t.qrCode === qrCode);
        
        if (!ticket) {
          return { valid: false, message: MESSAGES.TICKET.INVALID };
        }
        
        if (ticket.isUsed) {
          return { valid: false, message: MESSAGES.TICKET.USED };
        }
        
        set((state) => ({
          tickets: state.tickets.map((t) =>
            t.qrCode === qrCode ? { ...t, isUsed: true } : t
          ),
        }));
        
        return { valid: true, message: MESSAGES.TICKET.VALID };
      },
    }),
    {
      name: 'ticket-storage',
    }
  )
);