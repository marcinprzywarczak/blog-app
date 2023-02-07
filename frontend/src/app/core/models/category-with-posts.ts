import { Category } from './category';
import { Post } from './post';

export interface CategoryWithPosts extends Category {
  posts: Post[];
  postCount: number;
}
