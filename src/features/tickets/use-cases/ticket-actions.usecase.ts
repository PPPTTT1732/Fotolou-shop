import { VirtualTicket, StudioServiceType } from '../../../types/ticket';
import { FOTOLOU_SERVICES } from '../../../constants/services';
import { TicketRepository } from '../repositories/ticket.repository';

export class TicketUseCases {
  static takeTicket(input: {
    serviceId: StudioServiceType;
    clientName: string;
    clientPhone: string;
  }): { success: boolean; data?: VirtualTicket; error?: string } {
    const service = FOTOLOU_SERVICES.find(s => s.id === input.serviceId);
    if (!service) return { success: false, error: 'Service introuvable' };

    const allTickets = TicketRepository.getAll();
    const activeWaiting = allTickets.filter(t => t.status === 'waiting' || t.status === 'in_progress');
    const sameServiceCount = allTickets.filter(t => t.serviceId === input.serviceId).length + 1;
    const ticketCode = `${service.prefix}-${String(sameServiceCount).padStart(3, '0')}`;

    const queuePos = activeWaiting.filter(t => t.status === 'waiting').length + 1;
    const estimatedMinutes = queuePos * (service.durationMinutes || 7);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTicket: VirtualTicket = {
      id: `tick_${Date.now()}`,
      ticketNumber: ticketCode,
      serviceId: service.id,
      serviceName: service.name,
      clientName: input.clientName,
      clientPhone: input.clientPhone,
      status: 'waiting',
      queuePosition: queuePos,
      estimatedWaitMinutes: estimatedMinutes,
      createdAt: timeStr,
    };

    const saved = TicketRepository.create(newTicket);
    return { success: true, data: saved };
  }

  static callNextTicket(counterNumber: number = 1): VirtualTicket | null {
    const all = TicketRepository.getAll();
    const waiting = all.find(t => t.status === 'waiting');
    if (!waiting) return null;

    return TicketRepository.update(waiting.id, {
      status: 'in_progress',
      queuePosition: 0,
      estimatedWaitMinutes: 0,
      counterNumber,
      calledAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    });
  }

  static completeTicket(id: string): VirtualTicket | null {
    return TicketRepository.update(id, {
      status: 'completed',
      completedAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    });
  }
}
