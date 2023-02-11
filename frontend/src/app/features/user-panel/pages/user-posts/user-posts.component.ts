import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../core/services/post.service';
import { Post } from '../../../../core/models/post';
import { LazyLoadEvent } from 'primeng/api';
import { Pagination } from '../../../../core/models/pagination';
import {
  animate,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Category } from '../../../../core/models/category';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
  animations: [
    trigger('table', [
      transition(':enter', [
        style({ height: 0, overflow: 'hidden' }),
        query('.table', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
        ]),
        sequence([
          animate('200ms', style({ height: '*' })),
          query('.table', [
            stagger(-50, [
              animate('250ms ease', style({ opacity: 1, transform: 'none' })),
            ]),
          ]),
        ]),
      ]),

      transition(':leave', [
        style({ height: '*', overflow: 'hidden' }),
        query('.table', [style({ opacity: 1, transform: 'none' })]),
        sequence([
          query('.table', [
            stagger(50, [
              animate(
                '250ms ease',
                style({ opacity: 0, transform: 'translateY(-100px)' })
              ),
            ]),
          ]),
          animate('200ms', style({ height: 0 })),
        ]),
      ]),
    ]),
  ],
})
export class UserPostsComponent implements OnInit {
  columns: { column: string; columnName: string }[] = [
    { column: 'id', columnName: 'ID' },
    { column: 'title', columnName: 'TITLE' },
    { column: 'createdAt', columnName: 'DATE' },
    { column: 'categories', columnName: 'CATEGORIES' },
    { column: 'active', columnName: 'STATE' },
  ];
  posts: Post[];
  totalRecords: number;
  loading = true;
  categoriesOptions: Category[];
  stateOptions: { name: string; value: boolean }[] = [
    { name: 'ACTIVE', value: true },
    { name: 'INACTIVE', value: false },
  ];
  constructor(
    private postService: PostService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesOptions = res;
      },
      error: (err) => {},
    });
  }

  getPosts(event: LazyLoadEvent) {
    console.log(event);
    this.loading = true;
    this.postService.getUserPosts(event).subscribe({
      next: (res) => {
        this.posts = res.content;
        this.totalRecords = res.totalElements;
        this.loading = false;
      },
      error: (err) => {},
    });
  }
}
