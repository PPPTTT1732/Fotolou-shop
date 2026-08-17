import React, { useState } from 'react';
import { ArrowLeft, Globe, Phone, Navigation, Share2, ArrowRight } from 'lucide-react';
import { Salon } from '../../../types/salon';

interface SalonDetailScreenProps {
  salon: Salon;
  onBack: () => void;
  onTakeTicket: (salon: Salon) => void;
  onActionToast?: (msg: string) => void;
}

export const SalonDetailScreen: React.FC<SalonDetailScreenProps> = ({
  salon,
  onBack,
  onTakeTicket,
  onActionToast,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = salon.galleryImages && salon.galleryImages.length > 0
    ? salon.galleryImages
    : [salon.image];

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden text-slate-900">
      {/* Scrollable Salon View */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Image & Carousel */}
        <div className="relative w-full h-64 sm:h-72 bg-slate-900">
          <img
            src={images[currentImageIndex] || salon.image}
            alt={salon.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          {/* Top Nav Overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
            {[0, 1, 2, 3, 4].map((dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setCurrentImageIndex(dotIndex % images.length)}
                className={`transition-all rounded-full ${
                  currentImageIndex === dotIndex % images.length
                    ? 'w-4 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Salon Details */}
        <div className="p-5 space-y-6">
          {/* Header Title */}
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {salon.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
              {salon.location}
            </p>
          </div>

          {/* 4 Action Buttons */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {/* WhatsApp Contact & Paiement */}
            <button
              onClick={() => {
                const phoneDigits = salon.phone.replace(/\D/g, '') || '221778627052';
                const msg = encodeURIComponent(`*Bonjour ${salon.name} !* 👋\nJe vous contacte via FOTOLOU pour une prise de contact, une réservation ou un paiement.`);
                window.open(`https://wa.me/${phoneDigits}?text=${msg}`, '_blank');
                onActionToast?.(`Ouverture de WhatsApp avec ${salon.name}...`);
              }}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 group-hover:bg-[#25D366]/25 text-[#25D366] flex items-center justify-center transition-colors shadow-xs">
                <svg
                  className="w-6 h-6 fill-[#25D366]"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.42 1.01 2.59c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.3" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#128C7E]">
                WhatsApp
              </span>
            </button>

            {/* Appeler */}
            <button
              onClick={() => {
                window.open(`tel:${salon.phone}`);
                onActionToast?.(`Appel vers ${salon.phone}...`);
              }}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F4F7FE] group-hover:bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">
                Appeler
              </span>
            </button>

            {/* Direction */}
            <button
              onClick={() => {
                const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  salon.name + ' ' + salon.location
                )}`;
                window.open(mapUrl, '_blank');
                onActionToast?.(`Itinéraire vers ${salon.location}...`);
              }}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F4F7FE] group-hover:bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center transition-colors">
                <Navigation className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">
                Direction
              </span>
            </button>

            {/* Partager */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: salon.name,
                    text: `Découvrez ${salon.name} sur Fotolou !`,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard?.writeText(window.location.href);
                  onActionToast?.('Lien du salon copié dans le presse-papier !');
                }
              }}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F4F7FE] group-hover:bg-[#4318FF]/10 text-[#4318FF] flex items-center justify-center transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">
                Partager
              </span>
            </button>
          </div>

          {/* 2 Stats Cards */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Personnes */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-1">
              <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                PERSONNES
              </div>
              <div className="text-3xl font-extrabold text-slate-900">
                5
              </div>
            </div>

            {/* Statut */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2 flex flex-col justify-between">
              <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                STATUT
              </div>
              <div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E6F9F0] text-[#05CD99] inline-block">
                  Ouvert
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="p-5 pt-2 pb-4 bg-white border-t border-slate-100 shrink-0">
        <button
          onClick={() => onTakeTicket(salon)}
          className="w-full py-3.5 px-6 bg-[#FFBA08] hover:bg-[#F59E0B] active:scale-[0.99] text-slate-950 rounded-full text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <span>Prendre mon ticket</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
