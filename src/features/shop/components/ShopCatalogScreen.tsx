import React, { useState } from 'react';
import { Search, ShoppingBag, Star, ShoppingCart, Check } from 'lucide-react';
import { ShopProduct, ProductCategory } from '../../../types/shop';

interface ShopCatalogScreenProps {
  products: ShopProduct[];
  categories: ProductCategory[];
  cartCount: number;
  onOpenCart: () => void;
  onSelectProduct: (product: ShopProduct) => void;
  onAddToCart: (product: ShopProduct) => void;
}

export const ShopCatalogScreen: React.FC<ShopCatalogScreenProps> = ({
  products,
  categories,
  cartCount,
  onOpenCart,
  onSelectProduct,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleAddClick = (e: React.MouseEvent, product: ShopProduct) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden text-slate-900">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between shrink-0">
        <h1 className="text-xl font-black text-[#4318FF] tracking-tight">
          Fotolou Boutique
        </h1>

        {/* Cart Icon with badge */}
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

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#F1F3F9] rounded-2xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#4318FF]/20 transition-all"
          />
        </div>

        {/* Categories Section */}
        <div className="space-y-2.5">
          <h2 className="text-sm font-black text-slate-900">Catégories</h2>
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1 pt-1">
            {categories.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategoryId(isSelected ? null : cat.id)
                  }
                  className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
                >
                  <div
                    className={`w-14 h-14 rounded-full overflow-hidden p-0.5 transition-all ${
                      isSelected
                        ? 'ring-2 ring-[#4318FF] ring-offset-2 scale-105'
                        : 'border border-slate-200 group-hover:border-[#4318FF]/40'
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-3 pt-1">
          <h2 className="text-sm font-black text-slate-900">Produits</h2>

          <div className="grid grid-cols-2 gap-3.5">
            {filteredProducts.map((product) => {
              const isAdded = addedIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-white rounded-3xl p-2.5 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-slate-100 mb-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Brand & Rating */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase mb-1">
                    <span className="tracking-wider">{product.brand}</span>
                    <div className="flex items-center gap-0.5 text-slate-800 font-bold">
                      <Star className="w-3 h-3 text-[#FFB800] fill-[#FFB800]" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-1 mb-1">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="text-xs sm:text-sm font-black text-[#4318FF] mb-2.5">
                    {product.price.toLocaleString('fr-FR')}fcfa
                  </div>

                  {/* Yellow Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddClick(e, product)}
                    className={`w-full py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-[0.98] ${
                      isAdded
                        ? 'bg-[#05CD99] text-white'
                        : 'bg-[#FFBA08] hover:bg-[#F59E0B] text-slate-950'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Ajouté</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Ajouter au panier</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
