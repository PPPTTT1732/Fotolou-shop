import { useState, useEffect, useCallback } from 'react';
import { VirtualTicket, StudioServiceType } from '../../../types/ticket';
import { TicketRepository } from '../repositories/ticket.repository';
import { TicketUseCases } from '../use-cases/ticket-actions.usecase';

export function useTickets() {
  const [tickets, setTickets] = useState<VirtualTicket[]>([]);
  const [myCurrentTicket, setMyCurrentTicket] = useState<VirtualTicket | null>(null);

  const refresh = useCallback(() => {
    const list = TicketRepository.getAll();
    setTickets(list);

    // Get user active ticket from local state or list
    const active = list.find(t => (t.status === 'waiting' || t.status === 'in_progress') && t.clientPhone.includes('70 123 45 67')) || list[0] || null;
    setMyCurrentTicket(active);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const takeTicket = (data: {
    serviceId: StudioServiceType;
    clientName: string;
    clientPhone: string;
  }) => {
    const res = TicketUseCases.takeTicket(data);
    if (res.success && res.data) {
      setMyCurrentTicket(res.data);
      refresh();
    }
    return res;
  };

  const callNext = (counter: number = 1) => {
    const res = TicketUseCases.callNextTicket(counter);
    if (res) refresh();
    return res;
  };

  const completeTicket = (id: string) => {
    const res = TicketUseCases.completeTicket(id);
    if (res) refresh();
    return res;
  };

  const activeCalling = tickets.find(t => t.status === 'in_progress');
  const waitingTickets = tickets.filter(t => t.status === 'waiting');

  return {
    tickets,
    myCurrentTicket,
    activeCalling,
    waitingTickets,
    takeTicket,
    callNext,
    completeTicket,
    refresh,
    setMyCurrentTicket,
  };
}
