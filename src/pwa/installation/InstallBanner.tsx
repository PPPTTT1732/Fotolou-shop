import React from 'react';
import { Download, X, Sparkles } from 'lucide-react';
import { useInstallPrompt } from './useInstallPrompt';
import { APP_CONFIG } from '../../config/app.config';

interface InstallBannerProps {
  onDismiss?: () => void;
}

export const InstallBanner: React.FC<InstallBannerProps> = ({ onDismiss }) => {
  const { isInstallable, triggerInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = React.useState(false);

  if (!isInstallable || dismissed) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 flex items-center justify-between gap-3 text-sm text-stone-800 dark:text-stone-200">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="p-1.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg shrink-0">
          <Sparkles className="w-4 h-4" />
        </span>
        <p className="truncate">
          <span className="font-semibold">{APP_CONFIG.name}</span> est disponible en application PWA (hors-ligne & accès rapide).
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => triggerInstall()}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          Installer l’application
        </button>
        <button
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
          className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 rounded transition-colors"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
