export const APP_CONFIG = {
  name: 'FOTOLOU',
  fullName: 'FOTOLOU Photography & Studio',
  tagline: 'L’excellence photographique & gestion de séances',
  version: '2.4.0',
  currency: 'EUR',
  currencySymbol: '€',
  locale: 'fr-FR',
  studio: {
    address: '14 Rue de la Création, Studio 3B, 75011 Paris',
    phone: '+33 1 42 68 90 20',
    email: 'contact@fotolou-studio.com',
    openingHours: 'Mar - Sam: 09h00 - 19h30',
  },
  pwa: {
    storagePrefix: 'fotolou_app_v1_',
    syncIntervalMs: 15000,
  }
} as const;
