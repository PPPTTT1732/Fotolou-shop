import React from 'react';
import { Plus, Camera, UserPlus, CreditCard, Sparkles } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';

interface QuickActionsProps {
  onNewBooking: () => void;
  onNewGallery: () => void;
  onNewClient: () => void;
  onNewPayment: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onNewBooking,
  onNewGallery,
  onNewClient,
  onNewPayment,
}) => {
  const actions = [
    {
      label: 'Nouvelle Séance',
      sub: 'Bloquer un créneau',
      icon: <Plus className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      onClick: onNewBooking,
    },
    {
      label: 'Nouvelle Galerie',
      sub: 'Créer un album client',
      icon: <Camera className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      onClick: onNewGallery,
    },
    {
      label: 'Nouveau Client',
      sub: 'Fiche contact studio',
      icon: <UserPlus className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      onClick: onNewClient,
    },
    {
      label: 'Encaisser Acompte',
      sub: 'Générer reçu & facture',
      icon: <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      onClick: onNewPayment,
    },
  ];

  return (
    <Card padding="md" className="space-y-3">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Actions Rapides Studio
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((act, i) => (
          <button
            key={i}
            onClick={act.onClick}
            className="p-3 text-left rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 hover:border-amber-500/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all flex items-start gap-2.5 group"
          >
            <span className="p-2 bg-white dark:bg-stone-900 rounded-lg shadow-xs group-hover:scale-105 transition-transform shrink-0">
              {act.icon}
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                {act.label}
              </div>
              <div className="text-[10px] text-stone-400 truncate">{act.sub}</div>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};
