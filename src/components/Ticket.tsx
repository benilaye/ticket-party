import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Ticket as TicketType } from '../types/ticket';
import { Ticket as TicketIcon } from 'lucide-react';

interface TicketProps {
  ticket: TicketType;
}

export function Ticket({ ticket }: TicketProps) {
  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-indigo-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{ticket.eventName}</h2>
          <TicketIcon className="text-white" size={24} />
        </div>
      </div>
      
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-semibold">
              {new Date(ticket.eventDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Time</p>
            <p className="font-semibold">
              {new Date(ticket.eventDate).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-semibold">{ticket.eventLocation}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Price</p>
            <p className="font-semibold">${ticket.price.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">Ticket Holder</p>
          <p className="font-semibold">{ticket.ticketHolder}</p>
        </div>
        
        <div className="mt-6 flex justify-center">
          <QRCodeSVG value={ticket.qrCode} size={200} />
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">Ticket ID: {ticket.id}</p>
          <p className="text-xs text-gray-500">
            Generated on: {new Date(ticket.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}