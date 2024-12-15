import React, { useState } from 'react';
import { TicketForm } from './components/TicketForm';
import { Ticket } from './components/Ticket';
import { Scanner } from './components/Scanner';
import { useTicketStore } from './store/ticketStore';
import { Ticket as TicketIcon, QrCode, Plus } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate');
  const tickets = useTicketStore((state) => state.tickets);
  const latestTicket = tickets[tickets.length - 1];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <TicketIcon className="text-indigo-600" />
            Event Ticket Generator
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('generate')}
                className={`${
                  activeTab === 'generate'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-1 py-4 border-b-2 font-medium text-sm`}
              >
                <Plus className="mr-2 h-5 w-5" />
                Generate Ticket
              </button>
              <button
                onClick={() => setActiveTab('scan')}
                className={`${
                  activeTab === 'scan'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-1 py-4 border-b-2 font-medium text-sm`}
              >
                <QrCode className="mr-2 h-5 w-5" />
                Scan Ticket
              </button>
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-8">
          {activeTab === 'generate' ? (
            <>
              <TicketForm />
              {latestTicket && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    Generated Ticket
                  </h2>
                  <Ticket ticket={latestTicket} />
                </div>
              )}
            </>
          ) : (
            <Scanner />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;