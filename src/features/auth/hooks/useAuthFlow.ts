import { useState } from 'react';
import { VirtualTicket } from '../../../types/ticket';

export type AppScreen =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'otp'
  | 'home'
  | 'take_ticket'
  | 'ticket'
  | 'photos'
  | 'profile';

export function useAuthFlow() {
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [phoneNumber, setPhoneNumber] = useState('+221 70 123 45 67');
  const [activeTicket, setActiveTicket] = useState<VirtualTicket | null>({
    id: 'fl-tk-042',
    ticketNumber: 'ID-042',
    clientName: 'Client Fotolou',
    clientPhone: '+221 70 123 45 67',
    serviceId: 'id_photo',
    serviceName: "Photo d'Identité Express",
    status: 'called',
    createdAt: new Date().toISOString(),
    estimatedWaitMinutes: 3,
    peopleAhead: 1,
    counterNumber: 1,
    notifyMe: true,
  });

  const goToSplash = () => setScreen('splash');
  const goToOnboarding = () => setScreen('onboarding');
  const goToLogin = () => setScreen('login');
  const goToHome = () => setScreen('home');

  const submitPhone = (phone: string) => {
    setPhoneNumber(phone);
    setScreen('otp');
  };

  const submitOtp = (otp: string) => {
    console.log('OTP verified:', otp);
    setScreen('home');
  };

  const createTicket = (serviceName: string, serviceId: string) => {
    const newTk: VirtualTicket = {
      id: `fl-tk-${Date.now()}`,
      ticketNumber: `ID-${Math.floor(100 + Math.random() * 900)}`,
      clientName: 'Client',
      clientPhone: phoneNumber,
      serviceId,
      serviceName,
      status: 'waiting',
      createdAt: new Date().toISOString(),
      estimatedWaitMinutes: 5,
      peopleAhead: 2,
      counterNumber: 1,
      notifyMe: true,
    };
    setActiveTicket(newTk);
    setScreen('ticket');
  };

  const cancelTicket = () => {
    setActiveTicket(null);
    setScreen('home');
  };

  const resetFlow = () => {
    setScreen('onboarding');
  };

  return {
    screen,
    setScreen,
    phoneNumber,
    activeTicket,
    goToSplash,
    goToOnboarding,
    goToLogin,
    goToHome,
    submitPhone,
    submitOtp,
    createTicket,
    cancelTicket,
    resetFlow,
  };
}
