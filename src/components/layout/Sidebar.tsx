import React from 'react';
import { 
  Ticket,
  Smartphone,
  LayoutDashboard, 
  Calendar, 
  Images, 
  Users, 
  Receipt, 
  Settings,
  Sparkles
} from 'lucide-react';
import { AppRoute, APP_ROUTES } from '../../config/routes.config';

interface SidebarProps {
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  bookingCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onRouteChange,
  bookingCount = 4,
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    Ticket: <Ticket className="w-4 h-4" />,
    Smartphone: <Smartphone className="w-4 h-4" />,
    LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
    Calendar: <Calendar className="w-4 h-4" />,
    Images: <Images className="w-4 h-4" />,
    Users: <Users className="w-4 h-4" />,
    Receipt: <Receipt className="w-4 h-4" />,
    Settings: <Settings className="w-4 h-4" />,
  };

  return (
    <aside className="w-64 bg-stone-900 border-r border-stone-800 p-4 flex flex-col justify-between hidden md:flex shrink-0 min-h-[calc(100vh-57px)]">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-stone-400">
          Plateforme FOTOLOU
        </div>

        {APP_ROUTES.map((route) => {
          const isActive = currentRoute === route.id;
          return (
            <button
              key={route.id}
              onClick={() => onRouteChange(route.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#4318FF]/20 text-[#8165FF] border border-[#4318FF]/40 font-bold'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-[#8165FF]' : 'text-stone-400'}>
                  {iconMap[route.iconName]}
                </span>
                <span>{route.label}</span>
              </div>

              {route.id === 'tickets' && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#4318FF]/30 text-[#A28FFF]">
                  LIVE
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-stone-800/50 border border-stone-800 text-stone-400 text-xs">
        <div className="flex items-center gap-1.5 text-[#8165FF] font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          FOTOLOU PWA
        </div>
        <p className="text-[11px] text-stone-400">
          Moins d'attente. Plus de temps.
        </p>
      </div>
    </aside>
  );
};

