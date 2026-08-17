import React, { useState } from 'react';
import { ArrowLeft, UserPlus, Phone, Save } from 'lucide-react';
import { Relative } from '../../../types/salon';

interface AddRelativeScreenProps {
  onBack: () => void;
  onSave: (relative: Omit<Relative, 'id'>) => void;
}

export const AddRelativeScreen: React.FC<AddRelativeScreenProps> = ({
  onBack,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !relationship) return;

    let iconType: Relative['iconType'] = 'other';
    if (relationship.toLowerCase().includes('m')) iconType = 'mother';
    else if (relationship.toLowerCase().includes('enf')) iconType = 'child';
    else if (relationship.toLowerCase().includes('fr')) iconType = 'brother';

    onSave({
      name: name.trim(),
      relationship,
      phone: phone.trim() || undefined,
      iconType,
    });
  };

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden text-slate-900">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shrink-0">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-slate-900">
          Ajouter un proche
        </h1>
        <div className="w-6" />
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Top Info Banner with Icon */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-full bg-[#ECE9FE] text-[#4318FF] flex items-center justify-center mx-auto shadow-xs">
            <UserPlus className="w-6 h-6 stroke-[2.3]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
            Enregistrez un membre de votre famille ou un ami pour prendre des tickets en leur nom.
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom ou Surnom */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-700">
              NOM OU SURNOM *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Maman, Papa, Ibrahim..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4318FF] focus:bg-white transition-all"
            />
          </div>

          {/* Lien de parenté */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-700">
              LIEN DE PARENTÉ *
            </label>
            <select
              required
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#4318FF] focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Choisir un lien
              </option>
              <option value="Mère">Mère</option>
              <option value="Père">Père</option>
              <option value="Enfant">Enfant</option>
              <option value="Frère">Frère</option>
              <option value="Soeur">Soeur</option>
              <option value="Conjoint(e)">Conjoint(e)</option>
              <option value="Ami(e)">Ami(e)</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          {/* Numéro de téléphone */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider uppercase text-slate-700">
              NUMÉRO DE TÉLÉPHONE
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="+221 -- --- -- --"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4318FF] focus:bg-white transition-all"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[10px] text-slate-400 italic pt-0.5">
              Optionnel: Pour envoyer les notifications de ticket par SMS.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400">* Champs obligatoires</span>
          </div>
        </form>
      </div>

      {/* Bottom Actions */}
      <div className="p-5 pt-2 pb-4 bg-white border-t border-slate-100 shrink-0 space-y-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!name.trim() || !relationship}
          className="w-full py-3.5 px-6 bg-[#FFBA08] hover:bg-[#F59E0B] active:scale-[0.99] disabled:opacity-50 text-slate-950 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <span>Enregistrer</span>
          <Save className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 text-xs sm:text-sm font-bold text-[#4318FF] hover:underline cursor-pointer text-center"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};
