import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { Booking } from '../../../types/booking';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';

interface ReservationCalendarProps {
  bookings: Booking[];
  onSelectBooking?: (booking: Booking) => void;
  onDateSelect?: (dateStr: string) => void;
}

export const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  bookings,
  onSelectBooking,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-17');

  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  // Current calendar month view for Aug 2026
  const augustDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-08-${day.toString().padStart(2, '0')}`;
    const dayBookings = bookings.filter(b => b.date === dateStr);
    return { day, dateStr, dayBookings };
  });

  const selectedDayBookings = bookings.filter(b => b.date === selectedDate);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Card className="lg:col-span-2" padding="md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
            Août 2026 • Planning Studio
          </h3>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-300">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold px-2">Août 2026</span>
            <button className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-300">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-stone-400 mb-2">
          {daysOfWeek.map(d => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Aug 1st 2026 was Saturday (offset 5 empty cells) */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`empty-${i}`} className="h-14 sm:h-20 rounded-xl bg-stone-50/50 dark:bg-stone-900/30 opacity-25" />
          ))}

          {augustDays.map(({ day, dateStr, dayBookings }) => {
            const isSelected = selectedDate === dateStr;
            const isToday = dateStr === '2026-08-17';

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`h-14 sm:h-20 p-1.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 shadow-xs'
                    : isToday
                    ? 'border-stone-400 dark:border-stone-600 bg-stone-50 dark:bg-stone-800/40'
                    : 'border-stone-100 dark:border-stone-800/60 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-semibold ${isToday ? 'text-amber-600 font-bold' : 'text-stone-700 dark:text-stone-300'}`}>
                    {day}
                  </span>
                  {dayBookings.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                  )}
                </div>

                {dayBookings.length > 0 && (
                  <div className="hidden sm:block truncate text-[10px] text-amber-700 dark:text-amber-300 font-medium truncate w-full">
                    {dayBookings[0].clientName.split(' ')[0]} ({dayBookings.length})
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      <Card padding="md" className="space-y-3">
        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-2">
          Séances du {selectedDate}
        </h4>

        {selectedDayBookings.length === 0 ? (
          <p className="text-xs text-stone-400 text-center py-8">
            Aucun créneau réservé pour cette journée.
          </p>
        ) : (
          <div className="space-y-2.5">
            {selectedDayBookings.map(b => (
              <div
                key={b.id}
                onClick={() => onSelectBooking?.(b)}
                className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/80 dark:border-stone-700 hover:border-amber-500/50 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{b.startTime} - {b.endTime}</span>
                  <Badge variant="amber" size="sm">{b.category}</Badge>
                </div>
                <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">{b.clientName}</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">{b.prestationName}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
