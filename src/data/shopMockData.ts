import { ShopProduct, ProductCategory, CartItem, ShopOrder } from '../types/shop';

export const SHOP_CATEGORIES: ProductCategory[] = [
  {
    id: 'cat-dresses',
    name: 'Dresses',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-pants',
    name: 'Pants',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-skirts',
    name: 'Skirts',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-shorts-1',
    name: 'Shorts',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-shorts-2',
    name: 'Shorts',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80',
  },
];

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'prod-shampoo',
    brand: 'KÉRASTASE',
    name: 'Shampoing Hydratant',
    description: 'Bain hydratant fortifiant pour cheveux secs et abîmés. Apporte douceur, brillance et nutrition intense dès la première application.',
    price: 3200,
    originalPrice: 4500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597359-598d1a1bfa82?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    ],
    category: 'Soins',
    inStock: true,
  },
  {
    id: 'prod-brush',
    brand: 'GHD',
    name: 'Brosse Plate...',
    description: 'Brosse professionnelle à picots ronds en céramique pour un démêlage sans casse et un brushing soyeux sans frisottis.',
    price: 4500,
    originalPrice: 6000,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600&auto=format&fit=crop&q=80',
    ],
    category: 'Accessoires',
    inStock: true,
  },
  {
    id: 'prod-elixir',
    brand: 'KÉRASTASE',
    name: "Elixir Ultime L'Huile",
    description: 'Huile de soin capillaire sublimatrice multi-usages pour tous types de cheveux. Protège de la chaleur et offre une brillance dorée incomparable.',
    price: 32000,
    originalPrice: 42000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1608248597359-598d1a1bfa82?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1608248597359-598d1a1bfa82?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    ],
    category: 'Soins',
    inStock: true,
  },
  {
    id: 'prod-wahl',
    brand: 'WAHL',
    name: 'Wahl Magic Clip',
    description: 'Tondeuse de coupe professionnelle sans fil avec lame Stagger-Tooth pour des dégradés parfaits et un travail de précision.',
    price: 79000,
    originalPrice: 95000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80',
    ],
    category: 'Matériel',
    inStock: true,
  },
  {
    id: 'prod-oil',
    brand: 'WAHL',
    name: 'Huile lubrifiante pour tondeuse',
    description: 'Huile spécialement formulée pour lubrifier les lames de tondeuse, réduire l’échauffement et prolonger la durée de vie de vos têtes de coupe.',
    price: 5000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&auto=format&fit=crop&q=80',
    ],
    category: 'Entretien',
    inStock: true,
  },
  {
    id: 'prod-spray',
    brand: 'WAHL',
    name: 'Spray nettoyant Blade Ice',
    description: 'Spray 4-en-1 haute efficacité : refroidit immédiatement, nettoie, lubrifie et protège de la corrosion en quelques pulvérisations.',
    price: 3500,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80',
    ],
    category: 'Entretien',
    inStock: true,
  },
];

export const INITIAL_CART: CartItem[] = [
  {
    product: SHOP_PRODUCTS[3], // Wahl Magic Clip (79 000 FCFA)
    quantity: 1,
  },
  {
    product: SHOP_PRODUCTS[4], // Huile lubrifiante (5 000 FCFA)
    quantity: 1,
  },
  {
    product: SHOP_PRODUCTS[5], // Spray nettoyant Blade Ice (3 500 FCFA)
    quantity: 1,
  },
];

export const INITIAL_SHOP_ORDER: ShopOrder = {
  id: 'order-0001',
  orderNumber: '#COM_0001',
  date: 'Passée le 12 Mai 2025 à 10:30',
  items: [
    {
      product: SHOP_PRODUCTS[3], // Wahl Magic Clip (79 000 FCFA)
      quantity: 1,
    },
    {
      product: SHOP_PRODUCTS[4], // Huile lubrifiante (5 000 FCFA)
      quantity: 1,
    },
    {
      product: SHOP_PRODUCTS[5], // Spray nettoyant Blade Ice (3 500 FCFA)
      quantity: 1,
    },
    {
      product: SHOP_PRODUCTS[5], // Spray nettoyant Blade Ice (3 500 FCFA)
      quantity: 1,
    },
  ],
  subtotal: 87500,
  delivery: 2000,
  discount: 0,
  total: 89500,
  paymentMethod: 'wave',
  status: 'in_delivery',
  timeline: [
    {
      title: 'Paiement reçu',
      time: '12 Mai 10:32',
      completed: true,
    },
    {
      title: 'En livraison',
      time: '12 Mai 15:20',
      completed: true,
      current: true,
    },
    {
      title: 'Livré',
      time: 'En attente',
      completed: false,
    },
  ],
};
