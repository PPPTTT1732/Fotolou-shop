export type TicketStatus = 'waiting' | 'in_progress' | 'called' | 'completed' | 'cancelled';

export type StudioServiceType =
  | 'photo_identite'
  | 'tirage_express'
  | 'shooting_express'
  | 'retouche_numerique'
  | 'retrait_commande'
  | string;

export interface StudioService {
  id: StudioServiceType;
  name: string;
  category: string;
  durationMinutes: number;
  price: number;
  prefix: string;
  description: string;
}

export interface VirtualTicket {
  id: string;
  ticketNumber: string;
  serviceId: StudioServiceType;
  serviceName: string;
  clientName: string;
  clientPhone: string;
  status: TicketStatus;
  queuePosition?: number;
  peopleAhead?: number;
  estimatedWaitMinutes: number;
  counterNumber?: number;
  createdAt: string;
  calledAt?: string;
  completedAt?: string;
  notifyMe?: boolean;
}
