import React from 'react';
import { Bell, Plus, Wifi, WifiOff, Ticket } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { useNetworkStatus } from '../../platform/hooks/useNetworkStatus';

interface HeaderProps {
  onNewBooking: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onNewBooking, unreadCount = 1 }) => {
  const isOnline = useNetworkStatus();

  return (
    <header className="sticky top-0 z-30 bg-stone-900 border-b border-stone-800 text-stone-100 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        {/* Ticket Logo Mark */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5 mr-0.5">
            <div className="h-0.5 w-2 rounded-full bg-white" />
            <div className="h-0.5 w-3 rounded-full bg-white" />
            <div className="h-0.5 w-2 rounded-full bg-white" />
          </div>
          <div
            className="w-7 h-8 bg-[#4318FF] text-white rounded-lg flex items-center justify-center font-black text-sm tracking-tight shadow-md"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 85% 100%, 70% 88%, 50% 100%, 30% 88%, 15% 100%, 0% 88%)'
            }}
          >
            F
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold tracking-tight text-base text-white">
                Fotolou
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#4318FF]/20 text-[#8165FF] border border-[#4318FF]/40">
                PWA
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-normal hidden sm:block mt-0.5">
              Moins d’attente. Plus de temps.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-800 border border-stone-700 text-xs">
          {isOnline ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-stone-300 text-[11px] hidden sm:inline font-medium">En direct</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-rose-400" />
              <span className="text-rose-400 text-[11px] font-medium">Hors-ligne</span>
            </>
          )}
        </div>

        <button
          className="relative p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4318FF]" />
          )}
        </button>

        <button
          onClick={onNewBooking}
          className="py-1.5 px-3 bg-[#4318FF] hover:bg-[#3713D6] active:scale-95 text-white rounded-full text-xs font-bold transition-all flex items-center gap-1 shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ticket / RDV</span>
        </button>
      </div>
    </header>
  );
};

