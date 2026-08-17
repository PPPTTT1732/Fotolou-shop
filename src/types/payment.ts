import { ID, PaymentStatus } from './common';

export type PaymentMethod = 'carte' | 'virement' | 'especes' | 'mobile_money' | 'cheque';

export interface PaymentRecord {
  id: ID;
  bookingId: ID;
  bookingTitle: string;
  clientId: ID;
  clientName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  type: 'acompte' | 'solde' | 'totalite';
  referenceInvoice: string;
  date: string;
  notes?: string;
}
