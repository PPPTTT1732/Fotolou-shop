import React from 'react';
import { Clock, MapPin, Phone, CheckCircle2, MoreVertical, CreditCard } from 'lucide-react';
import { Booking } from '../../../types/booking';
import { Badge, BadgeVariant } from '../../../shared/ui/Badge';
import { Card } from '../../../shared/ui/Card';

interface ReservationCardProps {
  booking: Booking;
  onStatusChange?: (status: Booking['status']) => void;
  onSelect?: () => void;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  booking,
  onStatusChange,
  onSelect,
}) => {
  const statusBadges: Record<Booking['status'], { label: string; variant: BadgeVariant }> = {
    confirmed: { label: 'Confirmé', variant: 'emerald' },
    pending: { label: 'En attente', variant: 'amber' },
    completed: { label: 'Terminé', variant: 'blue' },
    cancelled: { label: 'Annulé', variant: 'rose' },
  };

  const paymentBadges: Record<Booking['paymentStatus'], { label: string; variant: BadgeVariant }> = {
    paid: { label: 'Réglé 100%', variant: 'emerald' },
    deposit_paid: { label: `Acompte (${booking.depositAmount}€)`, variant: 'amber' },
    unpaid: { label: 'Non payé', variant: 'rose' },
    refunded: { label: 'Remboursé', variant: 'stone' },
  };

  const categoryBadges: Record<Booking['category'], { label: string; variant: BadgeVariant }> = {
    portrait: { label: 'Portrait Studio', variant: 'amber' },
    mariage: { label: 'Mariage', variant: 'rose' },
    studio_famille: { label: 'Famille / Maternité', variant: 'emerald' },
    corporate: { label: 'Corporate', variant: 'blue' },
    mode_art: { label: 'Mode & Art', variant: 'purple' },
    evenement: { label: 'Événement', variant: 'sky' },
  };

  return (
    <Card className="hover:border-amber-500/40 transition-all group relative overflow-hidden" padding="md">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={categoryBadges[booking.category]?.variant || 'stone'} size="sm">
              {categoryBadges[booking.category]?.label || booking.category}
            </Badge>
            <Badge variant={statusBadges[booking.status]?.variant || 'stone'} size="sm">
              {statusBadges[booking.status]?.label || booking.status}
            </Badge>
          </div>
          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {booking.clientName}
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
            {booking.prestationName}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-base font-bold text-stone-900 dark:text-stone-100">
            {booking.totalPrice}€
          </span>
          <div className="mt-1">
            <Badge variant={paymentBadges[booking.paymentStatus]?.variant || 'stone'} size="sm">
              <CreditCard className="w-2.5 h-2.5" />
              {paymentBadges[booking.paymentStatus]?.label}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-400 pt-3 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span>{booking.date} • {booking.startTime} - {booking.endTime}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-stone-400" />
          <span className="capitalize">{booking.location === 'studio' ? 'Studio Fotolou Paris' : booking.locationAddress || 'Extérieur'}</span>
        </div>
        <div className="flex items-center gap-1.5 col-span-full">
          <Phone className="w-3.5 h-3.5 text-stone-400" />
          <span>{booking.clientPhone}</span>
        </div>
      </div>

      {booking.notes && (
        <p className="mt-2.5 p-2 bg-stone-50 dark:bg-stone-800/50 rounded-lg text-[11px] text-stone-500 dark:text-stone-400 italic">
          « {booking.notes} »
        </p>
      )}

      {onStatusChange && (
        <div className="mt-3 pt-2.5 flex items-center justify-end gap-1.5 border-t border-stone-100 dark:border-stone-800">
          {booking.status === 'pending' && (
            <button
              onClick={() => onStatusChange('confirmed')}
              className="px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-md transition-colors"
            >
              Confirmer
            </button>
          )}
          {booking.status === 'confirmed' && (
            <button
              onClick={() => onStatusChange('completed')}
              className="px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 rounded-md transition-colors"
            >
              Marquer Réalisé
            </button>
          )}
        </div>
      )}
    </Card>
  );
};
