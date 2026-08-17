import { Client } from '../types/client';
import { Booking } from '../types/booking';
import { Gallery } from '../types/gallery';
import { PaymentRecord } from '../types/payment';

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli_01',
    fullName: 'Élodie & Thomas Laurent',
    email: 'elodie.laurent@gmail.com',
    phone: '+33 6 12 34 56 78',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    tags: ['Famille', 'Fidèle', 'Maternité'],
    notes: 'Préfère la lumière naturelle et les tons chauds.',
    totalShootings: 3,
    totalSpent: 780,
    createdAt: '2025-09-12'
  },
  {
    id: 'cli_02',
    fullName: 'Marc Alcantara (Cabinet Astra)',
    email: 'm.alcantara@astra-avocats.fr',
    phone: '+33 6 98 76 54 32',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    tags: ['Corporate', 'VIP', 'Entreprise'],
    notes: 'Besoin de formats carrés pour LinkedIn et trombinoscope cabinet.',
    totalShootings: 2,
    totalSpent: 1380,
    createdAt: '2025-11-04'
  },
  {
    id: 'cli_03',
    fullName: 'Amélie & Julien Vasseur',
    email: 'julien.vasseur@outlook.fr',
    phone: '+33 6 45 89 21 00',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    tags: ['Mariage 2026', 'Prestige'],
    notes: 'Mariage au Domaine de Vaugrenier. Séance engagement prévue.',
    totalShootings: 1,
    totalSpent: 1650,
    createdAt: '2026-01-15'
  },
  {
    id: 'cli_04',
    fullName: 'Sonia Benali',
    email: 'sonia.model@agence-elite.com',
    phone: '+33 7 88 12 43 90',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    tags: ['Mode', 'Book'],
    notes: 'Shooting collection capsule printemps.',
    totalShootings: 2,
    totalSpent: 1040,
    createdAt: '2026-02-01'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk_01',
    clientId: 'cli_01',
    clientName: 'Élodie & Thomas Laurent',
    clientPhone: '+33 6 12 34 56 78',
    clientEmail: 'elodie.laurent@gmail.com',
    prestationId: 'prest_famille_studio',
    prestationName: 'Famille & Maternité Émotion',
    category: 'studio_famille',
    date: '2026-08-17',
    startTime: '10:30',
    endTime: '12:00',
    location: 'studio',
    status: 'confirmed',
    paymentStatus: 'deposit_paid',
    totalPrice: 260,
    depositAmount: 80,
    notes: 'Prévoir le fond terracotta et accessoires bois bébé.',
    galleryId: 'gal_01',
    createdAt: '2026-08-10',
    updatedAt: '2026-08-10'
  },
  {
    id: 'bk_02',
    clientId: 'cli_02',
    clientName: 'Marc Alcantara (Cabinet Astra)',
    clientPhone: '+33 6 98 76 54 32',
    clientEmail: 'm.alcantara@astra-avocats.fr',
    prestationId: 'prest_corporate_team',
    prestationName: 'Corporate & Branding Entreprise',
    category: 'corporate',
    date: '2026-08-17',
    startTime: '14:30',
    endTime: '17:30',
    location: 'studio',
    status: 'confirmed',
    paymentStatus: 'paid',
    totalPrice: 690,
    depositAmount: 200,
    notes: '8 collaborateurs. Fond gris neutre & fond texturé noir.',
    galleryId: 'gal_02',
    createdAt: '2026-08-05',
    updatedAt: '2026-08-16'
  },
  {
    id: 'bk_03',
    clientId: 'cli_04',
    clientName: 'Sonia Benali',
    clientPhone: '+33 7 88 12 43 90',
    clientEmail: 'sonia.model@agence-elite.com',
    prestationId: 'prest_mode_lookbook',
    prestationName: 'Mode, Édito & Lookbook',
    category: 'mode_art',
    date: '2026-08-19',
    startTime: '13:00',
    endTime: '17:00',
    location: 'studio',
    status: 'pending',
    paymentStatus: 'unpaid',
    totalPrice: 520,
    depositAmount: 150,
    notes: 'En attente de confirmation du maquilleur.',
    createdAt: '2026-08-14',
    updatedAt: '2026-08-14'
  },
  {
    id: 'bk_04',
    clientId: 'cli_03',
    clientName: 'Amélie & Julien Vasseur',
    clientPhone: '+33 6 45 89 21 00',
    clientEmail: 'julien.vasseur@outlook.fr',
    prestationId: 'prest_mariage_prestige',
    prestationName: 'Mariage Prestige & Reportage',
    category: 'mariage',
    date: '2026-08-29',
    startTime: '09:00',
    endTime: '19:00',
    location: 'exterieur',
    locationAddress: 'Domaine de Vaugrenier, 06270 Villeneuve-Loubet',
    status: 'confirmed',
    paymentStatus: 'deposit_paid',
    totalPrice: 1650,
    depositAmount: 450,
    notes: 'Brief technique avec le wedding planner finalisé.',
    createdAt: '2026-07-20',
    updatedAt: '2026-08-12'
  }
];

