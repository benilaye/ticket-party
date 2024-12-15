import { ApplicationSettings } from '@nativescript/core';
import { STORAGE_KEYS } from '../config/constants';
import type { Ticket } from '../models/ticket.model';

class StorageService {
  saveTickets(tickets: Ticket[]): void {
    ApplicationSettings.setString(
      STORAGE_KEYS.TICKETS, 
      JSON.stringify(tickets)
    );
  }

  getTickets(): Ticket[] {
    const savedTickets = ApplicationSettings.getString(STORAGE_KEYS.TICKETS);
    return savedTickets ? JSON.parse(savedTickets) : [];
  }
}

export const storageService = new StorageService();