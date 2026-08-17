import React, { useState } from 'react';
import { Building2, Save } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { APP_CONFIG } from '../../../config/app.config';

interface StudioProfileSettingsProps {
  onToast: (title: string, desc?: string) => void;
}

export const StudioProfileSettings: React.FC<StudioProfileSettingsProps> = ({ onToast }) => {
  const [studioName, setStudioName] = useState(APP_CONFIG.fullName);
  const [address, setAddress] = useState(APP_CONFIG.studio.address);
  const [phone, setPhone] = useState(APP_CONFIG.studio.phone);
  const [email, setEmail] = useState(APP_CONFIG.studio.email);
  const [hours, setHours] = useState(APP_CONFIG.studio.openingHours);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onToast('Paramètres enregistrés', 'Les coordonnées du studio ont été mises à jour.');
  };

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
        <Building2 className="w-4 h-4 text-amber-600" />
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Profil & Coordonnées du Studio</h3>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        <Input
          label="Nom commercial du Studio"
          value={studioName}
          onChange={(e) => setStudioName(e.target.value)}
        />

        <Input
          label="Adresse du Studio"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Téléphone professionnel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="Email de contact"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Input
          label="Horaires d'ouverture"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <div className="pt-2 flex justify-end">
          <Button size="sm" type="submit">
            <Save className="w-3.5 h-3.5" />
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </Card>
  );
};
