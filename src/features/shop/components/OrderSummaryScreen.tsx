import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ShopOrder } from '../../../types/shop';

interface OrderSummaryScreenProps {
  order: ShopOrder;
  onBack: () => void;
  onTrackDelivery: () => void;
}

export const OrderSummaryScreen: React.FC<OrderSummaryScreenProps> = ({
  order,
  onBack,
  onTrackDelivery,
}) => {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden text-slate-900">
      {/* Top App Bar */}
      <div className="px-5 pt-4 pb-2 flex items-center shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>

      {/* Main Order Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4 pt-1">
        {/* Order ID & Status Header */}
        <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              COMMANDE
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif tracking-tight">
              {order.orderNumber}
            </h1>
          </div>

          <span className="text-xs font-black text-[#4318FF]">
            En livraison
          </span>
        </div>

        {/* Ordered Items List */}
        <div className="space-y-3 pt-1">
          {order.items.map((item, index) => (
            <div
              key={`${item.product.id}-${index}`}
              className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Image */}
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name and Price */}
                <div className="min-w-0 space-y-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-xs font-black text-slate-700">
                    {item.product.price.toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
              </div>

              {/* Quantity Pill x1 */}
              <div className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-black text-slate-600 shrink-0">
                x{item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Financial Summary */}
        <div className="pt-3 space-y-2 border-t border-slate-100 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span>Sous-total</span>
            <span className="font-bold text-slate-900">
              {order.subtotal.toLocaleString('fr-FR')} FCFA
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span>Livraison</span>
            <span className="font-bold text-slate-900">
              {order.delivery.toLocaleString('fr-FR')} FCFA
            </span>
          </div>

          {/* TOTAL */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-sm font-serif font-black uppercase tracking-wider text-slate-900">
              TOTAL
            </span>
            <span className="text-base sm:text-lg font-black text-slate-900">
              {order.total.toLocaleString('fr-FR')} FCFA
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Button: SUIVRE MA LIVRAISON */}
      <div className="p-5 border-t border-slate-100 bg-white shrink-0">
        <button
          onClick={onTrackDelivery}
          className="w-full py-4 rounded-2xl bg-[#4318FF] hover:bg-[#3311CC] active:scale-[0.99] text-white text-xs sm:text-sm font-black tracking-wider uppercase transition-all cursor-pointer shadow-md shadow-[#4318FF]/25 text-center"
        >
          SUIVRE MA LIVRAISON
        </button>
      </div>
    </div>
  );
};
