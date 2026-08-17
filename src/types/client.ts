import { ID } from './common';

export interface Client {
  id: ID;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  notes?: string;
  tags: string[];
  totalShootings: number;
  totalSpent: number;
  createdAt: string;
}
