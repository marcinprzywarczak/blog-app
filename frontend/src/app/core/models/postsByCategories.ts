import { Pagination } from './pagination';

export interface PostsByCategories extends Pagination {
  categoryIds: number[];
}
