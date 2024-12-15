export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}