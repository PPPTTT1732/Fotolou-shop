import React from 'react';
import { Ticket, Smartphone, LayoutDashboard, Calendar, Images, Users, Receipt, Settings } from 'lucide-react';
import { AppRoute, APP_ROUTES } from '../../config/routes.config';

interface MobileBottomNavProps {
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRoute,
  onRouteChange,
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
    <nav aria-label="Navigation principale mobile" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 px-1 py-1.5 flex items-center justify-around">
      {APP_ROUTES.slice(0, 6).map((route) => {
        const isActive = currentRoute === route.id;
        return (
          <button
            key={route.id}
            onClick={() => onRouteChange(route.id)}
            className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all ${
              isActive
                ? 'text-[#8165FF] font-bold scale-105'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="mb-0.5">{iconMap[route.iconName]}</span>
            <span className="text-[9px] tracking-tight truncate max-w-[50px]">
              {route.label.split(' ')[0]}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

