import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { ShopProduct } from '../../../types/shop';

interface ProductDetailScreenProps {
  product: ShopProduct;
  cartCount: number;
  onBack: () => void;
  onOpenCart: () => void;
  onAddToCart: (product: ShopProduct, quantity: number) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  cartCount,
  onBack,
  onOpenCart,
  onAddToCart,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  // Gallery fallback
  const gallery =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image];

  const currentImage = gallery[selectedImageIndex] || product.image;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1500);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden text-slate-900">
      {/* Top App Bar */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <button
          onClick={onOpenCart}
          className="relative w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
        >
          <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#4318FF] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
        {/* Big Hero Image */}
        <div className="w-full h-60 sm:h-64 rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 shadow-xs">
          <img
            src={currentImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnail Gallery (3 images) */}
        <div className="grid grid-cols-3 gap-3">
          {gallery.slice(0, 3).map((img, idx) => {
            const isSelected = selectedImageIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`h-20 rounded-2xl overflow-hidden bg-slate-100 border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#4318FF] ring-2 ring-[#4318FF]/20'
                    : 'border-transparent hover:border-slate-200'
                }`}
              >
                <img
                  src={img}
                  alt={`Vignette ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* Product Title */}
        <div className="pt-2 space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {product.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-3 pt-1">
          <span className="text-2xl sm:text-3xl font-black text-[#4318FF]">
            {product.price.toLocaleString('fr-FR')}Fcfa
          </span>
          {product.originalPrice && (
            <span className="text-sm font-semibold text-slate-400 line-through">
              {product.originalPrice.toLocaleString('fr-FR')}Fcfa
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-3" />

        {/* Quantity and In-Stock */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              Quantité
            </span>
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-slate-200 bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-black text-slate-900 w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#05CD99]">
            <span className="w-2 h-2 rounded-full bg-[#05CD99]" />
            <span>En stock</span>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Button */}
      <div className="p-5 border-t border-slate-100 bg-white shrink-0">
        <button
          onClick={handleAdd}
          className={`w-full py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-[0.99] ${
            isAddedAnimation
              ? 'bg-[#05CD99] text-white'
              : 'bg-[#FFBA08] hover:bg-[#F59E0B] text-slate-950'
          }`}
        >
          <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
          <span>{isAddedAnimation ? 'Ajouté au panier !' : 'Ajouter au panier'}</span>
        </button>
      </div>
    </div>
  );
};
