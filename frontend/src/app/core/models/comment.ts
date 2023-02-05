import { User } from './user';

export interface Comment {
  id: number;
  title: string;
  description: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
