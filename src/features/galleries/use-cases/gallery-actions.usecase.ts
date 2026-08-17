import { Gallery, PhotoItem } from '../../../types/gallery';
import { GalleryRepository } from '../repositories/gallery.repository';

export class GalleryUseCases {
  static createGallery(input: {
    title: string;
    clientName: string;
    coverPhotoUrl: string;
    accessPinCode?: string;
  }): { success: boolean; data?: Gallery; error?: string } {
    if (!input.title.trim()) return { success: false, error: 'Titre requis' };

    const newGallery: Gallery = {
      id: `gal_${Date.now()}`,
      clientId: `cli_${Date.now()}`,
      clientName: input.clientName,
      title: input.title,
      coverPhotoUrl: input.coverPhotoUrl || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
      accessPinCode: input.accessPinCode || '1234',
      isPublic: false,
      status: 'client_review',
      photos: [],
      downloadAllowed: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const saved = GalleryRepository.create(newGallery);
    return { success: true, data: saved };
  }

  static togglePhotoFavorite(galleryId: string, photoId: string): boolean {
    const gallery = GalleryRepository.getById(galleryId);
    if (!gallery) return false;

    const updatedPhotos = gallery.photos.map(p =>
      p.id === photoId ? { ...p, isFavorite: !p.isFavorite } : p
    );
    GalleryRepository.update({ ...gallery, photos: updatedPhotos });
    return true;
  }

  static addPhotoToGallery(galleryId: string, photo: Omit<PhotoItem, 'id' | 'uploadedAt'>): boolean {
    const gallery = GalleryRepository.getById(galleryId);
    if (!gallery) return false;

    const newPhoto: PhotoItem = {
      ...photo,
      id: `ph_${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };

    const updatedPhotos = [newPhoto, ...gallery.photos];
    GalleryRepository.update({ ...gallery, photos: updatedPhotos });
    return true;
  }
}
