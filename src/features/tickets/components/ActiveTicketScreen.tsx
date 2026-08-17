import React, { useState } from 'react';
import { ArrowLeft, Clock, Bell, QrCode, CheckCircle2, AlertCircle, Share2, Trash2 } from 'lucide-react';
import { VirtualTicket } from '../../../types/ticket';

interface ActiveTicketScreenProps {
  ticket: VirtualTicket | null;
  onBack: () => void;
  onCancelTicket: (id: string) => void;
  onToggleNotification: () => void;
  onNewTicket: () => void;
}

export const ActiveTicketScreen: React.FC<ActiveTicketScreenProps> = ({
  ticket,
  onBack,
  onCancelTicket,
  onToggleNotification,
  onNewTicket,
}) => {
  const [notified, setNotified] = useState(true);

  if (!ticket) {
    return (
      <div className="flex-1 bg-slate-50 p-6 flex flex-col items-center justify-center text-center space-y-4 select-none">
        <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
          <QrCode className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-800">Aucun ticket actif</h3>
          <p className="text-xs text-slate-500 max-w-xs mt-1">
            Prenez un ticket virtuel pour éviter la file d'attente au studio.
          </p>
        </div>
        <button
          onClick={onNewTicket}
          className="py-2.5 px-6 bg-[#4318FF] text-white rounded-full text-xs font-bold shadow-md cursor-pointer hover:bg-[#3713D6]"
        >
          Prendre un ticket
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 flex flex-col justify-between p-4 select-none overflow-y-auto">
      {/* Top Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-black text-slate-900">Ticket en Direct</h2>
            <p className="text-[10px] text-slate-400">Guichet Studio Fotolou</p>
          </div>
          <button
            onClick={() => onCancelTicket(ticket.id)}
            className="w-9 h-9 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors cursor-pointer"
            title="Annuler le ticket"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Realistic Ticket Voucher Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
          {/* Top Ticket Header */}
          <div className="bg-[#4318FF] p-4 text-white text-center space-y-1 relative">
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-200">
              {ticket.serviceName}
            </span>
            <div className="text-4xl font-black tracking-tight">{ticket.ticketNumber}</div>
            <div className="text-[11px] text-indigo-100 font-medium">
              Guichet assigné : <span className="font-extrabold text-white">Guichet {ticket.counterNumber || '1'}</span>
            </div>
          </div>

          {/* Notch cutouts */}
          <div className="relative flex items-center justify-between px-2 bg-white">
            <div className="w-4 h-6 bg-slate-50 rounded-r-full -ml-3 border-r border-t border-b border-slate-200" />
            <div className="flex-1 border-b-2 border-dashed border-slate-200 mx-2" />
            <div className="w-4 h-6 bg-slate-50 rounded-l-full -mr-3 border-l border-t border-b border-slate-200" />
          </div>

          {/* Ticket Stats & QR */}
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Devant vous</div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">
                  {ticket.peopleAhead}
                </div>
                <div className="text-[9px] text-slate-500">personne(s)</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Attente estimée</div>
                <div className="text-2xl font-black text-[#4318FF] mt-0.5">
                  {ticket.estimatedWaitMinutes}
                </div>
                <div className="text-[9px] text-slate-500">minutes</div>
              </div>
            </div>

            {/* QR Code Presentation */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-24 h-24 bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-center shadow-xs">
                <QrCode className="w-20 h-20 text-slate-900" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">ID: {ticket.id.slice(0, 10)}</span>
            </div>
          </div>
        </div>

        {/* SMS Notification Banner */}
        <div
          onClick={() => {
            setNotified(!notified);
            onToggleNotification();
          }}
          className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
              notified ? 'bg-[#4318FF] text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <Bell className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Alerte SMS de passage</div>
              <div className="text-[10px] text-slate-500">Notification 2 minutes avant votre tour</div>
            </div>
          </div>
          <span className={`text-xs font-extrabold ${notified ? 'text-[#4318FF]' : 'text-slate-400'}`}>
            {notified ? 'Actif' : 'Inactif'}
          </span>
        </div>
      </div>
    </div>
  );
};
