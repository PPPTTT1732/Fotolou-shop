import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface OtpVerificationScreenProps {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
}

export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  phoneNumber,
  onVerify,
  onBack,
}) => {
  const [digits, setDigits] = useState(['1', '2', '3', '4', '5', '6']);
  const [countdown, setCountdown] = useState(45);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...digits];
    next[index] = val.slice(-1);
    setDigits(next);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(digits.join(''));
  };

  return (
    <div className="relative w-full h-full bg-white text-slate-900 flex flex-col justify-between p-5 sm:p-6 select-none max-w-md mx-auto overflow-hidden">
      {/* Top Header */}
      <div className="w-full">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
          title="Retour"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
      </div>

      {/* Main Content */}
      <div className="my-auto space-y-6 text-center px-1">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Entrez le code
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1.5 leading-relaxed">
            Nous avons envoyé un code OTP<br />
            au <span className="font-semibold text-slate-800">{phoneNumber || '+221 70 123 45 67'}</span>
          </p>
        </div>

        {/* 6 Digit Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputsRef.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-10 h-12 sm:w-11 sm:h-13 text-center text-lg sm:text-xl font-bold rounded-xl border-2 transition-all ${
                  index === 5
                    ? 'border-[#4318FF] bg-[#4318FF]/5 text-[#4318FF]'
                    : 'border-slate-200 bg-white text-slate-900 focus:border-[#4318FF]'
                } focus:outline-hidden`}
              />
            ))}
          </div>

          {/* Resend code */}
          <div className="text-xs text-slate-500 font-medium">
            {countdown > 0 ? (
              <span>Renvoyer le code dans 00:{countdown < 10 ? `0${countdown}` : countdown}</span>
            ) : (
              <button
                type="button"
                onClick={() => setCountdown(45)}
                className="text-[#4318FF] font-bold hover:underline cursor-pointer"
              >
                Renvoyer un nouveau code
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="space-y-2 pt-2 pb-1">
        <button
          type="button"
          onClick={() => onVerify(digits.join(''))}
          className="w-full py-3 sm:py-3.5 px-6 border-2 border-slate-200 hover:border-[#4318FF] hover:text-[#4318FF] active:scale-[0.99] bg-white rounded-full text-xs sm:text-sm font-bold text-slate-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Vérifier</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
