import React from 'react';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../../../types/shop';

interface CartScreenProps {
  items: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onContinue: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  items,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinue,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const delivery = items.length > 0 ? 2000 : 0;
  const discount = 0;
  const total = subtotal + delivery - discount;

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden text-slate-900">
      {/* Top App Bar */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <h1 className="text-base sm:text-lg font-black text-slate-900">
          Mon panier
        </h1>

        <button
          onClick={onClearCart}
          disabled={items.length === 0}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
          title="Vider le panier"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Cart Items List */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {items.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#F4F7FE] text-[#4318FF] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-slate-700">Votre panier est vide</p>
            <p className="text-xs text-slate-400">
              Découvrez nos produits et ajoutez vos articles préférés.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center gap-3.5"
            >
              {/* Product Thumbnail */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                  {item.product.name}
                </h3>
                <p className="text-xs font-bold text-slate-900">
                  {item.product.price.toLocaleString('fr-FR')} FCFA
                </p>

                {/* Quantity Control Pill */}
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-[#F8FAFC] border border-slate-200">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, -1)}
                    className="text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-black text-slate-800 w-3 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, 1)}
                    className="text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Trash Icon */}
              <button
                onClick={() => onRemoveItem(item.product.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary & Checkout Footer */}
      {items.length > 0 && (
        <div className="p-5 border-t border-slate-100 bg-white space-y-4 shrink-0 shadow-lg">
          {/* Subtotals */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Sous-total</span>
              <span className="font-bold text-slate-900">
                {subtotal.toLocaleString('fr-FR')} FCFA
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Livraison</span>
              <span className="font-bold text-slate-900">
                {delivery.toLocaleString('fr-FR')} FCFA
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Réduction</span>
              <span className="font-bold text-[#FF7A00]">
                - {discount} FCFA
              </span>
            </div>
          </div>

          {/* TOTAL */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="text-sm font-serif font-black uppercase tracking-wider text-slate-900">
              TOTAL
            </span>
            <span className="text-base sm:text-lg font-black text-slate-900">
              {total.toLocaleString('fr-FR')} FCFA
            </span>
          </div>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            className="w-full py-4 rounded-2xl bg-[#4318FF] hover:bg-[#3311CC] active:scale-[0.99] text-white text-sm font-black transition-all cursor-pointer shadow-md shadow-[#4318FF]/25 text-center"
          >
            Continuer
          </button>
        </div>
      )}
    </div>
  );
};
