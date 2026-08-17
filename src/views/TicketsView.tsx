import React from 'react';
import { VirtualTicketCard } from '../features/tickets/components/VirtualTicketCard';
import { LiveQueueDisplay } from '../features/tickets/components/LiveQueueDisplay';
import { VirtualTicket } from '../types/ticket';
import { Ticket, Plus } from 'lucide-react';

interface TicketsViewProps {
  tickets: VirtualTicket[];
  myTicket: VirtualTicket | null;
  onTakeTicket: () => void;
  onCallNext: (counter: number) => void;
  onComplete: (ticketId: string) => void;
  onNotifyMe: () => void;
}

export const TicketsView: React.FC<TicketsViewProps> = ({
  tickets,
  myTicket,
  onTakeTicket,
  onCallNext,
  onComplete,
  onNotifyMe,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#4318FF]" />
            File d'Attente & Tickets Virtuels
          </h2>
          <p className="text-xs text-slate-400">Moins d'attente. Plus de temps. Suivi du passage en temps réel.</p>
        </div>

        <button
          onClick={onTakeTicket}
          className="py-2.5 px-4 bg-[#4318FF] hover:bg-[#3713D6] text-white rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Prendre un Ticket</span>
        </button>
      </div>

      {/* Main interactive ticket card if active */}
      {myTicket ? (
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
            Votre Ticket Actif
          </h3>
          <VirtualTicketCard ticket={myTicket} onNotifyMe={onNotifyMe} />
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
          <Ticket className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-200">Vous n'avez pas de ticket actif</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Prenez un ticket virtuel pour réserver votre ordre de passage au studio sans faire la queue.
          </p>
          <button
            onClick={onTakeTicket}
            className="py-2 px-4 bg-[#4318FF] text-white text-xs font-bold rounded-full cursor-pointer"
          >
            Prendre mon ticket maintenant
          </button>
        </div>
      )}

      {/* Live Counter Display */}
      <div className="pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold text-slate-200 mb-3">Tableau Guichet Studio</h3>
        <LiveQueueDisplay
          tickets={tickets}
          onCallNext={onCallNext}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};
