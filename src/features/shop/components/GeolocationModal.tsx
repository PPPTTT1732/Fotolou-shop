import React from 'react';
import { MapPin } from 'lucide-react';

interface GeolocationModalProps {
  isOpen: boolean;
  onAuthorize: () => void;
  onLater: () => void;
}

export const GeolocationModal: React.FC<GeolocationModalProps> = ({
  isOpen,
  onAuthorize,
  onLater,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5 z-50 animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl space-y-6 text-center animate-scale-up">
        {/* MapPin Icon in light blue circle */}
        <div className="w-20 h-20 rounded-full bg-[#EBF3FF] flex items-center justify-center mx-auto text-[#4318FF] shadow-inner">
          <MapPin className="w-9 h-9 stroke-[2.2]" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
            Autoriser la<br />géolocalisation ?
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed px-2">
            Permettez-nous d'accéder à votre position pour vous proposer les
            salons les plus proches de vous et faciliter votre trajet.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={onAuthorize}
            className="w-full py-4 rounded-2xl bg-[#4318FF] hover:bg-[#3311CC] active:scale-[0.99] text-white text-sm font-black transition-all cursor-pointer shadow-md shadow-[#4318FF]/20"
          >
            Autoriser
          </button>

          <button
            onClick={onLater}
            className="w-full py-2.5 text-xs font-bold text-[#4318FF] hover:text-[#3311CC] transition-colors cursor-pointer"
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
};
