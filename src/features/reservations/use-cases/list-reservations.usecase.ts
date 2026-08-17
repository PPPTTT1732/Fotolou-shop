import { Booking } from '../../../types/booking';
import { ReservationRepository } from '../repositories/reservation.repository';

export interface ReservationFilters {
  status?: string;
  category?: string;
  searchQuery?: string;
  date?: string;
}

export class ListReservationsUseCase {
  static execute(filters?: ReservationFilters): Booking[] {
    let bookings = ReservationRepository.getAll();

    if (!filters) return bookings;

    if (filters.status && filters.status !== 'all') {
      bookings = bookings.filter(b => b.status === filters.status);
    }

    if (filters.category && filters.category !== 'all') {
      bookings = bookings.filter(b => b.category === filters.category);
    }

    if (filters.date) {
      bookings = bookings.filter(b => b.date === filters.date);
    }

    if (filters.searchQuery?.trim()) {
      const q = filters.searchQuery.toLowerCase();
      bookings = bookings.filter(
        b =>
          b.clientName.toLowerCase().includes(q) ||
          b.prestationName.toLowerCase().includes(q) ||
          b.clientPhone.includes(q)
      );
    }

    return bookings;
  }
}
