import { Booking } from '../../../types/booking';
import { BookingStatus, PaymentStatus } from '../../../types/common';
import { ReservationRepository } from '../repositories/reservation.repository';

export interface CreateReservationInput {
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  prestationId: string;
  prestationName: string;
  category: Booking['category'];
  date: string;
  startTime: string;
  endTime: string;
  location: 'studio' | 'exterieur' | 'domicile';
  locationAddress?: string;
  totalPrice: number;
  depositAmount: number;
  notes?: string;
}

export class CreateReservationUseCase {
  static execute(input: CreateReservationInput): { success: boolean; data?: Booking; error?: string } {
    if (!input.clientName?.trim()) {
      return { success: false, error: 'Le nom du client est requis.' };
    }
    if (!input.date) {
      return { success: false, error: 'La date de la séance est obligatoire.' };
    }

    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      ...input,
      status: 'confirmed' as BookingStatus,
      paymentStatus: (input.depositAmount > 0 ? 'deposit_paid' : 'unpaid') as PaymentStatus,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    const saved = ReservationRepository.create(newBooking);
    return { success: true, data: saved };
  }
}
