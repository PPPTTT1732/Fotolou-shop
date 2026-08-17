import React from 'react';
import { CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { FotolouLogo } from '../../../shared/ui/FotolouLogo';

interface AuthSuccessScreenProps {
  phoneNumber: string;
  onReset: () => void;
}

export const AuthSuccessScreen: React.FC<AuthSuccessScreenProps> = ({
  phoneNumber,
  onReset,
}) => {
  return (
    <div className="relative w-full h-full min-h-[640px] bg-white text-slate-900 flex flex-col justify-between p-6 select-none max-w-md mx-auto">
      {/* Top Header */}
      <div className="w-full flex items-center justify-center pt-2">
        <FotolouLogo size="md" showTagline />
      </div>

      {/* Main Content */}
      <div className="my-auto space-y-6 text-center py-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-lg animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            Connexion Réussie 🎉
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bienvenue sur Fotolou
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
            Votre compte pour le numéro <span className="font-bold text-slate-800">{phoneNumber}</span> est vérifié.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 max-w-xs mx-auto">
          <div className="text-xs font-bold text-slate-700">Statut du compte :</div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Session active & sécurisée</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-[#4318FF]" />
            <span>Guichet Studio & Tickets prêts</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="space-y-3 pt-4">
        <button
          onClick={onReset}
          className="w-full py-3.5 px-6 bg-[#4318FF] hover:bg-[#3713D6] active:scale-[0.99] text-white rounded-full text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Recommencer le parcours Onboarding</span>
        </button>
        <div className="w-32 h-1 bg-slate-900 rounded-full mx-auto" />
      </div>
    </div>
  );
};
