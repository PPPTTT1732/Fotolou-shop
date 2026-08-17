import React, { useState } from 'react';
import { SplashScreen } from '../features/auth/components/SplashScreen';
import { LoginScreen } from '../features/auth/components/LoginScreen';
import { OtpVerificationScreen } from '../features/auth/components/OtpVerificationScreen';
import { Tabs } from '../shared/ui/Tabs';
import { Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

interface FigmaScreensViewProps {
  onToast: (title: string, desc?: string) => void;
}

export const FigmaScreensView: React.FC<FigmaScreensViewProps> = ({ onToast }) => {
  const [activeScreen, setActiveScreen] = useState<'all' | 'splash' | 'login' | 'otp'>('all');
  const [phone, setPhone] = useState('+221 70 123 45 67');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#4318FF]" />
            Écrans Figma FOTOLOU (100% Fidélité)
          </h2>
          <p className="text-xs text-slate-400">
            Implémentation exacte des maquettes Figma 01 · SPLASH & 05 · AUTH / OTP
          </p>
        </div>

        <Tabs
          tabs={[
            { id: 'all', label: 'Vue d’ensemble' },
            { id: 'splash', label: '01 · Splash' },
            { id: 'login', label: '05 · Login' },
            { id: 'otp', label: '05 · OTP' },
          ]}
          activeTab={activeScreen}
          onChange={(id) => setActiveScreen(id as any)}
        />
      </div>

      {activeScreen === 'all' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Frame 1: Splash */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
              01 · S P L A S H
            </div>
            <div className="w-full max-w-[360px] mx-auto rounded-[36px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-black aspect-9/18">
              <SplashScreen onComplete={() => onToast('Splash terminé', 'Transition vers l’accueil')} autoDismiss={false} />
            </div>
          </div>

          {/* Frame 2: Login */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
              05 · S P L A S H / LOGIN
            </div>
            <div className="w-full max-w-[360px] mx-auto rounded-[36px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-white aspect-9/18">
              <LoginScreen
                onContinue={(p) => {
                  setPhone(p);
                  setActiveScreen('otp');
                  onToast('Code OTP envoyé', `SMS envoyé au ${p}`);
                }}
                onGoogleLogin={() => onToast('Google Auth', 'Connexion réussie')}
                onAppleLogin={() => onToast('Apple Auth', 'Connexion réussie')}
              />
            </div>
          </div>

          {/* Frame 3: OTP */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
              05 · S P L A S H / OTP
            </div>
            <div className="w-full max-w-[360px] mx-auto rounded-[36px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-white aspect-9/18">
              <OtpVerificationScreen
                phoneNumber={phone}
                onVerify={(otp) => onToast('Code OTP vérifié !', `Code ${otp} validé avec succès.`)}
                onBack={() => setActiveScreen('login')}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[380px] mx-auto rounded-[40px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-white min-h-[660px]">
          {activeScreen === 'splash' && (
            <SplashScreen onComplete={() => setActiveScreen('login')} autoDismiss={false} />
          )}
          {activeScreen === 'login' && (
            <LoginScreen
              onContinue={(p) => {
                setPhone(p);
                setActiveScreen('otp');
              }}
              onGoogleLogin={() => onToast('Google Auth', 'Connexion Google')}
              onAppleLogin={() => onToast('Apple Auth', 'Connexion Apple')}
            />
          )}
          {activeScreen === 'otp' && (
            <OtpVerificationScreen
              phoneNumber={phone}
              onVerify={(otp) => onToast('Vérification réussie', `Code ${otp} validé.`)}
              onBack={() => setActiveScreen('login')}
            />
          )}
        </div>
      )}
    </div>
  );
};
