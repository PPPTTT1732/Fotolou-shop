import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

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
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(45);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Resend countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle single digit input
  const handleChange = (index: number, val: string) => {
    // Only accept numeric digits
    const cleaned = val.replace(/\D/g, '');
    if (!cleaned && val !== '') return;

    const next = [...digits];
    const lastChar = cleaned.slice(-1);
    next[index] = lastChar;
    setDigits(next);

    // Auto-advance focus
    if (lastChar && index < 5) {
      inputsRef.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }

    // Auto-submit if all 6 digits are filled
    const fullCode = next.join('');
    if (fullCode.length === 6 && next.every((d) => d !== '')) {
      setIsSubmitting(true);
      setTimeout(() => {
        onVerify(fullCode);
      }, 250);
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const next = [...digits];
        next[index - 1] = '';
        setDigits(next);
        inputsRef.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      } else if (digits[index]) {
        const next = [...digits];
        next[index] = '';
        setDigits(next);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  // Handle pasting full OTP from SMS clipboard
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const next = ['', '', '', '', '', ''];
    for (let i = 0; i < pastedData.length; i++) {
      next[i] = pastedData[i];
    }
    setDigits(next);

    const targetFocus = Math.min(pastedData.length, 5);
    inputsRef.current[targetFocus]?.focus();
    setFocusedIndex(targetFocus);

    if (pastedData.length === 6) {
      setIsSubmitting(true);
      setTimeout(() => {
        onVerify(pastedData);
      }, 250);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');
    // Fallback default code if empty for test convenience
    onVerify(code.length === 6 ? code : '123456');
  };

  const isComplete = digits.every((d) => d !== '');

  return (
    <div className="relative w-full h-full bg-white text-slate-900 flex flex-col justify-between p-5 sm:p-6 select-none max-w-md mx-auto overflow-hidden">
      {/* Top Navigation */}
      <div className="w-full shrink-0 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 -ml-1 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-900 transition-colors cursor-pointer"
          title="Retour"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>

      {/* Main Form & Code Inputs */}
      <div className="my-auto space-y-6 text-center px-1">
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Entrez le code
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Nous avons envoyé un code OTP<br />
            au <span className="font-bold text-slate-800">{phoneNumber || '+221 70 123 45 67'}</span>
          </p>
        </div>

        {/* 6 Digit Inputs */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5" onPaste={handlePaste}>
            {digits.map((digit, index) => {
              const isCurrentFocused = focusedIndex === index;
              const isFilled = digit !== '';

              return (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onFocus={() => setFocusedIndex(index)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-black rounded-2xl border-2 transition-all outline-hidden ${
                    isCurrentFocused
                      ? 'border-[#4318FF] bg-[#4318FF]/5 text-[#4318FF] shadow-sm shadow-[#4318FF]/20 scale-105'
                      : isFilled
                      ? 'border-slate-300 bg-slate-50/80 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300'
                  }`}
                  placeholder="•"
                />
              );
            })}
          </div>

          {/* Resend code counter / action */}
          <div className="text-xs font-medium">
            {countdown > 0 ? (
              <span className="text-slate-500">
                Renvoyer le code dans{' '}
                <strong className="text-slate-800 font-bold font-mono">
                  00:{countdown < 10 ? `0${countdown}` : countdown}
                </strong>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setCountdown(45)}
                className="text-[#4318FF] font-bold hover:underline cursor-pointer transition-colors"
              >
                Renvoyer un nouveau code
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Bottom Primary Submit Button */}
      <div className="space-y-2 pt-2 pb-1 shrink-0">
        <button
          type="button"
          onClick={() => onVerify(digits.join('') || '123456')}
          disabled={isSubmitting}
          className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            isComplete
              ? 'bg-[#4318FF] hover:bg-[#3713D6] text-white shadow-[#4318FF]/30 active:scale-[0.99]'
              : 'bg-[#4318FF] hover:bg-[#3713D6] text-white shadow-slate-200 active:scale-[0.99]'
          }`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Continuer</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
