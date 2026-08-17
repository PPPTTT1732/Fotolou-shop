import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { InstallBanner } from '../../pwa/installation/InstallBanner';
import { OfflineBanner } from '../../pwa/offline/OfflineBanner';
import { AppRoute } from '../../config/routes.config';

interface LayoutProps {
  children: React.ReactNode;
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  onNewBooking: () => void;
  bookingCount?: number;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentRoute,
  onRouteChange,
  onNewBooking,
  bookingCount,
}) => {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <InstallBanner />
      <OfflineBanner />
      <Header onNewBooking={onNewBooking} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          currentRoute={currentRoute}
          onRouteChange={onRouteChange}
          bookingCount={bookingCount}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-y-auto max-w-5xl">
          {children}
        </main>
      </div>

      <MobileBottomNav currentRoute={currentRoute} onRouteChange={onRouteChange} />
    </div>
  );
};
