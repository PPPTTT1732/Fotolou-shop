export type ID = string;

export type PrestationCategory = 
  | 'portrait'
  | 'mariage'
  | 'studio_famille'
  | 'corporate'
  | 'mode_art'
  | 'evenement';

export type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'deposit_paid' | 'unpaid' | 'refunded';

export interface Prestation {
  id: ID;
  name: string;
  category: PrestationCategory;
  durationMinutes: number;
  price: number;
  depositRequired: number;
  description: string;
  badgeColor: string;
}
