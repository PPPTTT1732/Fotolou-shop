import React, { useEffect, useState } from 'react';
import { FotolouLogo } from '../../../shared/ui/FotolouLogo';

interface SplashScreenProps {
  onComplete: () => void;
  autoDismiss?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  autoDismiss = true,
}) => {
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    if (!autoDismiss) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 250);

    return () => clearInterval(timer);
  }, [autoDismiss, onComplete]);

  return (
    <div
      onClick={onComplete}
      className="relative w-full h-full bg-[#4318FF] text-white flex flex-col justify-between items-center p-6 select-none cursor-pointer overflow-hidden transition-colors duration-300"
    >
      {/* Center Logo & Tagline */}
      <div className="flex flex-col items-center justify-center my-auto">
        <FotolouLogo variant="white" size="lg" showTagline />

        {/* Progress Bar from Figma */}
        <div className="w-28 h-1.5 bg-white/20 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Version info */}
      <div className="flex flex-col items-center gap-2 pb-2">
        <span className="text-[11px] font-medium text-white/80 tracking-wide">
          version 1.0.0
        </span>
      </div>
    </div>
  );
};
