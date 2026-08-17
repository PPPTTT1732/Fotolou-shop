import React, { useState } from 'react';
import { ChevronRight, Filter } from 'lucide-react';
import { SalonTicket } from '../../../types/salon';

interface TicketsScreenProps {
  activeTickets: SalonTicket[];
  historyTickets: SalonTicket[];
  onSelectTicket: (ticket: SalonTicket) => void;
  onFilterClick?: () => void;
}

export const TicketsScreen: React.FC<TicketsScreenProps> = ({
  activeTickets,
  historyTickets,
  onSelectTicket,
  onFilterClick,
}) => {
  const [tab, setTab] = useState<'current' | 'history'>('current');

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden text-slate-900">
      {/* Top Segmented Control */}
      <div className="p-5 pb-3 shrink-0">
        <div className="w-full bg-[#F4F7FE] p-1 rounded-2xl flex items-center">
          <button
            onClick={() => setTab('current')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              tab === 'current'
                ? 'bg-[#4318FF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Actuel
          </button>
          <button
            onClick={() => setTab('history')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              tab === 'history'
                ? 'bg-[#4318FF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Historiques
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
        {tab === 'current' ? (
          /* Tab: Actuel */
          <div className="space-y-3 pt-1">
            {activeTickets.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <p className="text-sm font-medium">Aucun ticket en cours</p>
                <p className="text-xs">Prenez un ticket dans un salon pour le voir ici.</p>
              </div>
            ) : (
              activeTickets.map((ticket) => {
                const isYourTurn = ticket.status === 'your_turn';
                return (
                  <div
                    key={ticket.id}
                    onClick={() => onSelectTicket(ticket)}
                    className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md hover:border-slate-200 transition-all flex items-center justify-between cursor-pointer group active:scale-[0.99]"
                  >
                    <div className="space-y-1">
                      {/* Status indicator */}
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isYourTurn ? 'bg-[#05CD99]' : 'bg-[#FFBA08]'
                          }`}
                        />
                        <span
                          className={`text-[10px] font-extrabold tracking-wider uppercase ${
                            isYourTurn ? 'text-[#05CD99]' : 'text-slate-700'
                          }`}
                        >
                          {isYourTurn ? 'VOTRE TOUR' : 'EN ATTENTE'}
                        </span>
                      </div>

                      {/* Salon Name */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#4318FF] transition-colors">
                        {ticket.salonName}
                      </h3>

                      {/* Beneficiary */}
                      <p className="text-xs text-slate-500 font-normal">
                        Pour: {ticket.beneficiaryName}
                      </p>
                    </div>

                    {/* Right Ticket Number & Chevron */}
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-slate-400">
                          N°
                        </div>
                        <div className="text-2xl font-black text-slate-900 leading-none">
                          {ticket.ticketNumber}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#4318FF] transition-colors" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Tab: Historiques */
          <div className="space-y-4 pt-1">
            {/* Header with Filter */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Passages récents
              </h2>
              <button
                onClick={onFilterClick}
                className="flex items-center gap-1 text-xs font-semibold text-[#4318FF] hover:underline cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filtrer</span>
              </button>
            </div>

            {/* History List */}
            <div className="space-y-3">
              {historyTickets.map((item) => {
                const isServed = item.status === 'served';
                const initial = item.salonName.charAt(0);
                const isKing = item.salonName.toLowerCase().includes('king');

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar Square */}
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-base ${
                          isKing
                            ? 'bg-[#FEF3C7] text-[#D97706]'
                            : 'bg-[#EDE9FE] text-[#4318FF]'
                        }`}
                      >
                        {initial}
                      </div>

                      {/* Info */}
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {item.salonName}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {item.timeLabel || 'Hier, 14h36'}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          isServed
                            ? 'bg-[#E6F9F0] text-[#05CD99]'
                            : 'bg-[#FEE2E2] text-[#EF4444]'
                        }`}
                      >
                        {isServed ? 'SERVI' : 'ANNULÉ'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
