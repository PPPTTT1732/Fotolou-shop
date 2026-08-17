import { useState, useCallback, useEffect } from 'react';
import { Booking } from '../../../types/booking';
import { BookingStatus, PaymentStatus } from '../../../types/common';
import { ListReservationsUseCase, ReservationFilters } from '../use-cases/list-reservations.usecase';
import { CreateReservationUseCase, CreateReservationInput } from '../use-cases/create-reservation.usecase';
import { UpdateReservationStatusUseCase } from '../use-cases/update-reservation-status.usecase';

export function useReservations(initialFilters?: ReservationFilters) {
  const [filters, setFilters] = useState<ReservationFilters>(initialFilters || {});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    const list = ListReservationsUseCase.execute(filters);
    setBookings(list);
    setIsLoading(false);
  }, [filters]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createBooking = (input: CreateReservationInput) => {
    const res = CreateReservationUseCase.execute(input);
    if (res.success) refresh();
    return res;
  };

  const updateStatus = (id: string, status: BookingStatus) => {
    const res = UpdateReservationStatusUseCase.updateStatus(id, status);
    if (res.success) refresh();
    return res;
  };

  const updatePayment = (id: string, status: PaymentStatus) => {
    const res = UpdateReservationStatusUseCase.updatePaymentStatus(id, status);
    if (res.success) refresh();
    return res;
  };

  return {
    bookings,
    filters,
    setFilters,
    isLoading,
    refresh,
    createBooking,
    updateStatus,
    updatePayment,
  };
}
