import React, { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal';
import { Input } from '../../../shared/ui/Input';
import { Select } from '../../../shared/ui/Select';
import { Button } from '../../../shared/ui/Button';
import { PaymentMethod } from '../../../types/payment';

interface CreatePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    bookingId: string;
    bookingTitle: string;
    clientId: string;
    clientName: string;
    amount: number;
    method: PaymentMethod;
    type: 'acompte' | 'solde' | 'totalite';
    notes?: string;
  }) => void;
}

export const CreatePaymentModal: React.FC<CreatePaymentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [clientName, setClientName] = useState('');
  const [bookingTitle, setBookingTitle] = useState('Séance Studio Photo');
  const [amount, setAmount] = useState('150');
  const [method, setMethod] = useState<PaymentMethod>('carte');
  const [type, setType] = useState<'acompte' | 'solde' | 'totalite'>('acompte');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bookingId: `bk_${Date.now()}`,
      bookingTitle,
      clientId: `cli_${Date.now()}`,
      clientName,
      amount: parseFloat(amount) || 0,
      method,
      type,
      notes,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Encaisser un Paiement" subtitle="Générer un reçu client officiel et enregistrer le versement">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nom du Client *"
          placeholder="Ex: Élodie & Thomas Laurent"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />

        <Input
          label="Intitulé de la séance *"
          placeholder="Ex: Portrait Famille Studio"
          value={bookingTitle}
          onChange={(e) => setBookingTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Montant réglé (€) *"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
          <Select
            label="Mode de règlement"
            value={method}
            onChange={(e) => setMethod(e.target.value as PaymentMethod)}
            options={[
              { value: 'carte', label: 'Carte Bancaire' },
              { value: 'virement', label: 'Virement Bancaire' },
              { value: 'especes', label: 'Espèces' },
              { value: 'mobile_money', label: 'Mobile Money' },
              { value: 'cheque', label: 'Chèque' },
            ]}
          />
          <Select
            label="Type de versement"
            value={type}
            onChange={(e) => setType(e.target.value as 'acompte' | 'solde' | 'totalite')}
            options={[
              { value: 'acompte', label: 'Acompte (30-50%)' },
              { value: 'solde', label: 'Solde restant' },
              { value: 'totalite', label: 'Totalité 100%' },
            ]}
          />
        </div>

        <Input
          label="Notes ou référence bancaire"
          placeholder="Ex: Virement reçu ce matin, CB sans contact..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" size="sm">
            Enregistrer l'encaissement ({amount}€)
          </Button>
        </div>
      </form>
    </Modal>
  );
};
