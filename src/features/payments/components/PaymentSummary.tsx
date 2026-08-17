import React from 'react';
import { Euro, TrendingUp, CreditCard, Receipt } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { PaymentRecord } from '../../../types/payment';

interface PaymentSummaryProps {
  payments: PaymentRecord[];
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ payments }) => {
  const total = payments.reduce((sum, p) => sum + p.amount, 0);
  const acompteTotal = payments
    .filter(p => p.type === 'acompte')
    .reduce((sum, p) => sum + p.amount, 0);
  const soldeTotal = total - acompteTotal;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
      <Card padding="md" className="bg-linear-to-br from-amber-500/10 to-amber-600/5 border-amber-500/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">Total Encaissé</span>
          <span className="p-2 bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-xl">
            <Euro className="w-4 h-4" />
          </span>
        </div>
        <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{total.toLocaleString('fr-FR')} €</div>
        <p className="text-[11px] text-stone-500 mt-1">{payments.length} encaissements validés</p>
      </Card>

      <Card padding="md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-stone-500">Acomptes Reçus</span>
          <span className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
            <Receipt className="w-4 h-4" />
          </span>
        </div>
        <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{acompteTotal.toLocaleString('fr-FR')} €</div>
        <p className="text-[11px] text-stone-500 mt-1">Garanties de réservation</p>
      </Card>

      <Card padding="md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-stone-500">Soldes Séances</span>
          <span className="p-2 bg-blue-500/10 text-blue-600 rounded-xl">
            <TrendingUp className="w-4 h-4" />
          </span>
        </div>
        <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">{soldeTotal.toLocaleString('fr-FR')} €</div>
        <p className="text-[11px] text-stone-500 mt-1">Règlements post-shooting</p>
      </Card>
    </div>
  );
};

