import { MESSAGES } from '../config/constants';
import type { TicketFormData } from '../models/form.model';

export function validateForm(data: TicketFormData): boolean {
  return Boolean(
    data.eventName &&
    data.eventLocation &&
    data.ticketHolder &&
    data.price > 0
  );
}

export function getFormErrors(data: TicketFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.eventName) {
    errors.eventName = MESSAGES.FORM.REQUIRED;
  }
  if (!data.eventLocation) {
    errors.eventLocation = MESSAGES.FORM.REQUIRED;
  }
  if (!data.ticketHolder) {
    errors.ticketHolder = MESSAGES.FORM.REQUIRED;
  }
  if (data.price <= 0) {
    errors.price = MESSAGES.FORM.INVALID_PRICE;
  }

  return errors;
}