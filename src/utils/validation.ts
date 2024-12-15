import { FormValidation, TicketFormFields } from '../types';
import { MESSAGES } from '../config/constants';

export const validateForm = (fields: TicketFormFields): FormValidation => {
  const errors: Record<string, string> = {};

  if (!fields.eventName.value) {
    errors.eventName = MESSAGES.FORM.REQUIRED;
  }

  if (!fields.eventLocation.value) {
    errors.eventLocation = MESSAGES.FORM.REQUIRED;
  }

  if (!fields.ticketHolder.value) {
    errors.ticketHolder = MESSAGES.FORM.REQUIRED;
  }

  const price = parseFloat(fields.price.value);
  if (isNaN(price) || price <= 0) {
    errors.price = MESSAGES.FORM.INVALID_PRICE;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};