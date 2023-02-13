import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../core/services/post.service';
import { Post } from '../../../../core/models/post';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
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
import { AlertService } from '../../../../core/services/alert.service';

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
    private categoryService: CategoryService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService
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

  updatePostActive(id: number) {
    this.postService.updatePostState(id).subscribe({
      next: () => {
        if (this.posts.find((x) => x.id === id) !== undefined) {
          this.posts.find((x) => x.id === id)!.active = !this.posts.find(
            (x) => x.id === id
          )!.active;
        }
        this.alertService.showSuccess('Post successfully updated!');
      },
      error: (err) => {
        this.alertService.showSuccess('Error while updating post');
      },
    });
  }

  confirm(id: number, active: boolean) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to ${
        active ? 'deactivate' : 'activate'
      } this post?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updatePostActive(id);
      },
    });
  }
}
