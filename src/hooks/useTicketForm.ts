import { useState } from 'react';
import { formatISO } from 'date-fns';
import { useTicketStore } from '../store/ticketStore';
import type { FormData } from '../types/form';

export const useTicketForm = () => {
  const createTicket = useTicketStore((state) => state.createTicket);
  const [formData, setFormData] = useState<FormData>({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    ticketHolder: '',
    price: ''
  });

  const resetForm = () => {
    setFormData({
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      ticketHolder: '',
      price: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateTime = new Date(`${formData.eventDate}T${formData.eventTime}`);
    
    createTicket({
      eventName: formData.eventName,
      eventDate: formatISO(dateTime),
      eventLocation: formData.eventLocation,
      ticketHolder: formData.ticketHolder,
      price: parseFloat(formData.price)
    });

    resetForm();
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    resetForm
  };
};