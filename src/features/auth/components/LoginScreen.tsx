import React, { useState } from 'react';
import { FotolouLogo } from '../../../shared/ui/FotolouLogo';

interface LoginScreenProps {
  onContinue: (phoneNumber: string) => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onContinue,
  onGoogleLogin,
  onAppleLogin,
}) => {
  const [countryCode, setCountryCode] = useState('+221');
  const [phoneNumber, setPhoneNumber] = useState('70 123 45 67');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      onContinue(`${countryCode} ${phoneNumber}`);
    }
  };

  return (
    <div className="relative w-full h-full bg-white text-slate-900 flex flex-col justify-between p-5 sm:p-6 select-none max-w-md mx-auto overflow-hidden">
      {/* Top Brand Logo */}
      <div className="pt-2 pb-1 flex items-center justify-center">
        <FotolouLogo variant="colored" size="md" showTagline />
      </div>

      {/* Main Content */}
      <div className="my-auto space-y-4 sm:space-y-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bienvenue 👋
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Connecte-toi pour continuer
          </p>
        </div>

        {/* Phone Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-900">
              Téléphone
            </label>
            <div className="flex items-center border border-slate-200 rounded-2xl p-0.5 bg-white focus-within:border-[#4318FF] focus-within:ring-2 focus-within:ring-[#4318FF]/10 transition-all">
              <div className="flex items-center gap-1 px-2.5 py-2 border-r border-slate-100 text-xs font-semibold text-slate-800 shrink-0">
                <span className="text-sm">🇸🇳</span>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-transparent font-bold focus:outline-hidden cursor-pointer"
                >
                  <option value="+221">+221</option>
                  <option value="+33">+33</option>
                  <option value="+225">+225</option>
                  <option value="+243">+243</option>
                </select>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="70 123 45 67"
                className="w-full px-2.5 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden font-medium"
                required
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative py-1 flex items-center justify-center">
            <div className="w-full border-t border-slate-100" />
            <span className="absolute bg-white px-2.5 text-[11px] text-slate-400 font-medium">
              ou
            </span>
          </div>

          {/* Social Logins from Figma */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={onGoogleLogin}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 border border-slate-200 hover:bg-slate-50 active:bg-slate-100 rounded-2xl text-xs font-bold text-slate-800 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Se connecter avec Google</span>
            </button>

            <button
              type="button"
              onClick={onAppleLogin}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-black hover:bg-slate-900 active:scale-[0.99] text-white rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.67-.82 1.13-1.96 1-3.11-1 .04-2.17.67-2.85 1.48-.6.69-1.12 1.83-.98 2.94 1.11.09 2.19-.58 2.83-1.31z" />
              </svg>
              <span>Se connecter avec Apple</span>
            </button>
          </div>

          {/* Primary CTA */}
          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 px-6 bg-[#4318FF] hover:bg-[#3713D6] active:scale-[0.99] text-white rounded-full text-xs sm:text-sm font-bold shadow-md transition-all mt-2 cursor-pointer"
          >
            Continuer
          </button>
        </form>
      </div>

      {/* Footer Legal */}
      <div className="text-center pt-2 pb-1">
        <p className="text-[10px] text-slate-500 max-w-xs mx-auto leading-tight">
          En continuant, tu acceptes nos{' '}
          <span className="text-[#4318FF] font-semibold cursor-pointer underline">Conditions</span>{' '}
          et notre{' '}
          <span className="text-[#4318FF] font-semibold cursor-pointer underline">Politique de confidentialité</span>.
        </p>
      </div>
    </div>
  );
};
