import React, { useState, useEffect, useRef } from 'react';

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
  const [digits, setDigits] = useState<string[]>(['1', '2', '3', '4', '5', '6']);
  const [focusedIndex, setFocusedIndex] = useState<number>(5);
  const [countdown, setCountdown] = useState<number>(45);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the last or active input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputsRef.current[5]?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, val: string) => {
    const cleaned = val.replace(/\D/g, '');
    const next = [...digits];
    const lastChar = cleaned.slice(-1);
    next[index] = lastChar;
    setDigits(next);

    if (lastChar && index < 5) {
      inputsRef.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

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

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fullCode = digits.join('');
    onVerify(fullCode.length === 6 ? fullCode : '123456');
  };

  const displayPhone = phoneNumber || '+221 70 123 45 67';

  return (
    <div className="relative w-full h-full bg-white text-slate-900 flex flex-col justify-between p-6 select-none max-w-md mx-auto overflow-hidden font-sans">
      {/* Top iOS Status Bar Area */}
      <div className="pt-2 pb-4 flex items-center justify-between text-xs font-semibold text-slate-900 shrink-0">
        <span className="font-bold tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5 text-slate-900">
          <svg className="w-4 h-3.5 fill-current" viewBox="0 0 18 14">
            <path d="M1 10h2v3H1v-3zm4-3h2v6H5V7zm4-3h2v9H9V4zm4-3h2v12h-2V1z" />
          </svg>
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
          </svg>
          <div className="w-5 h-2.5 border border-slate-900 rounded-xs p-0.5 flex items-center">
            <div className="h-full w-3 bg-slate-900 rounded-2xs" />
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="shrink-0 -ml-1">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
          title="Retour"
        >
          <svg className="w-5 h-5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-start pt-6 space-y-7 text-center">
        {/* Headings */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Entrez le code
          </h1>
          <p className="text-base text-slate-500 font-normal leading-relaxed">
            Nous avons envoyé un code OTP<br />
            au <span className="font-semibold text-slate-700">{displayPhone}</span>
          </p>
        </div>

        {/* 6 Digit Inputs */}
        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            {digits.map((digit, index) => {
              const isSelected = focusedIndex === index;

              return (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onFocus={() => setFocusedIndex(index)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl transition-all outline-hidden cursor-text ${
                    isSelected
                      ? 'border-2 border-[#3500FF] bg-white text-[#3500FF]'
                      : digit
                      ? 'border border-transparent bg-[#F4F7FE] text-slate-900'
                      : 'border border-slate-200 bg-[#F4F7FE] text-slate-900'
                  }`}
                />
              );
            })}
          </div>

          {/* Resend Countdown */}
          <div className="text-xs text-slate-500 font-medium pt-2">
            {countdown > 0 ? (
              <span>
                Renvoyer le code dans 00:{countdown < 10 ? `0${countdown}` : countdown}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setCountdown(45)}
                className="text-[#3500FF] font-semibold hover:underline cursor-pointer"
              >
                Renvoyer le code
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Bottom Area: Verify Button & Home Indicator */}
      <div className="shrink-0 space-y-6 pb-2">
        <button
          type="button"
          onClick={() => handleSubmit()}
          className="w-full py-4 px-6 bg-white hover:bg-slate-50 active:scale-[0.99] border border-slate-200 rounded-full text-base font-semibold text-slate-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          <span>vérifier</span>
          <span className="text-lg leading-none">→</span>
        </button>

        {/* Home Indicator */}
        <div className="w-32 h-1 bg-black rounded-full mx-auto" />
      </div>
    </div>
  );
};
