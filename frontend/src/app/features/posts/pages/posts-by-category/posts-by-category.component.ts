import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/models/category';
import { delay, finalize, Subscription } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { Post } from '../../../../core/models/post';

@Component({
  selector: 'app-posts-by-category',
  templateUrl: './posts-by-category.component.html',
  styleUrls: ['./posts-by-category.component.scss'],
})
export class PostsByCategoryComponent implements OnInit, OnDestroy {
  categoryName: string;
  currentCategory: Category;
  posts: Post[];
  totalElements: number;
  loading = false;
  routeParamSubscription: Subscription;
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.routeParamSubscription = this.route.params.subscribe((params) => {
      if (params['category']) {
        this.categoryName = this.route.snapshot.params['category'];
      }
      this.getCategories();
    });
  }

  ngOnDestroy() {
    if (this.routeParamSubscription) this.routeParamSubscription.unsubscribe();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        if (res.find((x) => x.name === this.categoryName) === undefined) {
          this.router.navigate(['']);
        } else {
          this.currentCategory = res.find((x) => x.name === this.categoryName)!;
          this.getPostsByCategory(1, 9);
        }
      },
    });
  }

  getPostsByCategory(first: number, rows: number) {
    this.postService
      .getPostByCategories({
        first: first,
        rows: rows,
        categoryIds: [this.currentCategory.id],
      })
      .subscribe({
        next: (res) => {
          this.posts = res.content;
          this.totalElements = res.totalElements;
          this.loading = false;
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  paginate(event: any) {
    this.getPostsByCategory(event.first + 1, event.rows);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
