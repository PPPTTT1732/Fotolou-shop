import React from 'react';
import { Sparkles, Clock, Euro } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { PRESTATIONS_CATALOG } from '../../../constants/prestations';

export const PrestationsSettings: React.FC = () => {
  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Grille Tarifaire des Prestations</h3>
      </div>

      <div className="space-y-2.5">
        {PRESTATIONS_CATALOG.map((p) => (
          <div
            key={p.id}
            className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/80 dark:border-stone-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">{p.name}</h4>
                <Badge variant="amber" size="sm">{p.category}</Badge>
              </div>
              <p className="text-[11px] text-stone-500 max-w-lg">{p.description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-xs font-semibold">
              <span className="text-stone-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {p.durationMinutes} min
              </span>
              <span className="text-stone-900 dark:text-stone-100 font-bold bg-white dark:bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700">
                {p.price} € (Acompte {p.depositRequired}€)
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
