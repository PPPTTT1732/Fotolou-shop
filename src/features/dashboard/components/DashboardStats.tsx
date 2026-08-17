import React from 'react';
import { Calendar, Users, Images, TrendingUp } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Booking } from '../../../types/booking';
import { Client } from '../../../types/client';
import { Gallery } from '../../../types/gallery';
import { PaymentRecord } from '../../../types/payment';

interface DashboardStatsProps {
  bookings: Booking[];
  clients: Client[];
  galleries: Gallery[];
  payments: PaymentRecord[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  bookings,
  clients,
  galleries,
  payments,
}) => {
  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);
  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const photosCount = galleries.reduce((acc, g) => acc + g.photos.length, 0);

  const stats = [
    {
      label: 'Chiffre d’Affaires',
      value: `${totalRevenue.toLocaleString('fr-FR')} €`,
      sub: `${payments.length} transactions`,
      icon: <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      highlight: true,
    },
    {
      label: 'Séances Actives',
      value: activeBookings.length.toString(),
      sub: `${bookings.filter(b => b.status === 'confirmed').length} confirmées`,
      icon: <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      label: 'Clients au Studio',
      value: clients.length.toString(),
      sub: 'Portefeuille actif',
      icon: <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    },
    {
      label: 'Photos Hébergées',
      value: photosCount.toString(),
      sub: `${galleries.length} galeries livrées`,
      icon: <Images className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, i) => (
        <Card
          key={i}
          padding="md"
          className={stat.highlight ? 'bg-amber-500/10 border-amber-500/30' : ''}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">{stat.label}</span>
            <span className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 shrink-0">{stat.icon}</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">{stat.value}</div>
          <div className="text-[11px] text-stone-400 mt-0.5">{stat.sub}</div>
        </Card>
      ))}
    </div>
  );
};
