import React, { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal';
import { Button } from '../../../shared/ui/Button';
import { FOTOLOU_SERVICES } from '../../../constants/services';
import { StudioServiceType } from '../../../types/ticket';
import { Sparkles, Clock, Check } from 'lucide-react';

interface TakeTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { serviceId: StudioServiceType; clientName: string; clientPhone: string }) => void;
  defaultPhone?: string;
}

export const TakeTicketModal: React.FC<TakeTicketModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultPhone = '+221 70 123 45 67',
}) => {
  const [selectedService, setSelectedService] = useState<StudioServiceType>('photo_identite');
  const [clientName, setClientName] = useState('Client FOTOLOU');
  const [clientPhone, setClientPhone] = useState(defaultPhone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ serviceId: selectedService, clientName, clientPhone });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Prendre un Ticket Virtuel" subtitle="Moins d'attente. Plus de temps.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-2">
            Choisissez votre prestation :
          </label>
          <div className="space-y-2">
            {FOTOLOU_SERVICES.map((srv) => {
              const isSelected = selectedService === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv.id)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#4318FF] bg-[#4318FF]/5'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{srv.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600">
                        {srv.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{srv.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#4318FF]">{srv.price > 0 ? `${srv.price.toLocaleString()} FCFA` : 'Gratuit'}</span>
                    <div className="text-[10px] text-slate-400 flex items-center justify-end gap-0.5">
                      <Clock className="w-3 h-3" />
                      ~{srv.durationMinutes} min
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Nom</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#4318FF]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Téléphone (SMS)</label>
            <input
              type="text"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#4318FF]"
              required
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Annuler
          </Button>
          <button
            type="submit"
            className="py-2.5 px-5 bg-[#4318FF] hover:bg-[#3713D6] text-white rounded-full text-xs font-bold shadow-md cursor-pointer transition-all"
          >
            Obtenir mon ticket immédiat
          </button>
        </div>
      </form>
    </Modal>
  );
};
