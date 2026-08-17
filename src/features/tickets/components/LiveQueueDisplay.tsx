import React from 'react';
import { VirtualTicket } from '../../../types/ticket';
import { Volume2, ArrowRight, CheckCircle2, UserCheck } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';

interface LiveQueueDisplayProps {
  tickets: VirtualTicket[];
  onCallNext: (counter: number) => void;
  onComplete: (ticketId: string) => void;
}

export const LiveQueueDisplay: React.FC<LiveQueueDisplayProps> = ({
  tickets,
  onCallNext,
  onComplete,
}) => {
  const activeCalling = tickets.find((t) => t.status === 'in_progress');
  const waitingTickets = tickets.filter((t) => t.status === 'waiting');

  return (
    <div className="space-y-4">
      {/* Main Calling Banner */}
      <div className="p-5 sm:p-6 bg-linear-to-br from-[#4318FF] to-[#2600A3] text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Volume2 className="w-4 h-4 animate-bounce" />
            <span>Guichet Appel en direct</span>
          </div>
          {activeCalling ? (
            <div className="mt-2">
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                {activeCalling.ticketNumber}
              </div>
              <p className="text-xs text-white/80 mt-1">
                {activeCalling.clientName} • Guichet {activeCalling.counterNumber || 1} ({activeCalling.serviceName})
              </p>
            </div>
          ) : (
            <div className="mt-2 text-2xl font-bold text-white/90">
              Aucun ticket en cours d'appel
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeCalling && (
            <button
              onClick={() => onComplete(activeCalling.id)}
              className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Valider passage</span>
            </button>
          )}
          <button
            onClick={() => onCallNext(1)}
            className="py-2.5 px-4 bg-white hover:bg-slate-100 text-[#4318FF] active:scale-95 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <span>Appeler Suivant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Next in line queue */}
      <Card padding="md" className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Prochains tickets en attente ({waitingTickets.length})
        </h4>

        {waitingTickets.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">Aucun ticket en attente dans la file.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {waitingTickets.map((t) => (
              <div
                key={t.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-stone-800/60 border border-slate-200/80 dark:border-stone-700 flex items-center justify-between"
              >
                <div>
                  <span className="text-base font-extrabold text-[#4318FF] font-mono">
                    {t.ticketNumber}
                  </span>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[140px]">
                    {t.clientName}
                  </p>
                  <span className="text-[10px] text-slate-400">{t.serviceName}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Pos. {t.queuePosition}
                  </span>
                  <div className="text-[10px] text-amber-600 font-bold">~{t.estimatedWaitMinutes} min</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
