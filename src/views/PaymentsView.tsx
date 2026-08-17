import React from 'react';
import { PaymentSummary } from '../features/payments/components/PaymentSummary';
import { PaymentList } from '../features/payments/components/PaymentList';
import { PaymentRecord } from '../types/payment';

interface PaymentsViewProps {
  payments: PaymentRecord[];
  onNewPayment: () => void;
  onToast: (title: string, desc?: string) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  payments,
  onNewPayment,
  onToast,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-stone-100">Facturation & Règlements</h2>
        <p className="text-xs text-stone-400">Suivi des acomptes, soldes et génération de factures clients</p>
      </div>

      <PaymentSummary payments={payments} />
      <PaymentList
        payments={payments}
        onNewPayment={onNewPayment}
        onToast={onToast}
      />
    </div>
  );
};
