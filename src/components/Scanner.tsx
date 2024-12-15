import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { useTicketStore } from '../store/ticketStore';

export function Scanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const validateTicket = useTicketStore((state) => state.validateTicket);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    let mounted = true;

    const scan = async () => {
      try {
        if (!videoRef.current) return;
        
        const result = await codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result) => {
            if (result && mounted) {
              const validation = validateTicket(result.getText());
              setMessage(validation.message);
              setMessageType(validation.valid ? 'success' : 'error');
            }
          }
        );

        return () => {
          mounted = false;
          if (result) {
            result.stop();
          }
        };
      } catch (error) {
        setMessage('Error accessing camera');
        setMessageType('error');
      }
    };

    scan();

    return () => {
      mounted = false;
      codeReader.reset();
    };
  }, [validateTicket]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full aspect-square object-cover rounded-lg"
        />
        <div className="absolute inset-0 border-2 border-indigo-500 rounded-lg" />
      </div>
      
      {message && (
        <div
          className={`p-4 rounded-md ${
            messageType === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}