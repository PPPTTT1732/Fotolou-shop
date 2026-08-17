import { Booking } from '../../../types/booking';
import { BookingStatus, PaymentStatus } from '../../../types/common';
import { ReservationRepository } from '../repositories/reservation.repository';

export class UpdateReservationStatusUseCase {
  static updateStatus(id: string, status: BookingStatus): { success: boolean; data?: Booking; error?: string } {
    const booking = ReservationRepository.getById(id);
    if (!booking) {
      return { success: false, error: 'Réservation introuvable.' };
    }

    const updated: Booking = {
      ...booking,
      status,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    const saved = ReservationRepository.update(updated);
    return { success: true, data: saved };
  }

  static updatePaymentStatus(id: string, paymentStatus: PaymentStatus): { success: boolean; data?: Booking; error?: string } {
    const booking = ReservationRepository.getById(id);
    if (!booking) {
      return { success: false, error: 'Réservation introuvable.' };
    }

    const updated: Booking = {
      ...booking,
      paymentStatus,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    const saved = ReservationRepository.update(updated);
    return { success: true, data: saved };
  }
}
