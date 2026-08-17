import React from 'react';

interface FotolouLogoProps {
  variant?: 'white' | 'colored';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const FotolouLogo: React.FC<FotolouLogoProps> = ({
  variant = 'white',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const isWhite = variant === 'white';
  const primaryColor = isWhite ? '#FFFFFF' : '#3500FF';
  const innerFColor = isWhite ? '#3500FF' : '#FFFFFF';

  // Responsive scale presets
  const scaleMap = {
    sm: { width: 140, height: 42, iconSize: 34, titleClass: 'text-lg', tagClass: 'text-[9px]' },
    md: { width: 220, height: 64, iconSize: 52, titleClass: 'text-2xl sm:text-3xl', tagClass: 'text-xs sm:text-sm' },
    lg: { width: 300, height: 88, iconSize: 72, titleClass: 'text-3xl sm:text-4xl', tagClass: 'text-sm sm:text-base' },
    xl: { width: 360, height: 104, iconSize: 92, titleClass: 'text-4xl sm:text-5xl', tagClass: 'text-base sm:text-lg' },
  };

  const currentScale = scaleMap[size];

  return (
    <div className={`flex items-center gap-3.5 sm:gap-4.5 select-none ${className}`}>
      {/* Exact Vector Ticket + Speed Lines Emblem */}
      <div className="shrink-0 flex items-center justify-center">
        <svg
          className="overflow-visible"
          style={{ width: currentScale.iconSize, height: currentScale.iconSize }}
          viewBox="0 0 160 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 3 Speed Motion Lines on the left */}
          <rect x="24" y="44" width="34" height="13" rx="6.5" fill={primaryColor} />
          <rect x="2" y="80" width="56" height="14" rx="7" fill={primaryColor} />
          <rect x="18" y="116" width="38" height="13" rx="6.5" fill={primaryColor} />

          {/* Ticket group tilted -5.5deg */}
          <g transform="translate(62, 10) rotate(-5.5 45 75)">
            {/* Ticket Body Path with top notch and bottom 2 scallops */}
            <path
              d="M 12 0
                 L 70 0
                 A 14 14 0 0 0 88 18
                 L 88 128
                 A 10 10 0 0 1 78 138
                 A 10 10 0 0 1 68 128
                 L 50 128
                 A 10 10 0 0 1 40 138
                 A 10 10 0 0 1 30 128
                 L 12 128
                 A 12 12 0 0 1 0 116
                 L 0 12
                 A 12 12 0 0 1 12 0 Z"
              fill={primaryColor}
            />

            {/* Bold Letter F inside the Ticket */}
            <path
              d="M 28 32
                 H 66
                 V 47
                 H 44
                 V 59
                 H 62
                 V 73
                 H 44
                 V 102
                 H 28
                 Z"
              fill={innerFColor}
            />
          </g>
        </svg>
      </div>

      {/* Brand Typography (Fotolou + Moins d'attente. Plus de temps.) */}
      <div className="flex flex-col justify-center text-left">
        <span
          className={`font-black tracking-tight leading-none ${currentScale.titleClass} ${
            isWhite ? 'text-white' : 'text-slate-900'
          }`}
          style={{ letterSpacing: '-0.03em' }}
        >
          Fotolou
        </span>
        {showTagline && (
          <span
            className={`font-normal mt-1.5 sm:mt-2 tracking-normal ${currentScale.tagClass} ${
              isWhite ? 'text-white/95' : 'text-slate-500'
            }`}
            style={{ letterSpacing: '0.01em', wordSpacing: '0.05em' }}
          >
            Moins d’attente. Plus de temps.
          </span>
        )}
      </div>
    </div>
  );
};
