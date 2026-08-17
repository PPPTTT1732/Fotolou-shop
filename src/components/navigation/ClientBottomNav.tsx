import React from 'react';
import { Home, Ticket, Store, User } from 'lucide-react';

export type MainTab = 'home' | 'tickets' | 'shop' | 'profile';

interface ClientBottomNavProps {
  activeTab: MainTab;
  onChangeTab: (tab: MainTab) => void;
  activeTicketsCount?: number;
}

export const ClientBottomNav: React.FC<ClientBottomNavProps> = ({
  activeTab,
  onChangeTab,
  activeTicketsCount = 3,
}) => {
  const tabs = [
    {
      id: 'home' as MainTab,
      label: 'Accueil',
      icon: Home,
    },
    {
      id: 'tickets' as MainTab,
      label: 'Mes tickets',
      icon: Ticket,
      badge: activeTicketsCount > 0 ? activeTicketsCount : undefined,
    },
    {
      id: 'shop' as MainTab,
      label: 'Boutique',
      icon: Store,
    },
    {
      id: 'profile' as MainTab,
      label: 'Profil',
      icon: User,
    },
  ];

  return (
    <div className="w-full bg-white border-t border-slate-100 px-6 py-2.5 flex items-center justify-around z-30 shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all relative py-1 px-3 cursor-pointer ${
              isActive ? 'text-[#4318FF]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'stroke-[2.4] scale-105' : 'stroke-[1.8]'
                }`}
              />
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#4318FF] text-white text-[9px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[11px] leading-tight font-medium ${
                isActive ? 'font-bold text-[#4318FF]' : 'text-slate-400'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
