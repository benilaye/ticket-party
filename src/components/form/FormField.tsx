import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  error?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  icon: Icon,
  children,
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative rounded-md shadow-sm">
        {children}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};