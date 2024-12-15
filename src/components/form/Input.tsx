import React from 'react';
import { FormField as FormFieldType } from '../../types';

interface InputProps {
  type?: string;
  field: FormFieldType;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  [key: string]: any;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  field,
  onChange,
  onBlur,
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      value={field.value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={`block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ${
        field.error ? 'border-red-300' : ''
      } ${className}`}
      {...props}
    />
  );
};