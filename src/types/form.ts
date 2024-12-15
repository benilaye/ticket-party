export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

export interface TicketFormFields {
  eventName: FormField;
  eventDate: FormField;
  eventTime: FormField;
  eventLocation: FormField;
  ticketHolder: FormField;
  price: FormField;
}