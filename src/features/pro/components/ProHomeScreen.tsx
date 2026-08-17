import React from 'react';
import { Bell, TrendingUp } from 'lucide-react';
import { ProQueueClient } from '../../../types/salon';

interface ProHomeScreenProps {
  waitingCount: number;
  inProgressCount: number;
  servedCount: number;
  isQueueOpen: boolean;
  onToggleQueue: () => void;
  recentActivity: ProQueueClient[];
  onNotificationsClick?: () => void;
  onGoToQueue?: () => void;
}

export const ProHomeScreen: React.FC<ProHomeScreenProps> = ({
  waitingCount = 12,
  inProgressCount = 5,
  servedCount = 25,
  isQueueOpen = true,
  onToggleQueue,
  recentActivity,
  onNotificationsClick,
  onGoToQueue,
}) => {
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden text-slate-900">
      {/* Top Header / Notification Bell */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-end shrink-0">
        <button
          onClick={onNotificationsClick}
          className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors relative cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4318FF]" />
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
        {/* Hero Card: CLIENTS EN ATTENTE */}
        <div
          onClick={onGoToQueue}
          className="relative w-full h-48 sm:h-52 rounded-3xl overflow-hidden bg-slate-900 p-5 flex flex-col justify-between shadow-md cursor-pointer group"
        >
          {/* Background Image with Overlay */}
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80"
            alt="Salon Interior"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

          {/* Top Label & Toggle */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-white/90 drop-shadow-xs">
              CLIENTS EN ATTENTE
            </span>

            {/* iOS Style Switch: Green (Open) vs Red (Closed/Paused) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleQueue();
              }}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                isQueueOpen ? 'bg-[#05CD99]' : 'bg-[#EF4444]'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-md ${
                  isQueueOpen ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Bottom Numbers & Trend Badge */}
          <div className="relative z-10 flex items-baseline gap-3">
            <span className="text-5xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md leading-none">
              {waitingCount}
            </span>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold">
              <TrendingUp className="w-3 h-3 stroke-[2.5]" />
              <span>+18% vs hier</span>
            </div>
          </div>
        </div>

        {/* 2 Stats Cards: EN COURS / SERVIS */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* EN COURS */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-1">
            <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
              EN COURS
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {inProgressCount}
            </div>
            <div className="w-10 h-1 bg-[#818cf8] rounded-full mt-2" />
          </div>

          {/* SERVIS */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-1">
            <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
              SERVIS
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {servedCount}
            </div>
            <div className="w-24 h-1 bg-[#4318FF] rounded-full mt-2" />
          </div>
        </div>

        {/* Activité Récente */}
        <div className="space-y-3 pt-2">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            Activité récente
          </h2>

          <div className="space-y-2.5">
            {recentActivity.map((act) => {
              const isServed = act.status === 'served';
              const initial = act.name.charAt(0);
              const isYellow = isServed;

              return (
                <div
                  key={act.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar box */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-base ${
                        isYellow
                          ? 'bg-[#FEF3C7] text-[#D97706]'
                          : 'bg-[#EDE9FE] text-[#4318FF]'
                      }`}
                    >
                      {initial}
                    </div>

                    {/* Text */}
                    <div className="space-y-0.5">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {act.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {act.timeLabel || 'Hier, 14h36'}
                      </p>
                    </div>
                  </div>

                  {/* Badge */}
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
      </div>
    </div>
  );
};
