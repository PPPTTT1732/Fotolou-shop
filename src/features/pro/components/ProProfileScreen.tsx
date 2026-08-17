import React, { useState } from 'react';
import {
  Bell,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronRight,
  LogOut,
  Repeat,
  Store,
  Clock,
  Users,
  CheckCircle2,
  X,
} from 'lucide-react';

interface ProProfileScreenProps {
  onSwitchToClient: () => void;
  onLogout?: () => void;
  onNotificationsClick?: () => void;
}

export const ProProfileScreen: React.FC<ProProfileScreenProps> = ({
  onSwitchToClient,
  onLogout,
  onNotificationsClick,
}) => {
  const [activeModal, setActiveModal] = useState<'stats' | 'settings' | 'help' | null>(null);

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden text-slate-900">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-end shrink-0">
        <button
          onClick={onNotificationsClick}
          className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors relative cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4318FF]" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-6">
        {/* Profile Card */}
        <div className="flex flex-col items-center justify-center text-center pt-2 pb-2 space-y-3">
          {/* Avatar Circle */}
          <div className="w-20 h-20 rounded-full bg-[#4318FF] text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-[#4318FF]/25">
            B
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 tracking-wide uppercase">
              BAKARY
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              +221 77 862 70 52
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#4318FF] text-xs font-bold">
            <Store className="w-3.5 h-3.5" />
            <span>Gérant • King Barber</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {/* Statistiques */}
          <button
            onClick={() => setActiveModal('stats')}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#4318FF] flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-800">
                Statistiques
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Paramètres */}
          <button
            onClick={() => setActiveModal('settings')}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-800">
                Paramètres
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Aide & Support */}
          <button
            onClick={() => setActiveModal('help')}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-800">
                Aide & Support
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Switch Mode Button */}
        <div className="pt-1">
          <button
            onClick={onSwitchToClient}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#F4F7FE] hover:bg-[#EDE9FE] text-[#4318FF] flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-colors cursor-pointer border border-[#E2E8F0]"
          >
            <Repeat className="w-4 h-4" />
            <span>Basculer vers l'espace Client</span>
          </button>
        </div>

        {/* Logout Button */}
        <div className="pt-1">
          <button
            onClick={onLogout || onSwitchToClient}
            className="w-full py-3 px-5 rounded-2xl bg-white border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Modal: Statistiques */}
      {activeModal === 'stats' && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-5 z-50 animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4 relative animate-scale-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">
                Statistiques du jour
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-[#F4F7FE] rounded-2xl space-y-1">
                <Users className="w-4 h-4 text-[#4318FF]" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Total Clients</p>
                <p className="text-2xl font-black text-slate-900">30</p>
              </div>
              <div className="p-3.5 bg-[#E6F9F0] rounded-2xl space-y-1">
                <CheckCircle2 className="w-4 h-4 text-[#05CD99]" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Clients Servis</p>
                <p className="text-2xl font-black text-[#05CD99]">25</p>
              </div>
              <div className="p-3.5 bg-amber-50 rounded-2xl space-y-1">
                <Clock className="w-4 h-4 text-amber-600" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Temps Moyen</p>
                <p className="text-2xl font-black text-amber-600">18 min</p>
              </div>
              <div className="p-3.5 bg-purple-50 rounded-2xl space-y-1">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Satisfaction</p>
                <p className="text-2xl font-black text-purple-600">98%</p>
              </div>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 bg-[#4318FF] text-white rounded-2xl text-xs font-bold cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal: Paramètres */}
      {activeModal === 'settings' && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-5 z-50 animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4 relative animate-scale-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">
                Paramètres Salon
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <span className="font-bold text-slate-800">Alertes SMS automatiques</span>
                <span className="text-[#05CD99] font-bold">Activé</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <span className="font-bold text-slate-800">Délai estimé par coupe</span>
                <span className="text-slate-600 font-bold">20 min</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <span className="font-bold text-slate-800">Nombre de fauteuils</span>
                <span className="text-slate-600 font-bold">3 fauteuils</span>
              </div>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 bg-[#4318FF] text-white rounded-2xl text-xs font-bold cursor-pointer"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}

      {/* Modal: Aide & Support */}
      {activeModal === 'help' && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-5 z-50 animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4 relative animate-scale-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">
                Centre d'assistance
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Besoin d'aide pour configurer votre file d'attente ou gérer vos rendez-vous ? Notre équipe support est à votre disposition.
            </p>
            <div className="space-y-2 text-xs">
              <a
                href="tel:+221778627052"
                className="block p-3 bg-slate-50 rounded-2xl font-bold text-slate-800 hover:bg-slate-100"
              >
                📞 Support Téléphonique (+221 77 862 70 52)
              </a>
              <a
                href="mailto:support@kingbarber.sn"
                className="block p-3 bg-slate-50 rounded-2xl font-bold text-slate-800 hover:bg-slate-100"
              >
                ✉️ support@kingbarber.sn
              </a>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 bg-[#4318FF] text-white rounded-2xl text-xs font-bold cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
