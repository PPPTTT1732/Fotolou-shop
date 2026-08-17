import React, { useState } from 'react';
import {
  ShopProduct,
  CartItem,
  ShopOrder,
  ProductCategory,
} from '../../../types/shop';
import {
  SHOP_PRODUCTS,
  SHOP_CATEGORIES,
  INITIAL_CART,
  INITIAL_SHOP_ORDER,
} from '../../../data/shopMockData';
import { ShopCatalogScreen } from './ShopCatalogScreen';
import { ProductDetailScreen } from './ProductDetailScreen';
import { CartScreen } from './CartScreen';
import { GeolocationModal } from './GeolocationModal';
import { PaymentMethodScreen } from './PaymentMethodScreen';
import { PaymentSuccessScreen } from './PaymentSuccessScreen';
import { OrderSummaryScreen } from './OrderSummaryScreen';
import { OrderTrackingScreen } from './OrderTrackingScreen';

export type ShopSubView =
  | 'catalog'
  | 'product_detail'
  | 'cart'
  | 'payment_method'
  | 'payment_success'
  | 'order_summary'
  | 'order_tracking';

interface ShopScreenProps {
  onShowToast: (title: string, message: string) => void;
  onGoToHome?: () => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  onShowToast,
  onGoToHome,
}) => {
  const [currentSubView, setCurrentSubView] = useState<ShopSubView>('catalog');
  const [products] = useState<ShopProduct[]>(SHOP_PRODUCTS);
  const [categories] = useState<ProductCategory[]>(SHOP_CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct>(
    SHOP_PRODUCTS[2] // Elixir Ultime by default for nice preview
  );
  const [isGeoModalOpen, setIsGeoModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<ShopOrder>(INITIAL_SHOP_ORDER);

  // Total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Add to cart
  const handleAddToCart = (product: ShopProduct, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    onShowToast('Panier mis à jour 🛒', `${product.name} ajouté au panier.`);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item from cart
  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    onShowToast('Article retiré', 'Le produit a été supprimé du panier.');
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
    onShowToast('Panier vidé', 'Tous les articles ont été retirés.');
  };

  // Select a product to view details
  const handleSelectProduct = (product: ShopProduct) => {
    setSelectedProduct(product);
    setCurrentSubView('product_detail');
  };

  // Continue from cart -> show Geolocation prompt
  const handleContinueFromCart = () => {
    setIsGeoModalOpen(true);
  };

  // Geolocation Authorized or Later
  const handleAuthorizeGeo = () => {
    setIsGeoModalOpen(false);
    onShowToast('Position activée 📍', 'Salons et livraison optimisés.');
    setCurrentSubView('payment_method');
  };

  const handleLaterGeo = () => {
    setIsGeoModalOpen(false);
    setCurrentSubView('payment_method');
  };

  // Pay order
  const handlePayOrder = (method: 'wave' | 'orange_money') => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const delivery = 2000;
    const total = subtotal + delivery;

    const newOrder: ShopOrder = {
      id: `order-${Date.now()}`,
      orderNumber: '#COM_0001',
      date: `Passée le ${new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })} à ${new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      items: cart.length > 0 ? [...cart] : INITIAL_SHOP_ORDER.items,
      subtotal: subtotal > 0 ? subtotal : 87500,
      delivery,
      discount: 0,
      total: total > 2000 ? total : 89500,
      paymentMethod: method,
      status: 'in_delivery',
      timeline: [
        {
          title: 'Paiement reçu',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          completed: true,
        },
        {
          title: 'En livraison',
          time: 'En cours de route',
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

    setCurrentOrder(newOrder);
    setCurrentSubView('payment_success');
    onShowToast('Paiement validé ✅', 'Votre commande #COM_0001 est confirmée !');
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden relative">
      {/* 1. Catalog Screen */}
      {currentSubView === 'catalog' && (
        <ShopCatalogScreen
          products={products}
          categories={categories}
          cartCount={cartCount}
          onOpenCart={() => setCurrentSubView('cart')}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 2. Product Detail Screen */}
      {currentSubView === 'product_detail' && (
        <ProductDetailScreen
          product={selectedProduct}
          cartCount={cartCount}
          onBack={() => setCurrentSubView('catalog')}
          onOpenCart={() => setCurrentSubView('cart')}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 3. Cart Screen */}
      {currentSubView === 'cart' && (
        <CartScreen
          items={cart}
          onBack={() => setCurrentSubView('catalog')}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onContinue={handleContinueFromCart}
        />
      )}

      {/* 4. Payment Method Screen */}
      {currentSubView === 'payment_method' && (
        <PaymentMethodScreen
          totalAmount={
            cart.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            ) + 2000 || 89500
          }
          onBack={() => setCurrentSubView('cart')}
          onPay={handlePayOrder}
        />
      )}

      {/* 5. Payment Success Screen */}
      {currentSubView === 'payment_success' && (
        <PaymentSuccessScreen
          orderNumber={currentOrder.orderNumber}
          totalAmount={currentOrder.total}
          onTrackOrder={() => setCurrentSubView('order_summary')}
          onGoHome={() => {
            setCurrentSubView('catalog');
            if (onGoToHome) onGoToHome();
          }}
        />
      )}

      {/* 6. Order Summary Screen */}
      {currentSubView === 'order_summary' && (
        <OrderSummaryScreen
          order={currentOrder}
          onBack={() => setCurrentSubView('catalog')}
          onTrackDelivery={() => setCurrentSubView('order_tracking')}
        />
      )}

      {/* 7. Order Tracking Dynamic Screen */}
      {currentSubView === 'order_tracking' && (
        <OrderTrackingScreen
          order={currentOrder}
          onBack={() => setCurrentSubView('order_summary')}
          onContactSupport={() =>
            onShowToast(
              'Support FOTOLOU 💬',
              'Conseiller en ligne disponible au +221 77 862 70 52.'
            )
          }
        />
      )}

      {/* Geolocation Pop-up Modal */}
      <GeolocationModal
        isOpen={isGeoModalOpen}
        onAuthorize={handleAuthorizeGeo}
        onLater={handleLaterGeo}
      />
    </div>
  );
};
