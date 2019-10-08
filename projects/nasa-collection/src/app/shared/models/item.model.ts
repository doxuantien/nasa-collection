export interface ItemModel {
  nasaId: string;
  date: string;
  title: string;
  location: string;
  thumbnail: string;
  mediaType: string;
  description: string;
  asset?: string;
  isFavorite?: boolean;
}
