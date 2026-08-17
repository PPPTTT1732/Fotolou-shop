import React from 'react';
import { Images, Lock, Share2, Eye } from 'lucide-react';
import { Gallery } from '../../../types/gallery';
import { Card } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { SharingCapability } from '../../../platform/capabilities/sharing';

interface GalleryCardProps {
  gallery: Gallery;
  onOpen: () => void;
  onToast?: (title: string, desc?: string) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ gallery, onOpen, onToast }) => {
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = await SharingCapability.share({
      title: `Galerie Privée: ${gallery.title}`,
      text: `Accédez à votre galerie photos FOTOLOU. Code PIN: ${gallery.accessPinCode || '1234'}`,
    });
    if (res.success) {
      onToast?.('Lien partagé !', res.method === 'clipboard' ? 'Copié dans le presse-papier' : 'Partage envoyé');
    }
  };

  const statusMap: Record<Gallery['status'], { label: string; variant: 'amber' | 'emerald' | 'blue' | 'purple' }> = {
    draft: { label: 'Brouillon', variant: 'amber' },
    client_review: { label: 'Sélection Client', variant: 'blue' },
    retouching: { label: 'En Retouche', variant: 'purple' },
    delivered: { label: 'Livrée HD', variant: 'emerald' },
  };

  return (
    <Card
      padding="none"
      className="group overflow-hidden hover:border-amber-500/50 cursor-pointer flex flex-col"
      onClick={onOpen}
    >
      <div className="relative aspect-16/10 bg-stone-900 overflow-hidden">
        <img
          src={gallery.coverPhotoUrl}
          alt={gallery.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-black/20" />
        
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <Badge variant={statusMap[gallery.status]?.variant || 'blue'} size="sm">
            {statusMap[gallery.status]?.label}
          </Badge>
          {gallery.accessPinCode && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/60 text-white rounded text-[10px] backdrop-blur-xs font-mono">
              <Lock className="w-2.5 h-2.5" />
              PIN {gallery.accessPinCode}
            </span>
          )}
        </div>

        <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-end justify-between">
          <div>
            <p className="text-[11px] text-amber-300 font-medium">{gallery.clientName}</p>
            <h4 className="text-sm font-bold truncate drop-shadow-xs">{gallery.title}</h4>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-white/90 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
            <Images className="w-3 h-3" />
            {gallery.photos.length} photos
          </span>
        </div>
      </div>

      <div className="p-3 bg-white dark:bg-stone-900 flex items-center justify-between gap-2 border-t border-stone-100 dark:border-stone-800">
        <span className="text-[11px] text-stone-400">Créée le {gallery.createdAt}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleShare}
            className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            title="Partager la galerie"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 rounded-lg hover:bg-amber-100 transition-colors"
          >
            <Eye className="w-3 h-3" />
            Voir
          </button>
        </div>
      </div>
    </Card>
  );
};
