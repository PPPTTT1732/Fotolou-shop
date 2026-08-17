import React, { useState } from 'react';
import { ArrowLeft, UserCheck, Printer, Camera, Image, Package, Check, Clock } from 'lucide-react';

interface ServiceSelectionScreenProps {
  onBack: () => void;
  onConfirmTicket: (serviceName: string, serviceId: string, copies: number) => void;
}

export const ServiceSelectionScreen: React.FC<ServiceSelectionScreenProps> = ({
  onBack,
  onConfirmTicket,
}) => {
  const [selectedService, setSelectedService] = useState('id_photo');
  const [copies, setCopies] = useState(4);

  const services = [
    {
      id: 'id_photo',
      title: "Photos d'Identité Officielles",
      desc: 'Format passeport, carte d’identité, visa, permis (Conforme ANTS / OACI)',
      wait: '~5 min',
      price: '3 000 FCFA',
      icon: <UserCheck className="w-5 h-5 text-[#4318FF]" />,
    },
    {
      id: 'print',
      title: 'Tirages Photos & Agrandissements',
      desc: 'Papier brillant ou mat premium 10x15, 13x18, A4',
      wait: '~8 min',
      price: '500 FCFA / photo',
      icon: <Printer className="w-5 h-5 text-[#4318FF]" />,
    },
    {
      id: 'portrait',
      title: 'Shooting Portrait Studio',
      desc: 'Séance photo professionnelle, CV, LinkedIn ou famille',
      wait: '~15 min',
      price: '15 000 FCFA',
      icon: <Camera className="w-5 h-5 text-[#4318FF]" />,
    },
    {
      id: 'retouch',
      title: 'Restauration & Numérisation',
      desc: 'Réparation photos abîmées, colorisation et retouche pro',
      wait: '~20 min',
      price: '5 000 FCFA',
      icon: <Image className="w-5 h-5 text-[#4318FF]" />,
    },
    {
      id: 'pickup',
      title: 'Retrait de Commande Prête',
      desc: 'Récupération rapide de vos albums et tirages déjà imprimés',
      wait: '~2 min',
      price: 'Gratuit',
      icon: <Package className="w-5 h-5 text-[#4318FF]" />,
    },
  ];

  const current = services.find((s) => s.id === selectedService) || services[0];

  return (
    <div className="flex-1 bg-white text-slate-900 flex flex-col justify-between p-4 select-none">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-black text-slate-900 leading-tight">Prendre un Ticket</h2>
            <p className="text-[11px] text-slate-400">Choisissez votre service studio</p>
          </div>
        </div>

        {/* Service Options List */}
        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {services.map((svc) => {
            const isSelected = selectedService === svc.id;
            return (
              <div
                key={svc.id}
                onClick={() => setSelectedService(svc.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'border-[#4318FF] bg-[#4318FF]/5 shadow-xs'
                    : 'border-slate-100 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-[#4318FF] text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {svc.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{svc.title}</span>
                    <span className="text-[11px] font-black text-[#4318FF]">{svc.price}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{svc.desc}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Attente moyenne : {svc.wait}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#4318FF] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <button
          onClick={() => onConfirmTicket(current.title, current.id, copies)}
          className="w-full py-3 px-4 bg-[#4318FF] hover:bg-[#3713D6] active:scale-[0.99] text-white rounded-full text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Générer mon ticket ({current.wait})</span>
        </button>
      </div>
    </div>
  );
};
