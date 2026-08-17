import React from 'react';
import { SplashScreen } from './SplashScreen';
import { OnboardingScreen } from './OnboardingScreen';
import { LoginScreen } from './LoginScreen';
import { OtpVerificationScreen } from './OtpVerificationScreen';
import { ClientHomeScreen } from '../../home/components/ClientHomeScreen';
import { ActiveTicketScreen } from '../../tickets/components/ActiveTicketScreen';
import { MyPhotosScreen } from '../../photos/components/MyPhotosScreen';
import { ClientProfileScreen } from '../../profile/components/ClientProfileScreen';
import { Sparkles } from 'lucide-react';
import { VirtualTicket } from '../../../types/ticket';
import { AppScreen } from '../hooks/useAuthFlow';

interface AuthGridViewProps {
  phoneNumber: string;
  activeTicket: VirtualTicket | null;
  onSelectScreen: (screen: AppScreen) => void;
  onToast: (title: string, desc?: string) => void;
}

export const AuthGridView: React.FC<AuthGridViewProps> = ({
  phoneNumber,
  activeTicket,
  onSelectScreen,
  onToast,
}) => {
  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-black text-slate-200 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8165FF]" />
          Ensemble des Écrans Mobiles FOTOLOU
        </h2>
        <p className="text-xs text-slate-400">
          Maquettes Figma : Splash, Onboarding, Login, OTP, Accueil, Ticket Live, Photos & Profil
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {/* Frame 1: Splash */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase font-semibold text-center">01 · SPLASH</div>
          <div className="w-full max-w-[320px] mx-auto rounded-[36px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-black min-h-[580px]">
            <SplashScreen onComplete={() => onSelectScreen('onboarding')} autoDismiss={false} />
          </div>
        </div>

        {/* Frame 2: Onboarding */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase font-semibold text-center">02 · ONBOARDING</div>
          <div className="w-full max-w-[320px] mx-auto rounded-[36px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-white min-h-[580px]">
            <OnboardingScreen onFinish={() => onSelectScreen('login')} />
          </div>
        </div>

        {/* Frame 3: Login */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase font-semibold text-center">05 · LOGIN</div>
          <div className="w-full max-w-[320px] mx-auto rounded-[36px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-white min-h-[580px]">
            <LoginScreen
              onContinue={(phone) => {
                onToast('SMS OTP envoyé', `Code envoyé au ${phone}`);
                onSelectScreen('otp');
              }}
              onGoogleLogin={() => onToast('Google Auth', 'Connexion réussie')}
              onAppleLogin={() => onToast('Apple Auth', 'Connexion réussie')}
            />
          </div>
        </div>

        {/* Frame 4: OTP */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase font-semibold text-center">05 · OTP</div>
          <div className="w-full max-w-[320px] mx-auto rounded-[36px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-white min-h-[580px]">
            <OtpVerificationScreen
              phoneNumber={phoneNumber}
              onVerify={(otp) => {
                onToast('OTP Validé !', `Code ${otp} validé.`);
                onSelectScreen('home');
              }}
              onBack={() => onSelectScreen('login')}
            />
          </div>
        </div>

        {/* Frame 5: Home */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase font-semibold text-center">06 · ACCUEIL</div>
          <div className="w-full max-w-[320px] mx-auto rounded-[36px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-50 min-h-[580px] flex flex-col justify-between">
            <ClientHomeScreen
              phoneNumber={phoneNumber}
              activeTicket={activeTicket}
              onTakeTicket={() => onSelectScreen('take_ticket')}
              onViewTicket={() => onSelectScreen('ticket')}
              onSelectService={() => onSelectScreen('take_ticket')}
            />
          </div>
        </div>

        {/* Frame 6: Ticket */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase font-semibold text-center">07 · TICKET LIVE</div>
          <div className="w-full max-w-[320px] mx-auto rounded-[36px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-50 min-h-[580px] flex flex-col justify-between">
            <ActiveTicketScreen
              ticket={activeTicket}
              onBack={() => onSelectScreen('home')}
              onCancelTicket={() => onToast('Ticket annulé')}
              onToggleNotification={() => onToast('Notification modifiée')}
              onNewTicket={() => onSelectScreen('take_ticket')}
            />
          </div>
        </div>

        {/* Frame 7: Photos */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase font-semibold text-center">08 · MES PHOTOS</div>
          <div className="w-full max-w-[320px] mx-auto rounded-[36px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-50 min-h-[580px] flex flex-col justify-between">
            <MyPhotosScreen onToast={onToast} />
          </div>
        </div>

        {/* Frame 8: Profile */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase font-semibold text-center">09 · PROFIL</div>
          <div className="w-full max-w-[320px] mx-auto rounded-[36px] overflow-hidden border-4 border-slate-800 shadow-2xl bg-slate-50 min-h-[580px] flex flex-col justify-between">
            <ClientProfileScreen
              phoneNumber={phoneNumber}
              onLogout={() => onSelectScreen('onboarding')}
              onToast={onToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
