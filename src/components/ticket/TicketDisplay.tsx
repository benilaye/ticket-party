import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';
import { Ticket as TicketIcon } from 'lucide-react';
import { Ticket } from '../../types';

interface TicketDisplayProps {
  ticket: Ticket;
}

export const TicketDisplay: React.FC<TicketDisplayProps> = ({ ticket }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-indigo-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">{ticket.eventName}</h3>
          <TicketIcon className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">
              {format(new Date(ticket.eventDate), 'PPP')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium">
              {format(new Date(ticket.eventDate), 'p')}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-medium">{ticket.eventLocation}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Ticket Holder</p>
          <p className="font-medium">{ticket.ticketHolder}</p>
        </div>

        <div className="flex justify-center">
          <QRCodeSVG value={ticket.qrCode} size={200} />
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Ticket ID: {ticket.id}</p>
          <p>Generated: {format(new Date(ticket.createdAt), 'PPp')}</p>
        </div>
      </div>
    </div>
  );
};