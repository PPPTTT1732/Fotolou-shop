import React from 'react';
import { ArrowLeft, MessageSquare, XCircle } from 'lucide-react';
import { SalonTicket } from '../../../types/salon';

interface LiveTicketScreenProps {
  ticket: SalonTicket;
  onBack: () => void;
  onLeaveQueue: (ticket: SalonTicket) => void;
}

export const LiveTicketScreen: React.FC<LiveTicketScreenProps> = ({
  ticket,
  onBack,
  onLeaveQueue,
}) => {
  const isYourTurn = ticket.status === 'your_turn';

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden text-slate-900">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shrink-0">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-slate-900">
          Ticket
        </h1>
        <div className="w-6" /> {/* Placeholder for balance */}
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Ticket Header */}
        <div className="text-center space-y-1">
          <div className="text-[11px] font-extrabold tracking-wider uppercase text-[#4318FF]">
            {isYourTurn ? 'MON TOUR' : 'EN ATTENTE'}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Ticket pour: {ticket.beneficiaryName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            {ticket.salonName} • {ticket.salonLocation}
          </p>
        </div>

        {/* Circular Gauge */}
        <div className="relative w-48 h-48 sm:w-52 sm:h-52 mx-auto flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              className="text-slate-100"
              strokeWidth="5"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Progress Arc */}
            <circle
              cx="50"
              cy="50"
              r="42"
              className="text-[#4318FF]"
              strokeWidth="5.5"
              strokeDasharray={264}
              strokeDashoffset={isYourTurn ? 66 : 132}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Huge Center Ticket Number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tighter leading-none">
              {ticket.ticketNumber}
            </span>
          </div>
        </div>

        {/* 2-Column Stat Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Numéro en cours */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-1">
            <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
              NUMERO EN COURS
            </div>
            <div className="text-3xl font-extrabold text-slate-900">
              {ticket.currentNumber || 3}
            </div>
          </div>

          {/* Statut */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2 flex flex-col justify-between">
            <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
              STATUT
            </div>
            <div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E6F9F0] text-[#05CD99] inline-block">
                Ouvert
              </span>
            </div>
          </div>
        </div>

        {/* SMS Notification Banner */}
        <div className="bg-[#EEF2FF] rounded-2xl p-4 flex items-start gap-3 text-slate-800">
          <div className="w-8 h-8 rounded-full bg-[#4318FF] text-white flex items-center justify-center shrink-0 mt-0.5">
            <MessageSquare className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700">
            Un SMS sera envoyé à{' '}
            <span className="font-bold text-[#4318FF]">
              {ticket.notificationPhone || '+221 77 862 70 52'}
            </span>{' '}
            dès que votre tour approchera.
          </p>
        </div>
      </div>

      {/* Bottom Red CTA Button */}
      <div className="p-5 pt-2 pb-4 bg-white border-t border-slate-100 shrink-0">
        <button
          onClick={() => onLeaveQueue(ticket)}
          className="w-full py-3.5 px-6 bg-[#FFEBEE] hover:bg-[#FFCDD2] active:scale-[0.99] text-[#EF4444] rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <XCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Quitter la file</span>
        </button>
      </div>
    </div>
  );
};
