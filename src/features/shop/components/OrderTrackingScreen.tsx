import React from 'react';
import { ArrowLeft, Check, Package, MessageSquare } from 'lucide-react';
import { ShopOrder } from '../../../types/shop';

interface OrderTrackingScreenProps {
  order: ShopOrder;
  onBack: () => void;
  onContactSupport?: () => void;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({
  order,
  onBack,
  onContactSupport,
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

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-6 pt-2">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Commande <span className="font-mono">{order.orderNumber}</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            {order.date}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="space-y-6 pt-2 pl-1">
          {/* Step 1: Paiement reçu */}
          <div className="relative flex items-start gap-4">
            {/* Green Connected Line */}
            <div className="absolute top-7 left-3.5 -ml-px h-12 w-0.5 bg-[#05CD99]" />

            {/* Check Icon */}
            <div className="w-7 h-7 rounded-full bg-[#05CD99] text-white flex items-center justify-center shrink-0 z-10 shadow-xs">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>

            <div className="space-y-0.5 pt-0.5">
              <h3 className="text-sm font-black text-slate-900">
                Paiement reçu
              </h3>
              <p className="text-xs text-slate-400">
                12 Mai 10:32
              </p>
            </div>
          </div>

          {/* Step 2: En livraison */}
          <div className="relative flex items-start gap-4">
            {/* Gray Connected Line */}
            <div className="absolute top-7 left-3.5 -ml-px h-12 w-0.5 bg-slate-200" />

            {/* Blue / Violet Dot Icon */}
            <div className="w-7 h-7 rounded-full bg-[#EDE9FE] border-2 border-[#4318FF] flex items-center justify-center shrink-0 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#4318FF]" />
            </div>

            <div className="space-y-0.5 pt-0.5">
              <h3 className="text-sm font-black text-slate-900">
                En livraison
              </h3>
              <p className="text-xs text-slate-400">
                12 Mai 15:20
              </p>
            </div>
          </div>

          {/* Step 3: Livré */}
          <div className="relative flex items-start gap-4">
            {/* Gray Circle */}
            <div className="w-7 h-7 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center shrink-0 z-10">
              <Check className="w-3.5 h-3.5 text-slate-300" />
            </div>

            <div className="space-y-0.5 pt-0.5">
              <h3 className="text-sm font-bold text-slate-400">
                Livré
              </h3>
              <p className="text-xs text-slate-400">
                En attente
              </p>
            </div>
          </div>
        </div>

        {/* Purple Status Information Box */}
        <div className="w-full bg-[#F4F7FE] rounded-3xl p-4.5 flex items-center gap-3.5 border border-[#E2E8F0]/60">
          <div className="w-11 h-11 rounded-2xl bg-[#4318FF] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Package className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
            Votre colis est en route.<br />
            <span className="font-normal text-slate-500">
              Livraison prévue sous peu.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Button: Contacter FOTOLOU */}
      <div className="p-5 border-t border-slate-100 bg-white shrink-0">
        <button
          onClick={
            onContactSupport ||
            (() => {
              window.open('tel:+221778627052');
            })
          }
          className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:scale-[0.99] border border-slate-200 text-slate-900 text-xs sm:text-sm font-black transition-all cursor-pointer text-center flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-slate-700" />
          <span>Contacter FOTOLOU</span>
        </button>
      </div>
    </div>
  );
};