export const INITIAL_GALLERIES: Gallery[] = [
  {
    id: 'gal_01',
    bookingId: 'bk_01',
    clientId: 'cli_01',
    clientName: 'Élodie & Thomas Laurent',
    title: 'Famille Laurent - Douceur Studio',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
    isPublic: false,
    accessPinCode: '4821',
    status: 'client_review',
    downloadAllowed: true,
    createdAt: '2026-08-12',
    photos: [
      {
        id: 'ph_01',
        url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1200&auto=format&fit=crop&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&auto=format&fit=crop&q=80',
        title: 'Maternité - Éclairage doux',
        isFavorite: true,
        selectedForRetouch: true,
        notes: 'Adoucir légèrement l’ombre sur le profil',
        uploadedAt: '2026-08-12'
      },
      {
        id: 'ph_02',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=80',
        title: 'Complicité couple studio',
        isFavorite: true,
        selectedForRetouch: true,
        uploadedAt: '2026-08-12'
      },
      {
        id: 'ph_03',
        url: 'https://images.unsplash.com/photo-1537655780520-1e392ead81f2?w=1200&auto=format&fit=crop&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1537655780520-1e392ead81f2?w=400&auto=format&fit=crop&q=80',
        title: 'Rires d’enfants spontanés',
        isFavorite: false,
        selectedForRetouch: false,
        uploadedAt: '2026-08-12'
      }
    ]
  },
  {
    id: 'gal_02',
    bookingId: 'bk_02',
    clientId: 'cli_02',
    clientName: 'Marc Alcantara (Astra)',
    title: 'Astra Avocats - Portraits Associés',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80',
    isPublic: false,
    accessPinCode: '9034',
    status: 'delivered',
    downloadAllowed: true,
    createdAt: '2026-08-16',
    photos: [
      {
        id: 'ph_10',
        url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&auto=format&fit=crop&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
        title: 'Portrait Marc Alcantara - Fond Ardoise',
        isFavorite: true,
        selectedForRetouch: true,
        uploadedAt: '2026-08-16'
      },
      {
        id: 'ph_11',
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        title: 'Portrait Me Sophie Renoir',
        isFavorite: true,
        selectedForRetouch: true,
        uploadedAt: '2026-08-16'
      }
    ]
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay_01',
    bookingId: 'bk_01',
    bookingTitle: 'Famille Laurent Studio',
    clientId: 'cli_01',
    clientName: 'Élodie Laurent',
    amount: 80,
    method: 'carte',
    status: 'deposit_paid',
    type: 'acompte',
    referenceInvoice: 'FACT-2026-084',
    date: '2026-08-10',
    notes: 'Acompte de réservation réglé en ligne'
  },
  {
    id: 'pay_02',
    bookingId: 'bk_02',
    bookingTitle: 'Corporate Astra Avocats',
    clientId: 'cli_02',
    clientName: 'Marc Alcantara',
    amount: 690,
    method: 'virement',
    status: 'paid',
    type: 'totalite',
    referenceInvoice: 'FACT-2026-081',
    date: '2026-08-15',
    notes: 'Règlement complet reçu par virement bancaire'
  },
  {
    id: 'pay_03',
    bookingId: 'bk_04',
    bookingTitle: 'Mariage Vasseur',
    clientId: 'cli_03',
    clientName: 'Julien Vasseur',
    amount: 450,
    method: 'carte',
    status: 'deposit_paid',
    type: 'acompte',
    referenceInvoice: 'FACT-2026-077',
    date: '2026-07-20',
    notes: 'Acompte réservation Mariage Prestige'
  }
];
