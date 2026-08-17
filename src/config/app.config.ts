export const APP_CONFIG = {
  name: 'FOTOLOU',
  fullName: 'Fotolou - Barber & Salon',
  tagline: 'Moins d’attente. Plus de temps.',
  version: '2.4.0',
  currency: 'FCFA',
  currencySymbol: 'FCFA',
  locale: 'fr-SN',
  studio: {
    address: 'Rue MZ 45, Mermoz, Dakar, Sénégal',
    phone: '+221 77 862 70 52',
    email: 'contact@fotolou.sn',
    openingHours: 'Lun - Sam: 09h00 - 21h00',
  },
  support: {
    phone: '+221 77 862 70 52',
    whatsapp: '+221 77 862 70 52',
    city: 'Dakar, Sénégal',
  },
  api: {
    baseUrl: (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || '/api',
    timeoutMs: 10000,
  },
  pwa: {
    storagePrefix: 'fotolou_app_v2_',
    syncIntervalMs: 10000,
  },
} as const;
