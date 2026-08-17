import React from 'react';
import { ClientList } from '../features/clients/components/ClientList';
import { Client } from '../types/client';

interface ClientsViewProps {
  clients: Client[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewClient: () => void;
  onBookSession: (client: Client) => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  searchQuery,
  onSearchChange,
  onNewClient,
  onBookSession,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-stone-100">Répertoire des Clients</h2>
        <p className="text-xs text-stone-400">Carnet d'adresses, préférences shooting et historique d'achats</p>
      </div>

      <ClientList
        clients={clients}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onNewClient={onNewClient}
        onBookSession={onBookSession}
      />
    </div>
  );
};
