import { ApiClient } from './apiClient';
import { SalonTicket } from '../../types/salon';
import { INITIAL_ACTIVE_TICKETS, INITIAL_HISTORY_TICKETS } from '../../data/salonMockData';

export const TicketsService = {
  async getActiveTickets(): Promise<SalonTicket[]> {
    try {
      const res = await ApiClient.get<{ success: boolean; tickets: SalonTicket[] }>('/tickets/active');
      return res.tickets || INITIAL_ACTIVE_TICKETS;
    } catch {
      return INITIAL_ACTIVE_TICKETS;
    }
  },

  async getHistoryTickets(): Promise<SalonTicket[]> {
    try {
      const res = await ApiClient.get<{ success: boolean; tickets: SalonTicket[] }>('/tickets/history');
      return res.tickets || INITIAL_HISTORY_TICKETS;
    } catch {
      return INITIAL_HISTORY_TICKETS;
    }
  },

  async createTicket(payload: {
    salonId: string;
    beneficiaryName: string;
    beneficiaryPhone: string;
    beneficiaryType: 'self' | 'relative' | 'other';
  }): Promise<SalonTicket> {
    try {
      const res = await ApiClient.post('/tickets', payload);
      return res.ticket;
    } catch {
      return {
        id: `ticket-${Date.now()}`,
        ticketNumber: 8,
        salonId: payload.salonId,
        salonName: 'King Barber',
        salonLocation: 'Mermoz, Dakar',
        beneficiaryName: payload.beneficiaryName,
        beneficiaryPhone: payload.beneficiaryPhone,
        beneficiaryType: payload.beneficiaryType,
        status: 'waiting',
        peopleAhead: 2,
        currentNumber: 6,
        createdAt: new Date().toISOString(),
        notificationPhone: payload.beneficiaryPhone,
      };
    }
  },

  async cancelTicket(ticketId: string): Promise<void> {
    try {
      await ApiClient.post(`/tickets/${ticketId}/cancel`);
    } catch (e) {
      console.warn('[TicketsService] Cancel fallback');
    }
  },
};
