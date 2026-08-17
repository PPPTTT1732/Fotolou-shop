import React from 'react';
import { Phone, Mail, Camera, Euro, Tag } from 'lucide-react';
import { Client } from '../../../types/client';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';

interface ClientCardProps {
  client: Client;
  onBookSession?: () => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, onBookSession }) => {
  return (
    <Card className="hover:border-amber-500/40 transition-all flex flex-col justify-between" padding="md">
      <div>
        <div className="flex items-start gap-3 mb-3">
          <img
            src={client.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
            alt={client.fullName}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full object-cover border border-amber-500/20 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
              {client.fullName}
            </h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {client.tags.map((tag) => (
                <Badge key={tag} variant="amber" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 py-2.5 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate">{client.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate">{client.email}</span>
          </div>
        </div>

        {client.notes && (
          <p className="p-2 bg-stone-50 dark:bg-stone-800/40 rounded-lg text-[11px] text-stone-500 italic mt-2">
            « {client.notes} »
          </p>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-stone-500">
          <span className="inline-flex items-center gap-1 font-semibold text-stone-700 dark:text-stone-300">
            <Camera className="w-3.5 h-3.5 text-amber-600" />
            {client.totalShootings} séance{client.totalShootings > 1 ? 's' : ''}
          </span>
          <span>•</span>
          <span className="font-semibold text-stone-700 dark:text-stone-300">
            {client.totalSpent}€ facturé
          </span>
        </div>

        {onBookSession && (
          <button
            onClick={onBookSession}
            className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline"
          >
            Réserver
          </button>
        )}
      </div>
    </Card>
  );
};
