import { Client } from '../../../types/client';
import { ClientRepository } from '../repositories/client.repository';

export class ClientUseCases {
  static createClient(input: {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
    tags?: string[];
  }): { success: boolean; data?: Client; error?: string } {
    if (!input.fullName.trim()) return { success: false, error: 'Nom client requis' };

    const newClient: Client = {
      id: `cli_${Date.now()}`,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      notes: input.notes,
      tags: input.tags || ['Nouveau'],
      totalShootings: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString().split('T')[0],
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 5000)}?w=200&auto=format&fit=crop&q=80`,
    };

    const saved = ClientRepository.create(newClient);
    return { success: true, data: saved };
  }
}
