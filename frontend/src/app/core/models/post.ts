import { Category } from './category';
import { Photo } from './photo';
import { Like } from './like';
import { User } from './user';

export interface Post {
  active: boolean;
  categories: Category[];
  content: string;
  createdAt: Date;
  description: string;
  id: number;
  likes: Like[];
  mainPhotoName: string;
  mainPhotoUrl: string;
  photos: Photo[];
  title: string;
  updatedAt: Date;
  user: User;
  likeCount: number;
}
