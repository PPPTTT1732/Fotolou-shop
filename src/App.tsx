import React, { useState } from 'react';
import { useAuthFlow } from './features/auth/hooks/useAuthFlow';
import { SplashScreen } from './features/auth/components/SplashScreen';
import { OnboardingScreen } from './features/auth/components/OnboardingScreen';
import { LoginScreen } from './features/auth/components/LoginScreen';
import { OtpVerificationScreen } from './features/auth/components/OtpVerificationScreen';

import { ClientHomeScreen } from './features/home/components/ClientHomeScreen';
import { SalonDetailScreen } from './features/salons/components/SalonDetailScreen';
import { TakeTicketBeneficiaryScreen } from './features/tickets/components/TakeTicketBeneficiaryScreen';
import { TicketsScreen } from './features/tickets/components/TicketsScreen';
import { LiveTicketScreen } from './features/tickets/components/LiveTicketScreen';
import { ClientProfileScreen } from './features/profile/components/ClientProfileScreen';
import { RelativesListScreen } from './features/profile/components/RelativesListScreen';
import { AddRelativeScreen } from './features/profile/components/AddRelativeScreen';
import { ShopScreen } from './features/shop/components/ShopScreen';
import { ClientBottomNav, MainTab } from './components/navigation/ClientBottomNav';

import { ProHomeScreen } from './features/pro/components/ProHomeScreen';
import { ProQueueScreen } from './features/pro/components/ProQueueScreen';
import { ProProfileScreen } from './features/pro/components/ProProfileScreen';
import { ProBottomNav, ProTab } from './components/navigation/ProBottomNav';

import {
  INITIAL_SALONS,
  INITIAL_RELATIVES,
  INITIAL_ACTIVE_TICKETS,
  INITIAL_HISTORY_TICKETS,
  INITIAL_PRO_QUEUE,
  INITIAL_PRO_HISTORY,
} from './data/salonMockData';
import { Salon, Relative, SalonTicket, ProQueueClient, AppUserRole } from './types/salon';
import { useToast } from './shared/feedback/useToast';
import { ToastContainer } from './shared/feedback/Toast';
import { PwaInstallBanner } from './components/PwaInstallBanner';
import { Repeat } from 'lucide-react';

export type AppView =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'otp'
  | 'home'
  | 'salon_detail'
  | 'take_ticket'
  | 'tickets'
  | 'live_ticket'
  | 'shop'
  | 'profile'
  | 'relatives_list'
  | 'add_relative'
  | 'pro_home'
  | 'pro_queue'
  | 'pro_profile';

