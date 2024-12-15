import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, DollarSign } from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';
import { formatISO } from 'date-fns';

export function TicketForm() {
  const createTicket = useTicketStore((state) => state.createTicket);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    ticketHolder: '',
    price: ''
  });

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

    setFormData({
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      ticketHolder: '',
      price: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Event Name</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            required
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.eventName}
            onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.eventDate}
            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="time"
              required
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.eventTime}
              onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            required
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.eventLocation}
            onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ticket Holder</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            required
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.ticketHolder}
            onChange={(e) => setFormData({ ...formData, ticketHolder: e.target.value })}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <User className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generate Ticket
      </button>
    </form>
  );
}