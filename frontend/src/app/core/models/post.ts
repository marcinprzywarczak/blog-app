import { Category } from './category';
import { Photo } from './photo';

export interface Post {
  active: boolean;
  categories: Category[];
  comments: any[];
  content: string;
  createdAt: Date;
  description: string;
  id: number;
  likes: number;
  mainPhotoName: string;
  mainPhotoUrl: string;
  photos: Photo[];
  title: string;
  updatedAt: Date;
}