export default function App() {
  const {
    screen: authScreen,
    setScreen: setAuthScreen,
    phoneNumber,
    goToOnboarding,
    goToLogin,
    submitPhone,
    submitOtp,
    resetFlow,
  } = useAuthFlow();

  const { toasts, addToast, dismissToast } = useToast();

  // Mode Selection: 'client' or 'pro' (Salon Manager)
  const [userRole, setUserRole] = useState<AppUserRole>('pro');

  // Client Tab Navigation State
  const [currentTab, setCurrentTab] = useState<MainTab>('home');
  const [currentView, setCurrentView] = useState<AppView>('pro_home');

  // Pro Tab Navigation State
  const [proTab, setProTab] = useState<ProTab>('pro_home');

  // Salon App State (Client)
  const [salons] = useState<Salon[]>(INITIAL_SALONS);
  const [selectedSalon, setSelectedSalon] = useState<Salon>(INITIAL_SALONS[0]);
  const [relatives, setRelatives] = useState<Relative[]>(INITIAL_RELATIVES);
  const [activeTickets, setActiveTickets] = useState<SalonTicket[]>(INITIAL_ACTIVE_TICKETS);
  const [historyTickets, setHistoryTickets] = useState<SalonTicket[]>(INITIAL_HISTORY_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<SalonTicket>(INITIAL_ACTIVE_TICKETS[0]);

  // Salon Manager State (Pro)
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(true);
  const [proQueue, setProQueue] = useState<ProQueueClient[]>(INITIAL_PRO_QUEUE);
  const [proHistory, setProHistory] = useState<ProQueueClient[]>(INITIAL_PRO_HISTORY);
  const [proServedCount, setProServedCount] = useState<number>(25);

  // Check if we are inside the main authenticated app
  const isAuthenticated = !['splash', 'onboarding', 'login', 'otp'].includes(authScreen);

  // Handle Client Tab changes
  const handleClientTabChange = (tab: MainTab) => {
    setCurrentTab(tab);
    if (tab === 'home') setCurrentView('home');
    if (tab === 'tickets') setCurrentView('tickets');
    if (tab === 'shop') setCurrentView('shop');
    if (tab === 'profile') setCurrentView('profile');
  };

  // Handle Pro Tab changes
  const handleProTabChange = (tab: ProTab) => {
    setProTab(tab);
    setCurrentView(tab);
  };

  // Switch between Client Mode and Pro Mode
  const handleSwitchRole = (role: AppUserRole) => {
    setUserRole(role);
    if (role === 'pro') {
      setProTab('pro_home');
      setCurrentView('pro_home');
      addToast('Espace Salon activé 💈', 'Vous êtes en mode Gérant / Salon');
    } else {
      setCurrentTab('home');
      setCurrentView('home');
      addToast('Espace Client activé 👤', 'Vous êtes en mode Client');
    }
  };

  // Pro Actions
  const handleToggleQueue = () => {
    setIsQueueOpen((prev) => {
      const next = !prev;
      addToast(
        next ? 'File d\'attente ouverte ✅' : 'File d\'attente fermée ⏸️',
        next ? 'Les clients peuvent maintenant prendre un ticket.' : 'La prise de tickets est temporairement suspendue.'
      );
      return next;
    });
  };

  const handleServeClient = (client: ProQueueClient) => {
    setProQueue((prev) => prev.filter((c) => c.id !== client.id));
    setProHistory((prev) => [
      {
        ...client,
        status: 'served',
        timeLabel: 'À l\'instant',
      },
      ...prev,
    ]);
    setProServedCount((prev) => prev + 1);
    addToast('Client servi ✨', `${client.name} (N°${String(client.queueNumber).padStart(2, '0')}) a été servi.`);
  };

  const handleSkipClient = (client: ProQueueClient) => {
    setProQueue((prev) => {
      const filtered = prev.filter((c) => c.id !== client.id);
      return [...filtered, { ...client, status: 'waiting' }];
    });
    addToast('Client mis en attente ⏭️', `${client.name} a été déplacé en fin de file.`);
  };

  const handleAddProClient = (data: { name: string; phone: string }) => {
    const nextNumber = proQueue.length > 0
      ? Math.max(...proQueue.map((c) => c.queueNumber)) + 1
      : 1;

    const newClient: ProQueueClient = {
      id: `pq-${Date.now()}`,
      queueNumber: nextNumber,
      name: data.name,
      phone: data.phone,
      status: proQueue.length === 0 ? 'in_progress' : 'waiting',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setProQueue((prev) => [...prev, newClient]);
    addToast('Client ajouté 🎉', `${data.name} (N°${String(nextNumber).padStart(2, '0')}) ajouté à la file.`);
  };

  const handleDeleteProClient = (client: ProQueueClient) => {
    setProQueue((prev) => prev.filter((c) => c.id !== client.id));
    setProHistory((prev) => [
      {
        ...client,
        status: 'cancelled',
        timeLabel: 'À l\'instant',
      },
      ...prev,
    ]);
    addToast('Ticket annulé', `Le ticket de ${client.name} a été annulé.`);
  };

  // Client Ticket booking for beneficiary
  const handleConfirmTicket = (beneficiary: {
    name: string;
    phone: string;
    type: 'self' | 'relative' | 'other';
  }) => {
    const newNumber = activeTickets.length > 0
      ? Math.max(...activeTickets.map((t) => t.ticketNumber)) + 1
      : 7;

    const newTicket: SalonTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber: newNumber,
      salonId: selectedSalon.id,
      salonName: selectedSalon.name,
      salonLocation: selectedSalon.location,
      beneficiaryName: beneficiary.name,
      beneficiaryPhone: beneficiary.phone,
      beneficiaryType: beneficiary.type,
      status: activeTickets.length === 0 ? 'your_turn' : 'waiting',
      peopleAhead: activeTickets.length,
      currentNumber: 3,
      createdAt: new Date().toISOString(),
      notificationPhone: beneficiary.phone || '+221 77 862 70 52',
    };

    setActiveTickets([newTicket, ...activeTickets]);
    setSelectedTicket(newTicket);
    setCurrentView('live_ticket');
    setCurrentTab('tickets');
    addToast('Ticket généré ! 🎉', `Votre ticket N°${newNumber} pour ${beneficiary.name} est confirmé.`);
  };

  // Leave queue / cancel ticket (Client)
  const handleLeaveQueue = (ticketToCancel: SalonTicket) => {
    setActiveTickets((prev) => prev.filter((t) => t.id !== ticketToCancel.id));
    setHistoryTickets((prev) => [
      {
        ...ticketToCancel,
        status: 'cancelled',
        timeLabel: "Aujourd'hui, 15h02",
      },
      ...prev,
    ]);
    addToast('File quittée', 'Le ticket a été annulé avec succès.');
    setCurrentView('tickets');
    setCurrentTab('tickets');
  };

  // Add new relative (Client)
  const handleSaveRelative = (newRelData: Omit<Relative, 'id'>) => {
    const newRel: Relative = {
      ...newRelData,
      id: `rel-${Date.now()}`,
    };
    setRelatives((prev) => [...prev, newRel]);
    addToast('Proche enregistré !', `${newRel.name} a été ajouté(e) à vos proches.`);
    setCurrentView('relatives_list');
  };

  // Bottom Nav Visibility
  const showClientBottomNav =
    isAuthenticated &&
    userRole === 'client' &&
    ['home', 'tickets', 'shop', 'profile'].includes(currentView);

  const showProBottomNav =
    isAuthenticated &&
    userRole === 'pro' &&
    ['pro_home', 'pro_queue', 'pro_profile'].includes(currentView);

  return (
    <div className="w-full h-[100dvh] h-screen bg-slate-900 sm:bg-slate-950 flex flex-col items-center justify-center overflow-hidden font-sans select-none relative">
      {/* Desktop Quick Mode Switcher Pill */}
      {isAuthenticated && (
        <div className="hidden sm:flex items-center gap-2 mb-3 bg-slate-800/90 border border-slate-700/80 p-1 rounded-full shadow-lg z-50">
          <button
            onClick={() => handleSwitchRole('pro')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              userRole === 'pro'
                ? 'bg-[#4318FF] text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            💈 Espace Salon (Pro)
          </button>
          <button
            onClick={() => handleSwitchRole('client')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              userRole === 'client'
                ? 'bg-[#4318FF] text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            👤 Espace Client
          </button>
        </div>
      )}

      {/* Mobile Frame Shell */}
      <div className="relative w-full h-full sm:max-w-[400px] sm:h-[840px] sm:max-h-[92vh] sm:rounded-[40px] sm:border-[6px] sm:border-slate-800 sm:shadow-2xl bg-white flex flex-col justify-between overflow-hidden">
        
        {/* Dynamic Screen View */}
        <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
          {/* Auth Flow */}
          {authScreen === 'splash' && (
            <SplashScreen onComplete={goToOnboarding} autoDismiss={true} />
          )}

          {authScreen === 'onboarding' && (
            <OnboardingScreen onFinish={goToLogin} />
          )}

          {authScreen === 'login' && (
            <LoginScreen
              onContinue={(phone) => {
                submitPhone(phone);
                addToast('Code OTP envoyé !', `SMS envoyé au ${phone}`);
              }}
              onGoogleLogin={() => {
                submitPhone('+221 77 862 70 52');
                submitOtp('123456');
                addToast('Bienvenue ! 🎉', 'Connecté en tant que Bakary Diassy');
              }}
              onAppleLogin={() => {
                submitPhone('+221 77 862 70 52');
                submitOtp('123456');
                addToast('Bienvenue ! 🎉', 'Connecté en tant que Bakary Diassy');
              }}
            />
          )}

          {authScreen === 'otp' && (
            <OtpVerificationScreen
              phoneNumber={phoneNumber}
              onVerify={(otp) => {
                submitOtp(otp);
                addToast('Bienvenue Diassy ! 👋', 'Authentification réussie.');
              }}
              onBack={goToLogin}
            />
          )}

          {/* Authenticated In-App Flow */}
          {isAuthenticated && (
            <>
              {/* 1. Home / Salons Proches */}
              {currentView === 'home' && (
                <ClientHomeScreen
                  salons={salons}
                  onSelectSalon={(salon) => {
                    setSelectedSalon(salon);
                    setCurrentView('salon_detail');
                  }}
                  onNotificationsClick={() =>
                    addToast('Notifications', 'Vous avez 1 rappel de rendez-vous.')
                  }
                />
              )}

              {/* 2. Salon Detail (King Barber) */}
              {currentView === 'salon_detail' && (
                <SalonDetailScreen
                  salon={selectedSalon}
                  onBack={() => {
                    setCurrentView('home');
                    setCurrentTab('home');
                  }}
                  onTakeTicket={() => setCurrentView('take_ticket')}
                  onActionToast={(msg) => addToast('Action salon', msg)}
                />
              )}

              {/* 3. Take Ticket - "Pour qui ?" */}
              {currentView === 'take_ticket' && (
                <TakeTicketBeneficiaryScreen
                  salon={selectedSalon}
                  relatives={relatives}
                  userName="Bakary"
                  userPhone="+221 77 862 70 52"
                  onBack={() => setCurrentView('salon_detail')}
                  onConfirm={handleConfirmTicket}
                  onAddNewRelativeClick={() => setCurrentView('add_relative')}
                />
              )}

              {/* 4 & 6. Tickets Tabs (Actuel & Historiques) */}
              {currentView === 'tickets' && (
                <TicketsScreen
                  activeTickets={activeTickets}
                  historyTickets={historyTickets}
                  onSelectTicket={(ticket) => {
                    setSelectedTicket(ticket);
                    setCurrentView('live_ticket');
                  }}
                  onFilterClick={() =>
                    addToast('Filtres', 'Filtre appliqué aux passages récents.')
                  }
                />
              )}

              {/* 5. Live Ticket with circular gauge */}
              {currentView === 'live_ticket' && (
                <LiveTicketScreen
                  ticket={selectedTicket}
                  onBack={() => {
                    setCurrentView('tickets');
                    setCurrentTab('tickets');
                  }}
                  onLeaveQueue={handleLeaveQueue}
                />
              )}

              {/* Shop */}
              {currentView === 'shop' && (
                <ShopScreen
                  onShowToast={(title, msg) => addToast(title, msg)}
                  onGoToHome={() => {
                    setCurrentTab('home');
                    setCurrentView('home');
                  }}
                />
              )}

              {/* 7. Profile */}
              {currentView === 'profile' && (
                <ClientProfileScreen
                  userName="BAKARY"
                  phoneNumber="+221 77 862 70 52"
                  ticketsCount={activeTickets.length}
                  servedCount={25}
                  onOpenRelatives={() => setCurrentView('relatives_list')}
                  onOpenSettings={() => addToast('Paramètres', 'Préférences de compte.')}
                  onOpenHelp={() => addToast('Aide & Support', 'Centre d’aide disponible 24/7.')}
                  onSwitchToPro={() => handleSwitchRole('pro')}
                  onLogout={() => {
                    resetFlow();
                    setAuthScreen('login');
                    addToast('Déconnecté', 'À bientôt !');
                  }}
                />
              )}

              {/* 8. Relatives List */}
              {currentView === 'relatives_list' && (
                <RelativesListScreen
                  relatives={relatives}
                  onBack={() => {
                    setCurrentView('profile');
                    setCurrentTab('profile');
                  }}
                  onAddRelative={() => setCurrentView('add_relative')}
                  onEditRelative={(rel) =>
                    addToast('Modifier', `Modification de ${rel.name}`)
                  }
                />
              )}

              {/* 9. Add Relative */}
              {currentView === 'add_relative' && (
                <AddRelativeScreen
                  onBack={() => setCurrentView('relatives_list')}
                  onSave={handleSaveRelative}
                />
              )}

              {/* PRO MODE SCREENS (Images 1, 2, 3) */}
              {/* Pro 1. Home / Tableau de bord Salon */}
              {currentView === 'pro_home' && (
                <ProHomeScreen
                  waitingCount={proQueue.length}
                  inProgressCount={proQueue.filter((c) => c.status === 'in_progress').length}
                  servedCount={proServedCount}
                  isQueueOpen={isQueueOpen}
                  onToggleQueue={handleToggleQueue}
                  recentActivity={proHistory}
                  onNotificationsClick={() =>
                    addToast('Notifications Pro 🔔', '3 nouveaux clients dans la file.')
                  }
                  onGoToQueue={() => handleProTabChange('pro_queue')}
                />
              )}

              {/* Pro 2. Queue Management / File en direct & Historiques */}
              {currentView === 'pro_queue' && (
                <ProQueueScreen
                  queueClients={proQueue}
                  historyClients={proHistory}
                  onServeClient={handleServeClient}
                  onSkipClient={handleSkipClient}
                  onAddClient={handleAddProClient}
                  onDeleteClient={handleDeleteProClient}
                  onNotificationsClick={() =>
                    addToast('Notifications Pro 🔔', '3 nouveaux clients dans la file.')
                  }
                  onFilterClick={() =>
                    addToast('Filtre', 'Filtre des passages récents appliqué.')
                  }
                />
              )}

              {/* Pro 3. Profile & Settings */}
              {currentView === 'pro_profile' && (
                <ProProfileScreen
                  onSwitchToClient={() => handleSwitchRole('client')}
                  onNotificationsClick={() =>
                    addToast('Notifications Pro 🔔', 'Paramètres à jour.')
                  }
                  onLogout={() => {
                    resetFlow();
                    setAuthScreen('login');
                    addToast('Déconnecté', 'À bientôt !');
                  }}
                />
              )}
            </>
          )}
        </div>

        {/* Bottom Navigation */}
        {showClientBottomNav && (
          <ClientBottomNav
            activeTab={currentTab}
            onChangeTab={handleClientTabChange}
            activeTicketsCount={activeTickets.length}
          />
        )}

        {showProBottomNav && (
          <ProBottomNav
            activeTab={proTab}
            onChangeTab={handleProTabChange}
            waitingCount={proQueue.length}
          />
        )}
      </div>

      <PwaInstallBanner />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

