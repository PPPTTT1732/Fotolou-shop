import { ApiClient } from './apiClient';
import { ProQueueClient } from '../../types/salon';
import { INITIAL_PRO_QUEUE, INITIAL_PRO_HISTORY } from '../../data/salonMockData';

export const ProQueueService = {
  async getQueue(): Promise<{ queue: ProQueueClient[]; history: ProQueueClient[]; isOpen: boolean }> {
    try {
      const res = await ApiClient.get('/pro/queue');
      return {
        queue: res.queue || INITIAL_PRO_QUEUE,
        history: res.history || INITIAL_PRO_HISTORY,
        isOpen: res.isOpen !== undefined ? res.isOpen : true,
      };
    } catch {
      return {
        queue: INITIAL_PRO_QUEUE,
        history: INITIAL_PRO_HISTORY,
        isOpen: true,
      };
    }
  },

  async serveClient(clientId: string): Promise<void> {
    try {
      await ApiClient.post('/pro/queue/serve', { clientId });
    } catch (e) {
      console.warn('[ProQueueService] Serve fallback');
    }
  },

  async skipClient(clientId: string): Promise<void> {
    try {
      await ApiClient.post('/pro/queue/skip', { clientId });
    } catch (e) {
      console.warn('[ProQueueService] Skip fallback');
    }
  },

  async addClient(data: { name: string; phone: string }): Promise<ProQueueClient> {
    try {
      const res = await ApiClient.post('/pro/queue/add', data);
      return res.newClient;
    } catch {
      return {
        id: `pq-${Date.now()}`,
        queueNumber: 99,
        name: data.name,
        phone: data.phone,
        status: 'waiting',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }
  },

  async toggleQueueStatus(): Promise<boolean> {
    try {
      const res = await ApiClient.post('/pro/queue/toggle');
      return res.isQueueOpen;
    } catch {
      return true;
    }
  },
};
