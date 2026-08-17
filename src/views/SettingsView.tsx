import React from 'react';
import { StudioProfileSettings } from '../features/settings/components/StudioProfileSettings';
import { PrestationsSettings } from '../features/settings/components/PrestationsSettings';
import { PwaSyncSettings } from '../features/settings/components/PwaSyncSettings';

interface SettingsViewProps {
  onToast: (title: string, desc?: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onToast }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-stone-100">Paramètres du Studio</h2>
        <p className="text-xs text-stone-400">Coordonnées, tarifs prestations, statut de la PWA et cache hors-ligne</p>
      </div>

      <StudioProfileSettings onToast={onToast} />
      <PrestationsSettings />
      <PwaSyncSettings onToast={onToast} />
    </div>
  );
};
