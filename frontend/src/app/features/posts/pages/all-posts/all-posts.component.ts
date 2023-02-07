import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../../core/models/post';
import { PostService } from '../../../../core/services/post.service';
import { Sort } from '../../../../core/models/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { DropDownAnimation } from '../../../../core/animations/dropdown-animation';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
  animations: [DropDownAnimation],
})
export class AllPostsComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  posts: Post[];
  totalElements: number;
  loading = true;
  search = '';
  sortOptions: { sort: Sort; label: string }[] = [
    {
      sort: { field: 'createdAt', direction: 'DESC' },
      label: 'Date desc',
    },
    {
      sort: { field: 'createdAt', direction: 'ASC' },
      label: 'Date asc',
    },
    {
      sort: { field: 'title', direction: 'DESC' },
      label: 'Title desc',
    },
    {
      sort: { field: 'title', direction: 'ASC' },
      label: 'Title asc',
    },
    {
      sort: { field: 'likes', direction: 'DESC' },
      label: 'Likes desc',
    },
    {
      sort: { field: 'likes', direction: 'ASC' },
      label: 'Likes asc',
    },
  ];
  sortField: Sort;
  availableSortFieldOptions: string[] = ['createdAt', 'title', 'likes'];
  page: number;
  rows = 9;
  empty = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sortField = {
      field: this.sortOptions[0].sort.field,
      direction: this.sortOptions[0].sort.direction,
    };

    this.route.queryParams.subscribe((params) => {
      if (params['sortBy']) {
        if (this.availableSortFieldOptions.includes(params['sortBy']))
          this.sortField.field = params['sortBy'];
      }
      if (params['direction']) {
        if (params['direction'] !== 'DESC' && params['direction'] !== 'ASC') {
          this.sortField.direction = 'ASC';
        } else {
          this.sortField.direction = params['direction'];
        }
      }
      if (params['search']) {
        this.search = params['search'];
      }
      if (params['page'] && params['page'] > 0 && !isNaN(params['page'])) {
        this.page = params['page'];
      } else {
        this.page = 1;
      }
    });
    this.router.navigate([], {
      queryParams: {
        sortBy: this.sortField.field,
        direction: this.sortField.direction,
        page: this.page,
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });

    this.postService
      .getAllPosts({
        first: 1,
        rows: 9,
        field: this.sortField.field,
        direction: this.sortField.direction,
        search: this.search.length > 0 ? this.search : null,
      })
      .subscribe({
        next: (res) => {
          this.totalElements = res.totalElements;
          if (this.totalElements === 0) {
            this.empty = true;
            this.loading = false;
          } else {
            this.empty = false;
          }
          if (this.page > res.totalPages) {
            this.page = 1;
            this.router.navigate([], {
              queryParams: {
                page: this.page,
              },
              queryParamsHandling: 'merge',
              skipLocationChange: false,
            });
          }
          this.updateCurrentPage(this.page - 1);
        },
        error: (err) => {
          this.loading = false;
          this.empty = true;
        },
      });
  }

  getAllPosts(first: number, rows: number, sort: Sort) {
    this.postService
      .getAllPosts({
        first: first,
        rows: rows,
        field: sort.field,
        direction: sort.direction,
        search: this.search.length > 0 ? this.search : null,
      })
      .subscribe({
        next: (res) => {
          this.posts = res.content;
          this.totalElements = res.totalElements;
          this.empty = this.totalElements === 0;
          this.page = res.number + 1;
          this.loading = false;
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        },
        error: (err) => {
          this.loading = false;
          this.empty = true;
        },
      });
  }

  paginate(event: any) {
    const page = Number(event.page) + 1;
    this.router.navigate([], {
      queryParams: {
        page: page,
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
    this.getAllPosts(event.first + 1, event.rows, this.sortField);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  changeSortField(event: any) {
    this.router.navigate([], {
      queryParams: {
        sortBy: this.sortField.field,
        direction: this.sortField.direction,
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
    this.updateCurrentPage(0);
  }

  searchByInput() {
    this.router.navigate([], {
      queryParams: {
        search: this.search,
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
    this.postService
      .getAllPosts({
        first: 1,
        rows: 9,
        field: this.sortField.field,
        direction: this.sortField.direction,
        search: this.search.length > 0 ? this.search : null,
      })
      .subscribe({
        next: (res) => {
          this.totalElements = res.totalElements;
          this.empty = this.totalElements === 0;
          this.updateCurrentPage(0);
        },
        error: (err) => {
          this.loading = false;
          this.empty = true;
        },
      });
  }

  private updateCurrentPage(currentPage: number): void {
    setTimeout(() => this.paginator.changePage(currentPage));
  }
}
