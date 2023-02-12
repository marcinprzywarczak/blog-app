import { User } from './user';
import { Post } from './post';

export interface Like {
  id: number;
  user: User;
  post: Post;
  createdAt: Date;
  updatedAt: Date;
}
