import React from 'react';
import { Clock, Users, Bell, CheckCircle2, QrCode, Sparkles } from 'lucide-react';
import { VirtualTicket } from '../../../types/ticket';
import { Badge } from '../../../shared/ui/Badge';

interface VirtualTicketCardProps {
  ticket: VirtualTicket;
  onNotifyMe?: () => void;
}

export const VirtualTicketCard: React.FC<VirtualTicketCardProps> = ({
  ticket,
  onNotifyMe,
}) => {
  const isCalling = ticket.status === 'in_progress';
  const isCompleted = ticket.status === 'completed';

  return (
    <div className="relative w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden select-none text-slate-900 transition-all">
      {/* Top Header Ticket */}
      <div className={`p-6 text-white text-center relative ${
        isCalling ? 'bg-linear-to-br from-emerald-600 to-teal-700 animate-pulse' : 'bg-linear-to-br from-[#4318FF] to-[#3000C8]'
      }`}>
        <div className="flex items-center justify-between text-xs font-semibold text-white/80 mb-2">
          <span>TICKET VIRTUEL</span>
          <span className="font-mono">{ticket.createdAt}</span>
        </div>

        <div className="my-2">
          <span className="text-4xl sm:text-5xl font-black tracking-tight drop-shadow-sm font-mono">
            {ticket.ticketNumber}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-medium text-white/90 truncate max-w-xs mx-auto">
          {ticket.serviceName}
        </p>

        {isCalling && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white text-emerald-800 rounded-full font-extrabold text-xs shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            C’EST VOTRE TOUR AU GUICHET {ticket.counterNumber || 1} !
          </div>
        )}
      </div>

      {/* Ticket Cutout Divider with dashed line */}
      <div className="relative flex items-center bg-slate-50 py-3 px-4">
        <div className="w-4 h-8 bg-slate-900 rounded-r-full -ml-4" />
        <div className="flex-1 border-t-2 border-dashed border-slate-300 mx-2" />
        <div className="w-4 h-8 bg-slate-900 rounded-l-full -mr-4" />
      </div>

      {/* Ticket Details & Queue Info */}
      <div className="p-6 pt-2 bg-slate-50 space-y-4">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 mb-1">
              <Users className="w-3.5 h-3.5 text-[#4318FF]" />
              <span>Position file</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">
              {isCalling ? 'Guichet' : `${ticket.queuePosition}e`}
            </div>
            <span className="text-[10px] text-slate-400">
              {ticket.queuePosition === 0 ? 'En cours' : `${ticket.queuePosition - 1} avant vous`}
            </span>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Attente estimée</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">
              {isCalling ? 'Immédiat' : `~${ticket.estimatedWaitMinutes} min`}
            </div>
            <span className="text-[10px] text-slate-400">Temps réel</span>
          </div>
        </div>

        {/* Client details & QR info */}
        <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200/80">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">{ticket.clientName}</p>
            <p className="text-[11px] text-slate-500 font-mono">{ticket.clientPhone}</p>
          </div>
          <div className="p-2 bg-slate-100 rounded-xl text-slate-700">
            <QrCode className="w-6 h-6" />
          </div>
        </div>

        {/* Notification Alert Trigger */}
        <button
          onClick={onNotifyMe}
          className="w-full py-3 px-4 bg-[#4318FF] hover:bg-[#3713D6] active:scale-[0.99] text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span>M'avertir par SMS / Vibration lors de l'appel</span>
        </button>
      </div>
    </div>
  );
};
