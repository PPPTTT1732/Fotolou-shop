import React from 'react';
import { Check } from 'lucide-react';

interface PaymentSuccessScreenProps {
  orderNumber?: string;
  totalAmount?: number;
  onTrackOrder: () => void;
  onGoHome: () => void;
}

export const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({
  orderNumber = '#COM_0001',
  totalAmount = 89500,
  onTrackOrder,
  onGoHome,
}) => {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden text-slate-900 px-6 py-10 relative">
      {/* Decorative Confetti dots */}
      <div className="absolute top-12 left-10 w-2 h-2 rounded-full bg-[#4318FF] opacity-70 animate-bounce" />
      <div className="absolute top-20 right-14 w-2 h-2 rounded-full bg-[#FF7A00] opacity-80" />
      <div className="absolute top-36 left-16 w-2.5 h-2.5 rounded-full bg-[#05CD99] opacity-80" />
      <div className="absolute top-36 right-10 w-2 h-2 rounded-full bg-[#FFBA08] opacity-80" />

      {/* Main Success Container */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 pt-4">
        {/* Large Green Check Circle */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-[#05CD99] text-white flex items-center justify-center shadow-xl shadow-[#05CD99]/30">
            <Check className="w-12 h-12 stroke-[3]" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Paiement réussi !
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
            Votre commande a été confirmée avec succès.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="w-full max-w-xs bg-slate-50/60 rounded-3xl p-4 space-y-3 border border-slate-100">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              NUMÉRO DE COMMANDE
            </span>
            <p className="text-base sm:text-lg font-black text-slate-900 font-mono">
              {orderNumber}
            </p>
          </div>

          <div className="space-y-0.5 pt-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              MONTANT PAYÉ
            </span>
            <p className="text-lg sm:text-xl font-black text-slate-900">
              {totalAmount.toLocaleString('fr-FR')} FCFA
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="w-full space-y-3 pt-6 shrink-0">
        <button
          onClick={onTrackOrder}
          className="w-full py-4 rounded-2xl bg-[#4318FF] hover:bg-[#3311CC] active:scale-[0.99] text-white text-sm font-black transition-all cursor-pointer shadow-md shadow-[#4318FF]/25 text-center"
        >
          Suivre ma commande
        </button>

        <button
          onClick={onGoHome}
          className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-700 border border-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer text-center"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};
