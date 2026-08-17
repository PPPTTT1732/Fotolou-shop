import { useState, useEffect, useCallback } from 'react';
import { Gallery, PhotoItem } from '../../../types/gallery';
import { GalleryRepository } from '../repositories/gallery.repository';
import { GalleryUseCases } from '../use-cases/gallery-actions.usecase';

export function useGalleries() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);

  const refresh = useCallback(() => {
    const list = GalleryRepository.getAll();
    setGalleries(list);
    if (selectedGallery) {
      const updated = list.find(g => g.id === selectedGallery.id);
      if (updated) setSelectedGallery(updated);
    }
  }, [selectedGallery]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggleFavorite = (galleryId: string, photoId: string) => {
    GalleryUseCases.togglePhotoFavorite(galleryId, photoId);
    refresh();
  };

  const addPhoto = (galleryId: string, photo: Omit<PhotoItem, 'id' | 'uploadedAt'>) => {
    GalleryUseCases.addPhotoToGallery(galleryId, photo);
    refresh();
  };

  const createGallery = (data: { title: string; clientName: string; coverPhotoUrl: string; accessPinCode?: string }) => {
    const res = GalleryUseCases.createGallery(data);
    if (res.success) refresh();
    return res;
  };

  return {
    galleries,
    selectedGallery,
    setSelectedGallery,
    refresh,
    toggleFavorite,
    addPhoto,
    createGallery,
  };
}
