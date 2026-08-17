import React, { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { fullName: string; email: string; phone: string; notes?: string }) => void;
}

export const CreateClientModal: React.FC<CreateClientModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ fullName, email, phone, notes });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nouveau Client" subtitle="Ajouter un profil client au carnet du studio">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nom & Prénom / Société *"
          placeholder="Ex: Camille & Alexandre Dupuis"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Téléphone *"
            placeholder="06 12 34 56 78"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            label="Adresse Email *"
            type="email"
            placeholder="camille.dupuis@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Input
          label="Notes & Préférences"
          placeholder="Préférences de stylisme, anniversaires, enfants..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" size="sm">
            Enregistrer le client
          </Button>
        </div>
      </form>
    </Modal>
  );
};
