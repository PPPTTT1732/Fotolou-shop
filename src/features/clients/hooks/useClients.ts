import { useState, useEffect, useCallback } from 'react';
import { Client } from '../../../types/client';
import { ClientRepository } from '../repositories/client.repository';
import { ClientUseCases } from '../use-cases/client-actions.usecase';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const refresh = useCallback(() => {
    const list = ClientRepository.getAll();
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      setClients(
        list.filter(
          c =>
            c.fullName.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.phone.includes(q)
        )
      );
    } else {
      setClients(list);
    }
  }, [searchQuery]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createClient = (data: { fullName: string; email: string; phone: string; notes?: string }) => {
    const res = ClientUseCases.createClient(data);
    if (res.success) refresh();
    return res;
  };

  return {
    clients,
    searchQuery,
    setSearchQuery,
    refresh,
    createClient,
  };
}
