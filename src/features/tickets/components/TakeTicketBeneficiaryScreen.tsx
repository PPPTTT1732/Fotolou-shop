import React, { useState } from 'react';
import { ArrowLeft, UserPlus, User, Plus, ArrowRight, Check } from 'lucide-react';
import { Salon, Relative } from '../../../types/salon';

interface TakeTicketBeneficiaryScreenProps {
  salon: Salon;
  relatives: Relative[];
  userPhone: string;
  userName?: string;
  onBack: () => void;
  onConfirm: (beneficiary: { name: string; phone: string; type: 'self' | 'relative' | 'other' }) => void;
  onAddNewRelativeClick?: () => void;
}

export const TakeTicketBeneficiaryScreen: React.FC<TakeTicketBeneficiaryScreenProps> = ({
  salon,
  relatives,
  userPhone = '+221 77 862 70 52',
  userName = 'Bakary',
  onBack,
  onConfirm,
  onAddNewRelativeClick,
}) => {
  const [selectedId, setSelectedId] = useState<string>('self');
  const [otherName, setOtherName] = useState<string>('');
  const [otherPhone, setOtherPhone] = useState<string>('');
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);

  const handleContinue = () => {
    if (selectedId === 'self') {
      onConfirm({
        name: `Moi (${userName})`,
        phone: userPhone,
        type: 'self',
      });
    } else if (selectedId.startsWith('rel-')) {
      const rel = relatives.find((r) => r.id === selectedId);
      onConfirm({
        name: rel ? rel.name : 'Proche',
        phone: rel?.phone || userPhone,
        type: 'relative',
      });
    } else if (selectedId === 'other') {
      onConfirm({
        name: otherName.trim() || 'Invité',
        phone: otherPhone.trim() || userPhone,
        type: 'other',
      });
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden text-slate-900">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-4 border-b border-slate-100 shrink-0">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-slate-900">
          Prendre mon ticket
        </h1>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Top Info Banner with Icon */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-full bg-[#ECE9FE] text-[#4318FF] flex items-center justify-center mx-auto shadow-xs">
            <UserPlus className="w-6 h-6 stroke-[2.3]" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Pour qui ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
            Sélectionnez la personne pour qui vous prenez ce ticket.
          </p>
        </div>

        {/* Beneficiaries Selection List */}
        <div className="space-y-4">
          {/* Option 1: Moi (Self) */}
          <div
            onClick={() => {
              setSelectedId('self');
              setShowOtherInput(false);
            }}
            className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
              selectedId === 'self'
                ? 'border-[#4318FF] bg-white shadow-sm ring-1 ring-[#4318FF]/20'
                : 'border-slate-100 bg-white hover:border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#4318FF] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                B
              </div>
              <div className="text-left space-y-0.5">
                <div className="text-sm font-bold text-slate-900">
                  Moi ({userName})
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {userPhone}
                </div>
              </div>
            </div>
            {selectedId === 'self' && (
              <div className="w-5 h-5 rounded-full bg-[#4318FF] text-white flex items-center justify-center">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </div>

          {/* Section: Proches enregistrés */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
              PROCHES ENREGISTRÉS
            </div>

            {/* Relatives list (e.g., Maman) */}
            {relatives.map((rel) => {
              const isSelected = selectedId === rel.id;
              return (
                <div
                  key={rel.id}
                  onClick={() => {
                    setSelectedId(rel.id);
                    setShowOtherInput(false);
                  }}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#4318FF] bg-white shadow-sm ring-1 ring-[#4318FF]/20'
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="text-left space-y-0.5">
                      <div className="text-sm font-bold text-slate-900">
                        {rel.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {rel.relationship || 'Famille'}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#4318FF] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Option 3: Autre personne */}
            <div
              onClick={() => {
                setSelectedId('other');
                setShowOtherInput(true);
              }}
              className={`w-full p-4 rounded-2xl border-2 transition-all flex flex-col gap-3 cursor-pointer ${
                selectedId === 'other'
                  ? 'border-[#4318FF] bg-white shadow-sm ring-1 ring-[#4318FF]/20'
                  : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="text-left space-y-0.5">
                    <div className="text-sm font-bold text-slate-900">
                      Autre personne
                    </div>
                    <div className="text-xs text-slate-400">
                      Saisir un nouveau nom
                    </div>
                  </div>
                </div>
                {selectedId === 'other' && (
                  <div className="w-5 h-5 rounded-full bg-[#4318FF] text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Conditional Input when 'other' is active */}
              {selectedId === 'other' && (
                <div className="pt-2 space-y-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    placeholder="Nom complet (ex: Moussa Kane)"
                    value={otherName}
                    onChange={(e) => setOtherName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#4318FF]"
                    autoFocus
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone (+221 ...)"
                    value={otherPhone}
                    onChange={(e) => setOtherPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#4318FF]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="p-5 pt-2 pb-4 bg-white border-t border-slate-100 shrink-0">
        <button
          onClick={handleContinue}
          className="w-full py-3.5 px-6 bg-[#FFBA08] hover:bg-[#F59E0B] active:scale-[0.99] text-slate-950 rounded-full text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <span>Continuer le paiement</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
