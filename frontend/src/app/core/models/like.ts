import { User } from './user';
import { Post } from './post';

export interface Like {
  id: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
