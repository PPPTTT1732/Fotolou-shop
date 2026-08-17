import React from 'react';
import { Download, Heart, X, Check } from 'lucide-react';
import { PhotoItem } from '../../../types/gallery';
import { Button } from '../../../shared/ui/Button';

interface PhotoViewerModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onToggleFavorite?: () => void;
  onToast?: (title: string, desc?: string) => void;
}

export const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({
  photo,
  onClose,
  onToggleFavorite,
  onToast,
}) => {
  if (!photo) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `${photo.title || 'photo-fotolou'}.jpg`;
    link.target = '_blank';
    link.click();
    onToast?.('Téléchargement lancé', 'Fichier photo HD en cours de récupération');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative max-w-4xl w-full max-h-[95vh] flex flex-col bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
        <div className="px-4 py-3 bg-stone-950 flex items-center justify-between text-white shrink-0 border-b border-stone-800">
          <div>
            <h3 className="text-sm font-semibold">{photo.title}</h3>
            <p className="text-[11px] text-stone-400">Prise de vue Studio Fotolou</p>
          </div>
          <div className="flex items-center gap-2">
            {onToggleFavorite && (
              <button
                onClick={onToggleFavorite}
                className={`p-2 rounded-lg transition-colors ${photo.isFavorite ? 'bg-rose-600 text-white' : 'bg-stone-800 text-stone-300 hover:text-white'}`}
                title="Favori client"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
            )}
            <Button size="sm" variant="secondary" onClick={handleDownload}>
              <Download className="w-4 h-4" />
              Télécharger HD
            </Button>
            <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto flex items-center justify-center p-2 bg-stone-950/60 min-h-[300px]">
          <img
            src={photo.url}
            alt={photo.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
          />
        </div>

        {photo.notes && (
          <div className="p-3 bg-stone-950 border-t border-stone-800 text-xs text-amber-300">
            Note de retouche: {photo.notes}
          </div>
        )}
      </div>
    </div>
  );
};
