import React, { useState } from 'react';
import { ReservationList } from '../features/reservations/components/ReservationList';
import { ReservationCalendar } from '../features/reservations/components/ReservationCalendar';
import { Booking } from '../types/booking';
import { Tabs } from '../shared/ui/Tabs';
import { List, Calendar as CalendarIcon } from 'lucide-react';

interface ReservationsViewProps {
  bookings: Booking[];
  onNewReservation: () => void;
  onStatusChange: (id: string, status: Booking['status']) => void;
  onSelectBooking: (booking: Booking) => void;
}

export const ReservationsView: React.FC<ReservationsViewProps> = ({
  bookings,
  onNewReservation,
  onStatusChange,
  onSelectBooking,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter((b) => {
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchQuery =
      !searchQuery.trim() ||
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.prestationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientPhone.includes(searchQuery);
    return matchStatus && matchQuery;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-stone-100">Séances & Réservations</h2>
          <p className="text-xs text-stone-400">Gestion des plannings de shooting et statut des réservations</p>
        </div>

        <Tabs
          tabs={[
            { id: 'list', label: 'Liste', icon: <List className="w-3.5 h-3.5" /> },
            { id: 'calendar', label: 'Calendrier', icon: <CalendarIcon className="w-3.5 h-3.5" /> },
          ]}
          activeTab={viewMode}
          onChange={(tab) => setViewMode(tab as 'list' | 'calendar')}
        />
      </div>

      {viewMode === 'list' ? (
        <ReservationList
          bookings={filteredBookings}
          onNewReservation={onNewReservation}
          onStatusChange={onStatusChange}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
      ) : (
        <ReservationCalendar
          bookings={bookings}
          onSelectBooking={onSelectBooking}
        />
      )}
    </div>
  );
};
