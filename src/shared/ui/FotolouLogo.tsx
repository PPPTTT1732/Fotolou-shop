import React from 'react';

interface FotolouLogoProps {
  variant?: 'white' | 'colored';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const FotolouLogo: React.FC<FotolouLogoProps> = ({
  variant = 'white',
  size = 'md',
  showTagline = true,
}) => {
  const isWhite = variant === 'white';

  const sizes = {
    sm: { icon: 'w-8 h-10', fSize: 'text-lg', title: 'text-lg', tag: 'text-[10px]' },
    md: { icon: 'w-12 h-14', fSize: 'text-2xl', title: 'text-2xl', tag: 'text-xs' },
    lg: { icon: 'w-16 h-20', fSize: 'text-3xl', title: 'text-3xl sm:text-4xl', tag: 'text-xs sm:text-sm' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Ticket Icon with motion lines */}
      <div className="relative flex items-center">
        {/* Motion lines */}
        <div className="flex flex-col gap-1 mr-1.5 opacity-90">
          <div className={`h-1 w-3 rounded-full ${isWhite ? 'bg-white' : 'bg-[#4318FF]'}`} />
          <div className={`h-1 w-5 rounded-full ${isWhite ? 'bg-white' : 'bg-[#4318FF]'}`} />
          <div className={`h-1 w-3 rounded-full ${isWhite ? 'bg-white' : 'bg-[#4318FF]'}`} />
        </div>

        {/* Ticket Badge */}
        <div
          className={`relative ${s.icon} ${
            isWhite ? 'bg-white text-[#4318FF]' : 'bg-[#4318FF] text-white'
          } rounded-xl shadow-lg flex items-center justify-center font-black ${s.fSize} tracking-tighter`}
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 85% 100%, 70% 88%, 50% 100%, 30% 88%, 15% 100%, 0% 88%)'
          }}
        >
          <span>F</span>
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col text-left">
        <h1 className={`font-black tracking-tight leading-none ${s.title} ${isWhite ? 'text-white' : 'text-slate-900'}`}>
          Fotolou
        </h1>
        {showTagline && (
          <p className={`mt-1 font-normal opacity-90 leading-tight ${s.tag} ${isWhite ? 'text-white/90' : 'text-slate-500'}`}>
            Moins d’attente. Plus de temps.
          </p>
        )}
      </div>
    </div>
  );
};
