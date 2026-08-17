export interface ShopProduct {
  id: string;
  brand: string;
  name: string;
  description: string;
  price: number; // in FCFA
  originalPrice?: number; // in FCFA
  rating: number;
  image: string;
  galleryImages: string[];
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

export interface ShopOrder {
  id: string;
  orderNumber: string; // e.g. "#COM_0001"
  date: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  paymentMethod: 'whatsapp' | 'wave' | 'orange_money';
  status: 'payment_received' | 'in_delivery' | 'delivered';
  timeline: {
    title: string;
    time: string;
    completed: boolean;
    current?: boolean;
  }[];
}

export interface ProductCategory {
  id: string;
  name: string;
  image: string;
}
