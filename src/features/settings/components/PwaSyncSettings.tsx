import React from 'react';
import { Smartphone, HardDrive, RefreshCw, Trash2 } from 'lucide-react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { useOfflineSync } from '../../../pwa/offline/useOfflineSync';
import { useDevice } from '../../../platform/hooks/useDevice';

interface PwaSyncSettingsProps {
  onToast: (title: string, desc?: string) => void;
}

export const PwaSyncSettings: React.FC<PwaSyncSettingsProps> = ({ onToast }) => {
  const { isOnline, pendingCount, isSyncing, forceSync } = useOfflineSync();
  const device = useDevice();

  const handleClearCache = () => {
    localStorage.clear();
    onToast('Données réinitialisées', 'Le cache local a été réinitialisé.');
    window.location.reload();
  };

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
        <Smartphone className="w-4 h-4 text-amber-600" />
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">PWA, Cache Local & Synchronisation</h3>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl">
          <div>
            <span className="font-semibold text-stone-900 dark:text-stone-100">État du Réseau</span>
            <p className="text-[11px] text-stone-500">Connectivité active de l'appareil</p>
          </div>
          <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
            isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {isOnline ? 'En Ligne (Synchronisé)' : 'Hors-Ligne (Stockage local)'}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl">
          <div>
            <span className="font-semibold text-stone-900 dark:text-stone-100">File d'attente Offline</span>
            <p className="text-[11px] text-stone-500">{pendingCount} modification(s) en attente de synchronisation</p>
          </div>
          <Button size="sm" variant="outline" onClick={forceSync} disabled={isSyncing || !isOnline}>
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Synchronisation...' : 'Forcer la sync'}
          </Button>
        </div>

        <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl">
          <div>
            <span className="font-semibold text-stone-900 dark:text-stone-100">Mode d'exécution</span>
            <p className="text-[11px] text-stone-500">
              {device.isStandalone ? 'PWA Installée en standalone' : 'Navigateur Web Responsive'}
            </p>
          </div>
          <span className="text-stone-600 font-mono text-[11px]">
            {device.isMobile ? 'Mobile' : device.isTablet ? 'Tablette' : 'Desktop'}
          </span>
        </div>

        <div className="pt-2 flex justify-end">
          <Button size="sm" variant="danger" onClick={handleClearCache}>
            <Trash2 className="w-3.5 h-3.5" />
            Réinitialiser les données de démo
          </Button>
        </div>
      </div>
    </Card>
  );
};
