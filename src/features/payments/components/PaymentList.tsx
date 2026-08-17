import React from 'react';
import { CreditCard, FileText, Download, Plus } from 'lucide-react';
import { PaymentRecord } from '../../../types/payment';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { EmptyState } from '../../../shared/feedback/EmptyState';

interface PaymentListProps {
  payments: PaymentRecord[];
  onNewPayment: () => void;
  onToast: (title: string, desc?: string) => void;
}

export const PaymentList: React.FC<PaymentListProps> = ({
  payments,
  onNewPayment,
  onToast,
}) => {
  const methodLabels: Record<PaymentRecord['method'], string> = {
    carte: 'Carte Bancaire',
    virement: 'Virement SEPA',
    especes: 'Espèces',
    mobile_money: 'Mobile Money',
    cheque: 'Chèque',
  };

  const handleDownloadInvoice = (payment: PaymentRecord) => {
    onToast(
      'Reçu généré',
      `Facture ${payment.referenceInvoice} pour ${payment.clientName} (${payment.amount}€)`
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Journal des Paiements & Devis</h3>
          <p className="text-xs text-stone-500">Historique des transactions et génération des reçus d'acompte</p>
        </div>
        <Button onClick={onNewPayment} size="sm">
          <Plus className="w-4 h-4" />
          Encaisser un paiement
        </Button>
      </div>

      {payments.length === 0 ? (
        <EmptyState
          icon={<CreditCard className="w-8 h-8" />}
          title="Aucun paiement enregistré"
          description="Enregistrez votre premier règlement ou acompte client."
          actionLabel="Nouveau règlement"
          onAction={onNewPayment}
        />
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-stone-800/50 text-stone-500 font-semibold border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="p-3.5">Référence & Date</th>
                <th className="p-3.5">Client & Séance</th>
                <th className="p-3.5">Méthode</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5 text-right">Montant</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                  <td className="p-3.5 font-mono">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">{p.referenceInvoice}</span>
                    <div className="text-[11px] text-stone-400">{p.date}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-stone-900 dark:text-stone-100">{p.clientName}</div>
                    <div className="text-[11px] text-stone-500">{p.bookingTitle}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-stone-400" />
                      {methodLabels[p.method] || p.method}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={p.type === 'acompte' ? 'amber' : 'emerald'} size="sm">
                      {p.type.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-right font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {p.amount} €
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => handleDownloadInvoice(p)}
                      className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-amber-600 rounded-lg transition-colors inline-flex items-center gap-1"
                      title="Télécharger reçu"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-medium hidden sm:inline">Reçu</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
