import React, { useState } from 'react';
import { Download, X, Share, PlusSquare, Smartphone, Check } from 'lucide-react';
import { usePwaInstall } from '../hooks/usePwaInstall';

export const PwaInstallBanner: React.FC = () => {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    showIOSPrompt,
    setShowIOSPrompt,
    triggerInstall,
  } = usePwaInstall();

  const [isDismissed, setIsDismissed] = useState(false);

  if (isInstalled || isDismissed) return null;

  return (
    <>
      {/* Subtle Top or Bottom Floating Pill / Banner */}
      {isInstallable && !showIOSPrompt && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/50 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md shrink-0 border border-white/20">
              <img src="/icon.svg" alt="Fotolou" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-white truncate">Installer l'application Fotolou</h4>
              <p className="text-[11px] text-slate-300">Accès rapide & hors-ligne</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={triggerInstall}
              className="px-3.5 py-1.5 rounded-xl bg-[#4318FF] hover:bg-[#3311CC] text-white text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Installer
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* iOS Step-by-Step Instructions Modal */}
      {showIOSPrompt && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-slate-900 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md shrink-0 border border-slate-100">
                  <img src="/icon.svg" alt="Fotolou" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Installer Fotolou</h3>
                  <p className="text-xs text-slate-500">Ajouter à l'écran d'accueil</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSPrompt(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#4318FF] text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  Dans Safari, appuyez sur le bouton <strong>Partager</strong>{' '}
                  <Share className="w-3.5 h-3.5 inline text-[#4318FF] -mt-0.5" /> dans la barre de navigation.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#4318FF] text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  Faites défiler vers le bas et sélectionnez{' '}
                  <strong>« Sur l'écran d'accueil »</strong>{' '}
                  <PlusSquare className="w-3.5 h-3.5 inline text-slate-800 -mt-0.5" />.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#4318FF] text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  Appuyez sur <strong>Ajouter</strong> en haut à droite pour finaliser l'installation.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSPrompt(false)}
              className="w-full py-3.5 rounded-2xl bg-[#4318FF] hover:bg-[#3311CC] text-white text-xs font-black transition-all cursor-pointer text-center"
            >
              J'ai compris
            </button>
          </div>
        </div>
      )}
    </>
  );
};
