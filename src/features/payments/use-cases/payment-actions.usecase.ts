import { PaymentRecord, PaymentMethod } from '../../../types/payment';
import { PaymentStatus } from '../../../types/common';
import { PaymentRepository } from '../repositories/payment.repository';

export class PaymentUseCases {
  static recordPayment(input: {
    bookingId: string;
    bookingTitle: string;
    clientId: string;
    clientName: string;
    amount: number;
    method: PaymentMethod;
    type: 'acompte' | 'solde' | 'totalite';
    notes?: string;
  }): { success: boolean; data?: PaymentRecord; error?: string } {
    if (input.amount <= 0) return { success: false, error: 'Montant invalide' };

    const newPayment: PaymentRecord = {
      id: `pay_${Date.now()}`,
      ...input,
      status: 'paid' as PaymentStatus,
      referenceInvoice: `FACT-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
    };

    const saved = PaymentRepository.create(newPayment);
    return { success: true, data: saved };
  }
}
