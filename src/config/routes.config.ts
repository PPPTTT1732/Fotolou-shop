export type AppRoute = 
  | 'tickets'
  | 'figma_screens'
  | 'dashboard'
  | 'reservations'
  | 'galleries'
  | 'clients'
  | 'payments'
  | 'settings';

export interface RouteItem {
  id: AppRoute;
  label: string;
  iconName: string;
  description: string;
  badgeCount?: number;
}

export const APP_ROUTES: RouteItem[] = [
  { id: 'tickets', label: 'Tickets & File Live', iconName: 'Ticket', description: 'Tickets virtuels & Guichet' },
  { id: 'figma_screens', label: 'Écrans Figma', iconName: 'Smartphone', description: 'Splash, Login, OTP 1:1' },
  { id: 'dashboard', label: 'Tableau de bord', iconName: 'LayoutDashboard', description: 'Vue d’ensemble' },
  { id: 'reservations', label: 'Réservations', iconName: 'Calendar', description: 'Séances & shootings' },
  { id: 'galleries', label: 'Galeries & Photos', iconName: 'Images', description: 'Albums et sélection client' },
  { id: 'clients', label: 'Clients', iconName: 'Users', description: 'Répertoire et contacts' },
  { id: 'payments', label: 'Paiements & Reçus', iconName: 'Receipt', description: 'Wave, OM, CB & Factures' },
  { id: 'settings', label: 'Paramètres', iconName: 'Settings', description: 'Configuration studio' },
];

