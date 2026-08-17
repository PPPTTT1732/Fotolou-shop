import { ID, BookingStatus, PaymentStatus, PrestationCategory } from './common';

export interface Booking {
  id: ID;
  clientId: ID;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  prestationId: ID;
  prestationName: string;
  category: PrestationCategory;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  location: 'studio' | 'exterieur' | 'domicile';
  locationAddress?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;
  depositAmount: number;
  notes?: string;
  galleryId?: ID;
  createdAt: string;
  updatedAt: string;
}
