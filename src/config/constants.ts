export const MESSAGES = {
  FORM: {
    REQUIRED: 'This field is required',
    INVALID_PRICE: 'Price must be greater than 0',
    INVALID_DATE: 'Please select a valid date and time'
  },
  SCANNER: {
    ERROR: 'Error accessing camera',
    PERMISSION: 'Please allow camera access to scan tickets',
    SCANNING: 'Place the QR code in view to scan'
  },
  TICKET: {
    INVALID: 'Invalid ticket',
    USED: 'This ticket has already been used',
    VALID: 'Valid ticket',
    GENERATED: 'Ticket generated successfully'
  }
} as const;

export const UI_CONSTANTS = {
  QR_CODE: {
    SIZE: 200,
    LEVEL: 'H'
  },
  ANIMATION: {
    DURATION: 300
  }
} as const;