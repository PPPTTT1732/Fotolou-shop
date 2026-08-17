import React from 'react';
import { Search, Calendar, Filter, Plus } from 'lucide-react';
import { Booking } from '../../../types/booking';
import { ReservationCard } from './ReservationCard';
import { Tabs } from '../../../shared/ui/Tabs';
import { Button } from '../../../shared/ui/Button';
import { EmptyState } from '../../../shared/feedback/EmptyState';

interface ReservationListProps {
  bookings: Booking[];
  onNewReservation: () => void;
  onStatusChange: (id: string, status: Booking['status']) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export const ReservationList: React.FC<ReservationListProps> = ({
  bookings,
  onNewReservation,
  onStatusChange,
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchQueryChange,
}) => {
  const statusTabs = [
    { id: 'all', label: 'Toutes', count: bookings.length },
    { id: 'confirmed', label: 'Confirmées' },
    { id: 'pending', label: 'En attente' },
    { id: 'completed', label: 'Terminées' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par client, prestation, téléphone..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onNewReservation} size="sm">
            <Plus className="w-4 h-4" />
            Nouvelle séance
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <Tabs tabs={statusTabs} activeTab={statusFilter} onChange={onStatusFilterChange} />
      </div>

      {bookings.length === 0 ? (
        <EmptyState
          icon={<Calendar className="w-8 h-8" />}
          title="Aucune séance trouvée"
          description="Aucune réservation ne correspond à vos filtres actuels ou pour cette date."
          actionLabel="Créer une réservation"
          onAction={onNewReservation}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {bookings.map((b) => (
            <ReservationCard
              key={b.id}
              booking={b}
              onStatusChange={(status) => onStatusChange(b.id, status)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
