import React from 'react';
import { Images, ArrowRight } from 'lucide-react';
import { Gallery } from '../../../types/gallery';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';

interface RecentGalleriesBannerProps {
  galleries: Gallery[];
  onViewGalleries: () => void;
  onOpenGallery: (gallery: Gallery) => void;
}

export const RecentGalleriesBanner: React.FC<RecentGalleriesBannerProps> = ({
  galleries,
  onViewGalleries,
  onOpenGallery,
}) => {
  return (
    <Card padding="md" className="space-y-3">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Images className="w-4 h-4 text-purple-600" />
          Dernières Galeries Livrées
        </h3>
        <Button variant="ghost" size="sm" onClick={onViewGalleries}>
          Voir tout <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {galleries.slice(0, 2).map((gal) => (
          <div
            key={gal.id}
            onClick={() => onOpenGallery(gal)}
            className="flex items-center gap-3 p-2.5 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/80 dark:border-stone-700/80 hover:border-amber-500/50 cursor-pointer transition-all"
          >
            <img
              src={gal.coverPhotoUrl}
              alt={gal.title}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-lg object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                {gal.title}
              </h4>
              <p className="text-[11px] text-stone-500 truncate">{gal.clientName}</p>
              <span className="text-[10px] text-amber-600 font-medium">
                {gal.photos.length} photos • Code PIN {gal.accessPinCode}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
