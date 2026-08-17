import React from 'react';
import { DashboardStats } from '../features/dashboard/components/DashboardStats';
import { TodaySchedule } from '../features/dashboard/components/TodaySchedule';
import { QuickActions } from '../features/dashboard/components/QuickActions';
import { RecentGalleriesBanner } from '../features/dashboard/components/RecentGalleriesBanner';
import { Booking } from '../types/booking';
import { Client } from '../types/client';
import { Gallery } from '../types/gallery';
import { PaymentRecord } from '../types/payment';

interface DashboardViewProps {
  bookings: Booking[];
  clients: Client[];
  galleries: Gallery[];
  payments: PaymentRecord[];
  onNavigateTo: (route: string) => void;
  onNewBooking: () => void;
  onNewGallery: () => void;
  onNewClient: () => void;
  onNewPayment: () => void;
  onSelectBooking: (booking: Booking) => void;
  onOpenGallery: (gallery: Gallery) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  bookings,
  clients,
  galleries,
  payments,
  onNavigateTo,
  onNewBooking,
  onNewGallery,
  onNewClient,
  onNewPayment,
  onSelectBooking,
  onOpenGallery,
}) => {
  return (
    <div className="space-y-5">
      <DashboardStats
        bookings={bookings}
        clients={clients}
        galleries={galleries}
        payments={payments}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TodaySchedule
          bookings={bookings}
          onViewAll={() => onNavigateTo('reservations')}
          onSelectBooking={onSelectBooking}
        />
        <QuickActions
          onNewBooking={onNewBooking}
          onNewGallery={onNewGallery}
          onNewClient={onNewClient}
          onNewPayment={onNewPayment}
        />
      </div>

      <RecentGalleriesBanner
        galleries={galleries}
        onViewGalleries={() => onNavigateTo('galleries')}
        onOpenGallery={onOpenGallery}
      />
    </div>
  );
};
