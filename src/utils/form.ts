import { FormField, TicketFormFields } from '../types';

export const createFormField = (value = ''): FormField => ({
  value,
  touched: false,
});

export const createInitialFormState = (): TicketFormFields => ({
  eventName: createFormField(),
  eventDate: createFormField(),
  eventTime: createFormField(),
  eventLocation: createFormField(),
  ticketHolder: createFormField(),
  price: createFormField('0'),
});