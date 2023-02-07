import { Pagination } from './pagination';
import { Sort } from './sort';
import { PaginationWithSort } from './paginationWithSort';

export interface PaginationSortSearch extends PaginationWithSort {
  search: string | null;
}
