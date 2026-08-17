export interface Salon {
  id: string;
  name: string;
  location: string;
  address: string;
  city: string;
  image: string;
  galleryImages: string[];
  waitingCount: number;
  isOpen: boolean;
  phone: string;
  website: string;
  rating: number;
  reviewCount: number;
  category: string;
}

export interface Relative {
  id: string;
  name: string;
  relationship: string;
  phone?: string;
  iconType: 'mother' | 'child' | 'brother' | 'other';
}

export interface SalonTicket {
  id: string;
  ticketNumber: number;
  salonId: string;
  salonName: string;
  salonLocation: string;
  beneficiaryName: string;
  beneficiaryPhone: string;
  beneficiaryType: 'self' | 'relative' | 'other';
  status: 'your_turn' | 'waiting' | 'served' | 'cancelled';
  peopleAhead: number;
  currentNumber: number;
  createdAt: string;
  timeLabel?: string;
  notificationPhone: string;
}

export interface ProQueueClient {
  id: string;
  queueNumber: number;
  name: string;
  phone: string;
  status: 'in_progress' | 'waiting' | 'served' | 'cancelled';
  createdAt: string;
  timeLabel?: string;
}

export type AppUserRole = 'client' | 'pro';
