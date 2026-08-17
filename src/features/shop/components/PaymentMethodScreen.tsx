import React, { useState } from 'react';
import { ArrowLeft, Lock, Check } from 'lucide-react';

interface PaymentMethodScreenProps {
  totalAmount: number;
  onBack: () => void;
  onPay: (method: 'wave' | 'orange_money') => void;
}

export const PaymentMethodScreen: React.FC<PaymentMethodScreenProps> = ({
  totalAmount = 89500,
  onBack,
  onPay,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'wave' | 'orange_money'>('wave');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayClick = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPay(selectedMethod);
    }, 1200);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden text-slate-900">
      {/* Top App Bar */}
      <div className="px-5 pt-4 pb-2 flex items-center shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-6 pt-4">
        {/* Header Title */}
        <div className="text-center space-y-3">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            Choisissez votre moyen<br />de paiement
          </h1>
          <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />
        </div>

        {/* Payment Methods Options */}
        <div className="space-y-3.5 pt-2">
          {/* WAVE OPTION */}
          <div
            onClick={() => setSelectedMethod('wave')}
            className={`w-full p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              selectedMethod === 'wave'
                ? 'border-[#4318FF] bg-[#F4F7FE]/60 shadow-xs'
                : 'border-slate-100 bg-white hover:border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3.5">
              {/* Wave Penguin Icon Box */}
              <div className="w-12 h-12 rounded-2xl bg-[#00D6FE] flex items-center justify-center text-white shadow-xs shrink-0 overflow-hidden relative">
                {/* SVG Penguin Logo for Wave */}
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" fill="#00D6FE" />
                  <ellipse cx="12" cy="13" rx="7" ry="8" fill="#1E293B" />
                  <ellipse cx="12" cy="14" rx="4.5" ry="6" fill="#FFFFFF" />
                  <circle cx="10" cy="9" r="1.5" fill="#FFFFFF" />
                  <circle cx="14" cy="9" r="1.5" fill="#FFFFFF" />
                  <circle cx="10.5" cy="9" r="0.75" fill="#1E293B" />
                  <circle cx="13.5" cy="9" r="0.75" fill="#1E293B" />
                  <polygon points="12,10.5 10.5,12 13.5,12" fill="#F59E0B" />
                </svg>
              </div>

              <div className="text-left space-y-0.5">
                <h3 className="text-sm font-black text-slate-900">Wave</h3>
                <p className="text-xs text-slate-400 font-medium">
                  Payer avec Wave
                </p>
              </div>
            </div>

            {/* Radio Circle */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedMethod === 'wave'
                  ? 'border-[#4318FF] bg-[#4318FF]'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {selectedMethod === 'wave' && (
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </div>
          </div>

          {/* ORANGE MONEY OPTION */}
          <div
            onClick={() => setSelectedMethod('orange_money')}
            className={`w-full p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              selectedMethod === 'orange_money'
                ? 'border-[#4318FF] bg-[#F4F7FE]/60 shadow-xs'
                : 'border-slate-100 bg-white hover:border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3.5">
              {/* Orange Money Icon Box */}
              <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-xs shrink-0 overflow-hidden relative p-2">
                <div className="w-full h-full rounded-lg bg-black flex flex-col justify-center items-center">
                  <div className="flex items-center gap-0.5">
                    <span className="text-[#FF7A00] font-black text-sm leading-none">
                      ↗
                    </span>
                    <span className="text-white font-black text-sm leading-none">
                      ↙
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-left space-y-0.5">
                <h3 className="text-sm font-black text-slate-900">
                  Orange Money
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Payer avec Orange Money
                </p>
              </div>
            </div>

            {/* Radio Circle */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedMethod === 'orange_money'
                  ? 'border-[#4318FF] bg-[#4318FF]'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {selectedMethod === 'orange_money' && (
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </div>
          </div>
        </div>

        {/* 100% Secure Payment Badge */}
        <div className="pt-8 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400">
          <Lock className="w-3.5 h-3.5" />
          <span>Paiement 100% sécurisé</span>
        </div>
      </div>

      {/* Bottom Sticky Action Button: Yellow "Payez Maintenant" */}
      <div className="p-5 border-t border-slate-100 bg-white shrink-0">
        <button
          onClick={handlePayClick}
          disabled={isProcessing}
          className="w-full py-4 rounded-2xl bg-[#FFBA08] hover:bg-[#F59E0B] active:scale-[0.99] text-slate-950 text-sm font-black transition-all cursor-pointer shadow-md text-center flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>Payez Maintenant</span>
          )}
        </button>
      </div>
    </div>
  );
};
