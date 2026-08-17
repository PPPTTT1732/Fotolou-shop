import { ID } from './common';

export interface PhotoItem {
  id: ID;
  url: string;
  thumbnailUrl: string;
  title: string;
  isFavorite: boolean;
  selectedForRetouch: boolean;
  notes?: string;
  width?: number;
  height?: number;
  fileSizeBytes?: number;
  uploadedAt: string;
}

export interface Gallery {
  id: ID;
  bookingId?: ID;
  clientId: ID;
  clientName: string;
  title: string;
  coverPhotoUrl: string;
  accessPinCode?: string;
  isPublic: boolean;
  status: 'draft' | 'client_review' | 'retouching' | 'delivered';
  photos: PhotoItem[];
  downloadAllowed: boolean;
  createdAt: string;
  expiresAt?: string;
}
