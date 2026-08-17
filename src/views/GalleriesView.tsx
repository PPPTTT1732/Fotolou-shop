import React from 'react';
import { GalleryGrid } from '../features/galleries/components/GalleryGrid';
import { Gallery, PhotoItem } from '../types/gallery';

interface GalleriesViewProps {
  galleries: Gallery[];
  selectedGallery: Gallery | null;
  onSelectGallery: (gallery: Gallery | null) => void;
  onNewGallery: () => void;
  onToggleFavorite: (galleryId: string, photoId: string) => void;
  onAddPhoto: (galleryId: string, photo: Omit<PhotoItem, 'id' | 'uploadedAt'>) => void;
  onViewPhoto: (photo: PhotoItem) => void;
  onToast: (title: string, desc?: string) => void;
}

export const GalleriesView: React.FC<GalleriesViewProps> = ({
  galleries,
  selectedGallery,
  onSelectGallery,
  onNewGallery,
  onToggleFavorite,
  onAddPhoto,
  onViewPhoto,
  onToast,
}) => {
  return (
    <GalleryGrid
      galleries={galleries}
      selectedGallery={selectedGallery}
      onSelectGallery={onSelectGallery}
      onNewGallery={onNewGallery}
      onToggleFavorite={onToggleFavorite}
      onAddPhoto={onAddPhoto}
      onViewPhoto={onViewPhoto}
      onToast={onToast}
    />
  );
};
