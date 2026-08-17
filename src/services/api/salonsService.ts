import { ApiClient } from './apiClient';
import { Salon } from '../../types/salon';
import { INITIAL_SALONS } from '../../data/salonMockData';

export const SalonsService = {
  async getSalons(): Promise<Salon[]> {
    try {
      const res = await ApiClient.get<{ success: boolean; salons: Salon[] }>('/salons');
      return res.salons || INITIAL_SALONS;
    } catch {
      return INITIAL_SALONS;
    }
  },

  async getSalonById(id: string): Promise<Salon | null> {
    try {
      const res = await ApiClient.get<{ success: boolean; salon: Salon }>(`/salons/${id}`);
      return res.salon || null;
    } catch {
      return INITIAL_SALONS.find((s) => s.id === id) || INITIAL_SALONS[0];
    }
  },
};
