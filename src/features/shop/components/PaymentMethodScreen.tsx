import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, ShieldCheck, ShoppingBag, ExternalLink } from 'lucide-react';
import { CartItem } from '../../../types/shop';

interface PaymentMethodScreenProps {
  totalAmount: number;
  items?: CartItem[];
  orderNumber?: string;
  onBack: () => void;
  onPay: (method: 'whatsapp') => void;
}

export const PaymentMethodScreen: React.FC<PaymentMethodScreenProps> = ({
  totalAmount = 89500,
  items = [],
  orderNumber = '#COM_0001',
  onBack,
  onPay,
}) => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleWhatsAppOrder = () => {
    setIsRedirecting(true);

    // Build the formatted WhatsApp message
    let message = `*Bonjour FOTOLOU !* 👋\n\n`;
    message += `Je souhaite passer commande sur la boutique :\n`;
    message += `📋 *Commande :* ${orderNumber}\n\n`;

    if (items && items.length > 0) {
      message += `🛍️ *Articles :*\n`;
      items.forEach((item) => {
        message += `• ${item.product.name} (x${item.quantity}) - ${(
          item.product.price * item.quantity
        ).toLocaleString('fr-FR')} FCFA\n`;
      });
      message += `\n📦 *Livraison :* 2 000 FCFA\n`;
    }

    message += `💰 *Montant Total :* ${totalAmount.toLocaleString('fr-FR')} FCFA\n\n`;
    message += `Merci de confirmer ma commande et l'adresse de livraison !`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/221778627052?text=${encodedText}`;

    // Open WhatsApp in a new tab or trigger app
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setIsRedirecting(false);
      onPay('whatsapp');
    }, 1000);
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

        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Validation
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5 pt-2">
        {/* Header Title */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            Finaliser votre commande
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Votre commande sera traitée instantanément via WhatsApp par nos conseillers Fotolou.
          </p>
          <div className="w-12 h-1 bg-[#25D366] rounded-full mx-auto mt-2" />
        </div>

        {/* WhatsApp Card Option */}
        <div className="w-full p-4.5 rounded-3xl border-2 border-[#25D366] bg-[#F0FDF4] shadow-xs space-y-3">
          <div className="flex items-center gap-3.5">
            {/* WhatsApp Logo Emblem */}
            <div className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-md shadow-[#25D366]/30 shrink-0">
              <svg
                className="w-7 h-7 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.42 1.01 2.59c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.3" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900">
                  Commander via WhatsApp
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#25D366] text-white">
                  Direct
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Validation & confirmation immédiate
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#25D366]/20 text-[11px] text-slate-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <span>Service client Fotolou : <strong>+221 77 862 70 52</strong></span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/60">
            <span className="font-bold text-slate-500">Numéro de commande</span>
            <span className="font-black text-slate-900 font-mono">{orderNumber}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Total de votre panier</span>
            <span className="font-black text-base text-slate-900">
              {totalAmount.toLocaleString('fr-FR')} FCFA
            </span>
          </div>
        </div>

        {/* Security / Guarantee Badge */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400">
          <ShieldCheck className="w-4 h-4 text-[#05CD99]" />
          <span>Commande directe & livraison express</span>
        </div>
      </div>

      {/* Bottom Sticky Action Button: WhatsApp Green "Commander sur WhatsApp" */}
      <div className="p-5 border-t border-slate-100 bg-white shrink-0">
        <button
          onClick={handleWhatsAppOrder}
          disabled={isRedirecting}
          className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] text-white text-sm font-black transition-all cursor-pointer shadow-lg shadow-[#25D366]/30 text-center flex items-center justify-center gap-2"
        >
          {isRedirecting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <svg
                className="w-5 h-5 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.42 1.01 2.59c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.3" />
              </svg>
              <span>Commander sur WhatsApp</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
