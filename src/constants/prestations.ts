import { Prestation } from '../types/common';

export const PRESTATIONS_CATALOG: Prestation[] = [
  {
    id: 'prest_portrait_pro',
    name: 'Portrait & Headshot Studio',
    category: 'portrait',
    durationMinutes: 60,
    price: 180,
    depositRequired: 60,
    description: 'Séance individuelle 3 tenues, 8 photos retouchées haute définition et droits d’usage pro.',
    badgeColor: 'amber'
  },
  {
    id: 'prest_famille_studio',
    name: 'Famille & Maternité Émotion',
    category: 'studio_famille',
    durationMinutes: 90,
    price: 260,
    depositRequired: 80,
    description: 'Séance chaleureuse jusqu’à 6 personnes, studio tout confort, 15 photos HD + mini-album.',
    badgeColor: 'emerald'
  },
  {
    id: 'prest_mariage_prestige',
    name: 'Mariage Prestige & Reportage',
    category: 'mariage',
    durationMinutes: 480,
    price: 1650,
    depositRequired: 450,
    description: 'Couverture complète des préparatifs à la soirée, galerie privée sécurisée, coffret bois.',
    badgeColor: 'rose'
  },
  {
    id: 'prest_corporate_team',
    name: 'Corporate & Branding Entreprise',
    category: 'corporate',
    durationMinutes: 180,
    price: 690,
    depositRequired: 200,
    description: 'Portraits d’équipe sur site ou studio, photos d’ambiance pour site web et presse.',
    badgeColor: 'blue'
  },
  {
    id: 'prest_mode_lookbook',
    name: 'Mode, Édito & Lookbook',
    category: 'mode_art',
    durationMinutes: 240,
    price: 520,
    depositRequired: 150,
    description: 'Éclairages créatifs studio, stylisme, retouches colorimétriques d’art.',
    badgeColor: 'purple'
  },
  {
    id: 'prest_event_cocktail',
    name: 'Événement & Vernissage',
    category: 'evenement',
    durationMinutes: 180,
    price: 420,
    depositRequired: 120,
    description: 'Captation dynamique, tri express en 48h, galerie instantanée pour les invités.',
    badgeColor: 'sky'
  }
];
