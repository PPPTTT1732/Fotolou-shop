import React, { useState } from 'react';
import { Ticket, Clock, Smartphone, ChevronRight, ArrowRight } from 'lucide-react';
import { FotolouLogo } from '../../../shared/ui/FotolouLogo';

interface OnboardingScreenProps {
  onFinish: () => void;
}

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  highlight: string;
  icon: React.ReactNode;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: OnboardingSlide[] = [
    {
      id: 1,
      title: "Prenez votre ticket en ligne",
      subtitle: "Réservez votre ordre de passage en quelques secondes sans faire la queue au studio.",
      highlight: "Zéro attente",
      icon: <Ticket className="w-12 h-12 text-[#4318FF]" />,
    },
    {
      id: 2,
      title: "Suivi en temps réel",
      subtitle: "Restez informé de votre rang et du temps d'attente estimé directement sur votre mobile.",
      highlight: "Guichet direct",
      icon: <Clock className="w-12 h-12 text-[#4318FF]" />,
    },
    {
      id: 3,
      title: "Moins d'attente. Plus de temps.",
      subtitle: "Recevez vos alertes de passage et accédez à vos photos de shooting instantanément.",
      highlight: "FOTOLOU PWA",
      icon: <Smartphone className="w-12 h-12 text-[#4318FF]" />,
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  const active = slides[currentSlide];

  return (
    <div className="relative w-full h-full bg-white text-slate-900 flex flex-col justify-between p-5 sm:p-6 select-none max-w-md mx-auto overflow-hidden">
      {/* Top Header & Skip */}
      <div className="w-full flex items-center justify-between">
        <FotolouLogo size="sm" />
        <button
          onClick={onFinish}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors px-2 py-1 cursor-pointer"
        >
          Passer
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="my-auto space-y-4 sm:space-y-6 text-center py-2">
        {/* Animated illustration card */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-[#4318FF]/10 border-2 border-[#4318FF]/20 flex items-center justify-center shadow-inner">
          {active.icon}
        </div>

        <div className="space-y-2 sm:space-y-3">
          <span className="inline-block px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-[#4318FF]/10 text-[#4318FF] uppercase tracking-wider">
            {active.highlight}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {active.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
            {active.subtitle}
          </p>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-6 sm:w-7 bg-[#4318FF]'
                  : 'w-1.5 sm:w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-2 pb-1">
        <button
          onClick={handleNext}
          className="w-full py-3 sm:py-3.5 px-6 bg-[#4318FF] hover:bg-[#3713D6] active:scale-[0.99] text-white rounded-full text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{currentSlide === slides.length - 1 ? 'Commencer' : 'Suivant'}</span>
          {currentSlide === slides.length - 1 ? (
            <ArrowRight className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
