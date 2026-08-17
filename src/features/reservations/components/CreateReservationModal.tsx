import React, { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal';
import { Input } from '../../../shared/ui/Input';
import { Select } from '../../../shared/ui/Select';
import { Button } from '../../../shared/ui/Button';
import { PRESTATIONS_CATALOG } from '../../../constants/prestations';
import { CreateReservationInput } from '../use-cases/create-reservation.usecase';

interface CreateReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateReservationInput) => void;
}

export const CreateReservationModal: React.FC<CreateReservationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedPrestationId, setSelectedPrestationId] = useState(PRESTATIONS_CATALOG[0].id);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [date, setDate] = useState('2026-08-18');
  const [startTime, setStartTime] = useState('10:00');
  const [location, setLocation] = useState<'studio' | 'exterieur' | 'domicile'>('studio');
  const [locationAddress, setLocationAddress] = useState('');
  const [notes, setNotes] = useState('');

  const selectedPrestation = PRESTATIONS_CATALOG.find(p => p.id === selectedPrestationId) || PRESTATIONS_CATALOG[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      clientId: `cli_${Date.now()}`,
      clientName,
      clientPhone,
      clientEmail,
      prestationId: selectedPrestation.id,
      prestationName: selectedPrestation.name,
      category: selectedPrestation.category,
      date,
      startTime,
      endTime: '12:00',
      location,
      locationAddress: location !== 'studio' ? locationAddress : undefined,
      totalPrice: selectedPrestation.price,
      depositAmount: selectedPrestation.depositRequired,
      notes,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nouvelle Séance Photo" subtitle="Enregistrer une réservation et bloquer le créneau">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Formule / Prestation photographique"
          value={selectedPrestationId}
          onChange={(e) => setSelectedPrestationId(e.target.value)}
          options={PRESTATIONS_CATALOG.map(p => ({
            value: p.id,
            label: `${p.name} (${p.price}€ - Acompte ${p.depositRequired}€)`,
          }))}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Nom & Prénom du client *"
            placeholder="Ex: Sophie & David Bernard"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
          <Input
            label="Téléphone *"
            placeholder="06 12 34 56 78"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            required
          />
        </div>

        <Input
          label="Email client"
          type="email"
          placeholder="client@exemple.fr"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Date de la séance *"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Input
            label="Heure de début *"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <Select
            label="Lieu"
            value={location}
            onChange={(e) => setLocation(e.target.value as 'studio' | 'exterieur' | 'domicile')}
            options={[
              { value: 'studio', label: 'Studio Fotolou (Paris)' },
              { value: 'exterieur', label: 'Extérieur (Parc/Ville)' },
              { value: 'domicile', label: 'Domicile client' },
            ]}
          />
        </div>

        {location !== 'studio' && (
          <Input
            label="Adresse exacte du shooting"
            placeholder="Ex: Domaine de Vaugrenier ou adresse du client"
            value={locationAddress}
            onChange={(e) => setLocationAddress(e.target.value)}
          />
        )}

        <Input
          label="Notes techniques & souhaits du client"
          placeholder="Tenues, couleur de fond, accessoires particuliers..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" size="sm">
            Confirmer la réservation ({selectedPrestation.price}€)
          </Button>
        </div>
      </form>
    </Modal>
  );
};
