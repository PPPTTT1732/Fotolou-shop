import React from 'react';
import { Clock, MapPin, ArrowRight, Calendar } from 'lucide-react';
import { Booking } from '../../../types/booking';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';

interface TodayScheduleProps {
  bookings: Booking[];
  onViewAll: () => void;
  onSelectBooking: (booking: Booking) => void;
}

export const TodaySchedule: React.FC<TodayScheduleProps> = ({
  bookings,
  onViewAll,
  onSelectBooking,
}) => {
  // Séances du jour
  const todayBookings = bookings.filter(b => b.date === '2026-08-17');

  return (
    <Card padding="md" className="space-y-3">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            Planning du Jour (17 Août)
          </h3>
          <p className="text-xs text-stone-400">
            {todayBookings.length} séance{todayBookings.length > 1 ? 's' : ''} programmée{todayBookings.length > 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onViewAll}>
          Voir tout <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {todayBookings.length === 0 ? (
        <p className="text-xs text-stone-400 py-6 text-center">
          Aucun shooting prévu pour le moment aujourd'hui.
        </p>
      ) : (
        <div className="space-y-2.5">
          {todayBookings.map((b) => (
            <div
              key={b.id}
              onClick={() => onSelectBooking(b)}
              className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/80 dark:border-stone-700/80 hover:border-amber-500/50 cursor-pointer transition-all flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-mono">
                    {b.startTime} - {b.endTime}
                  </span>
                  <Badge variant="amber" size="sm">
                    {b.category}
                  </Badge>
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                  {b.clientName}
                </h4>
                <p className="text-[11px] text-stone-500 truncate">{b.prestationName}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  {b.totalPrice}€
                </span>
                <div className="text-[10px] text-stone-400">{b.location}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
