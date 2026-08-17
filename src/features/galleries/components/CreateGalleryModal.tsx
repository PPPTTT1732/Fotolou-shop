import React, { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';

interface CreateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; clientName: string; coverPhotoUrl: string; accessPinCode?: string }) => void;
}

export const CreateGalleryModal: React.FC<CreateGalleryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=80'
  );
  const [accessPinCode, setAccessPinCode] = useState(
    Math.floor(1000 + Math.random() * 9000).toString()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, clientName, coverPhotoUrl, accessPinCode });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Créer une Galerie Client" subtitle="Création d’un album photo privé protégé par code PIN">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Titre de la galerie *"
          placeholder="Ex: Shooting Portrait - Marc Alcantara"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          label="Nom du Client *"
          placeholder="Ex: Marc Alcantara"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />

        <Input
          label="Code PIN d'accès privé"
          placeholder="4 chiffres (ex: 4821)"
          value={accessPinCode}
          onChange={(e) => setAccessPinCode(e.target.value)}
          maxLength={6}
        />

        <Input
          label="URL Photo de Couverture (HD)"
          value={coverPhotoUrl}
          onChange={(e) => setCoverPhotoUrl(e.target.value)}
          placeholder="https://..."
        />

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" size="sm">
            Créer la galerie
          </Button>
        </div>
      </form>
    </Modal>
  );
};
