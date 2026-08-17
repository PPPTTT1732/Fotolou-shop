import React from 'react';
import { Search, UserPlus, Users } from 'lucide-react';
import { Client } from '../../../types/client';
import { ClientCard } from './ClientCard';
import { Button } from '../../../shared/ui/Button';
import { EmptyState } from '../../../shared/feedback/EmptyState';

interface ClientListProps {
  clients: Client[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewClient: () => void;
  onBookSession: (client: Client) => void;
}

export const ClientList: React.FC<ClientListProps> = ({
  clients,
  searchQuery,
  onSearchChange,
  onNewClient,
  onBookSession,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, téléphone..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        <Button onClick={onNewClient} size="sm">
          <UserPlus className="w-4 h-4" />
          Nouveau client
        </Button>
      </div>

      {clients.length === 0 ? (
        <EmptyState
          icon={<Users className="w-8 h-8" />}
          title="Aucun client trouvé"
          description="Votre carnet d'adresses ne contient aucun contact correspondant à votre recherche."
          actionLabel="Ajouter un premier client"
          onAction={onNewClient}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((c) => (
            <ClientCard
              key={c.id}
              client={c}
              onBookSession={() => onBookSession(c)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
