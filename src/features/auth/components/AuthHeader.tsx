import React from 'react';
import { Smartphone } from 'lucide-react';
import { AppScreen } from '../hooks/useAuthFlow';

interface AuthHeaderProps {
  screen: AppScreen;
  viewMode: 'interactive' | 'grid';
  onSelectScreen: (screen: AppScreen) => void;
  onToggleViewMode: () => void;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  screen,
  viewMode,
  onSelectScreen,
  onToggleViewMode,
}) => {
  const screensList: { id: AppScreen; label: string }[] = [
    { id: 'splash', label: '01 · Splash' },
    { id: 'onboarding', label: '02 · Onboarding' },
    { id: 'login', label: '05 · Login' },
    { id: 'otp', label: '05 · OTP' },
    { id: 'home', label: 'Accueil App' },
    { id: 'ticket', label: 'Ticket Live' },
    { id: 'photos', label: 'Photos' },
    { id: 'profile', label: 'Profil' },
  ];

  return (
    <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#4318FF] flex items-center justify-center text-white font-black text-sm shadow-md">
            F
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">FOTOLOU</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#4318FF]/20 text-[#8165FF] border border-[#4318FF]/40">
                Figma 1:1
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Moins d'attente. Plus de temps.</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
          {screensList.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectScreen(item.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                screen === item.id && viewMode === 'interactive'
                  ? 'bg-[#4318FF] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={onToggleViewMode}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'grid'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vue Grille</span>
          </button>
        </div>
      </div>
    </header>
  );
};
