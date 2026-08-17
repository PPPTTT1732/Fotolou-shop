import { useState, useEffect, useCallback } from 'react';
import { PaymentRecord, PaymentMethod } from '../../../types/payment';
import { PaymentRepository } from '../repositories/payment.repository';
import { PaymentUseCases } from '../use-cases/payment-actions.usecase';

export function usePayments() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  const refresh = useCallback(() => {
    const list = PaymentRepository.getAll();
    setPayments(list);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const recordPayment = (data: {
    bookingId: string;
    bookingTitle: string;
    clientId: string;
    clientName: string;
    amount: number;
    method: PaymentMethod;
    type: 'acompte' | 'solde' | 'totalite';
    notes?: string;
  }) => {
    const res = PaymentUseCases.recordPayment(data);
    if (res.success) refresh();
    return res;
  };

  const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);

  return {
    payments,
    totalCollected,
    refresh,
    recordPayment,
  };
}
