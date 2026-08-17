import React from 'react';
import { Users, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

interface ClientProfileScreenProps {
  phoneNumber?: string;
  userName?: string;
  ticketsCount?: number;
  servedCount?: number;
  onOpenRelatives: () => void;
  onOpenSettings?: () => void;
  onOpenHelp?: () => void;
  onLogout: () => void;
  onSwitchToPro?: () => void;
}

export const ClientProfileScreen: React.FC<ClientProfileScreenProps> = ({
  phoneNumber = '+221 77 862 70 52',
  userName = 'BAKARY',
  ticketsCount = 5,
  servedCount = 25,
  onOpenRelatives,
  onOpenSettings,
  onOpenHelp,
  onLogout,
  onSwitchToPro,
}) => {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden text-slate-900">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {/* User Identity */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-20 h-20 rounded-full bg-[#4318FF] text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md">
            {userName.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-wider uppercase">
              {userName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
              {phoneNumber}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* Tickets */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-1">
            <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
              TICKETS
            </div>
            <div className="text-2xl font-black text-slate-900">
              {ticketsCount}
            </div>
            <div className="w-12 h-1 bg-[#818cf8] rounded-full mt-2" />
          </div>

          {/* Servis */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-1">
            <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
              SERVIS
            </div>
            <div className="text-2xl font-black text-slate-900">
              {servedCount}
            </div>
            <div className="w-16 h-1 bg-[#4318FF] rounded-full mt-2" />
          </div>
        </div>

        {/* Menu Navigation Items */}
        <div className="space-y-2 pt-2">
          {/* Mes Proches */}
          <button
            onClick={onOpenRelatives}
            className="w-full p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-xs flex items-center justify-between transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="text-slate-600 group-hover:text-[#4318FF] transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#4318FF] transition-colors">
                Mes Proches
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#4318FF] transition-colors" />
          </button>

          {/* Paramètres */}
          <button
            onClick={onOpenSettings}
            className="w-full p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-xs flex items-center justify-between transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="text-slate-600 group-hover:text-[#4318FF] transition-colors">
                <Settings className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#4318FF] transition-colors">
                Paramètres
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#4318FF] transition-colors" />
          </button>

          {/* Aide & Support */}
          <button
            onClick={onOpenHelp}
            className="w-full p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-xs flex items-center justify-between transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="text-slate-600 group-hover:text-[#4318FF] transition-colors">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#4318FF] transition-colors">
                Aide & Support
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#4318FF] transition-colors" />
          </button>
        </div>
        {/* Switch to Pro Mode Button */}
        {onSwitchToPro && (
          <div className="pt-2">
            <button
              onClick={onSwitchToPro}
              className="w-full p-4 rounded-2xl bg-[#F4F7FE] border border-[#4318FF]/20 hover:border-[#4318FF]/50 shadow-xs flex items-center justify-between transition-all cursor-pointer group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <div className="text-[#4318FF] transition-colors">
                  <Settings className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs sm:text-sm font-black text-[#4318FF] block">
                    Mode Gérant / Salon (Pro)
                  </span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    Gérer la file d'attente et les clients
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#4318FF]" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Logout Button */}
      <div className="p-5 pt-2 pb-4 bg-white shrink-0">
        <button
          onClick={onLogout}
          className="w-full py-3.5 px-6 bg-[#F4F7FE] hover:bg-slate-100 active:scale-[0.99] text-slate-700 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};
