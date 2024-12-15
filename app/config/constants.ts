export const STORAGE_KEYS = {
  TICKETS: 'tickets'
} as const;

export const UI_CONSTANTS = {
  DEFAULT_QR_SIZE: 200,
  SCAN_FORMATS: ['QR_CODE'],
  MIN_PRICE: 0,
  DATE_FORMAT: 'yyyy-MM-dd',
  TIME_FORMAT: 'HH:mm'
} as const;

export const MESSAGES = {
  FORM: {
    REQUIRED: 'This field is required',
    INVALID_PRICE: 'Price must be greater than 0',
    INVALID_DATE: 'Invalid date'
  },
  SCAN: {
    UNAVAILABLE: 'Barcode scanner not available',
    ERROR: 'Error scanning QR code',
    INSTRUCTIONS: 'Place the QR code inside the scan area'
  },
  TICKET: {
    INVALID: 'Invalid ticket',
    USED: 'Ticket has already been used',
    VALID: 'Ticket validated successfully',
    GENERATED: 'Ticket generated successfully'
  }
} as const;