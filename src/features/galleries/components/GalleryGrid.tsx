import React from 'react';
import { Plus, Images, Camera, Heart, CheckCircle } from 'lucide-react';
import { Gallery, PhotoItem } from '../../../types/gallery';
import { GalleryCard } from './GalleryCard';
import { Button } from '../../../shared/ui/Button';
import { CameraCapability } from '../../../platform/capabilities/camera';

interface GalleryGridProps {
  galleries: Gallery[];
  selectedGallery: Gallery | null;
  onSelectGallery: (gallery: Gallery | null) => void;
  onNewGallery: () => void;
  onToggleFavorite: (galleryId: string, photoId: string) => void;
  onAddPhoto: (galleryId: string, photo: Omit<PhotoItem, 'id' | 'uploadedAt'>) => void;
  onViewPhoto: (photo: PhotoItem) => void;
  onToast: (title: string, desc?: string) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  galleries,
  selectedGallery,
  onSelectGallery,
  onNewGallery,
  onToggleFavorite,
  onAddPhoto,
  onViewPhoto,
  onToast,
}) => {
  const handleUploadPhoto = async () => {
    if (!selectedGallery) return;
    const res = await CameraCapability.selectOrCaptureImage();
    if (res) {
      onAddPhoto(selectedGallery.id, {
        url: res.dataUrl,
        thumbnailUrl: res.dataUrl,
        title: res.file.name.replace(/\.[^/.]+$/, ''),
        isFavorite: false,
        selectedForRetouch: false,
      });
      onToast('Photo ajoutée !', 'La photo a été téléversée dans la galerie.');
    }
  };

  if (selectedGallery) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
          <div>
            <button
              onClick={() => onSelectGallery(null)}
              className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline mb-1"
            >
              ← Retour aux galeries
            </button>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">{selectedGallery.title}</h3>
            <p className="text-xs text-stone-500">Client: {selectedGallery.clientName} • PIN: {selectedGallery.accessPinCode}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleUploadPhoto}>
              <Camera className="w-4 h-4" />
              Ajouter / Prendre photo
            </Button>
          </div>
        </div>

        {selectedGallery.photos.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-2xl bg-stone-50/50 dark:bg-stone-900/30">
            <Images className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-xs text-stone-500 mb-3">Aucune photo dans cette galerie pour l'instant.</p>
            <Button size="sm" onClick={handleUploadPhoto}>Importer une photo</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {selectedGallery.photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-stone-900 border border-stone-200/80 dark:border-stone-800 cursor-pointer shadow-xs"
                onClick={() => onViewPhoto(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(selectedGallery.id, photo.id);
                      }}
                      className={`p-1.5 rounded-full ${photo.isFavorite ? 'bg-rose-600 text-white' : 'bg-black/50 text-white/80 hover:text-white'}`}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                  <p className="text-xs text-white truncate font-medium">{photo.title}</p>
                </div>
                {photo.isFavorite && (
                  <div className="absolute top-2 left-2 p-1 bg-rose-600/90 text-white rounded-full">
                    <Heart className="w-2.5 h-2.5 fill-current" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Galeries Privées Clients</h3>
          <p className="text-xs text-stone-500">Albums sécurisés livrés aux clients pour sélection & téléchargement HD</p>
        </div>
        <Button onClick={onNewGallery} size="sm">
          <Plus className="w-4 h-4" />
          Nouvelle galerie
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleries.map((gal) => (
          <GalleryCard
            key={gal.id}
            gallery={gal}
            onOpen={() => onSelectGallery(gal)}
            onToast={onToast}
          />
        ))}
      </div>
    </div>
  );
};
