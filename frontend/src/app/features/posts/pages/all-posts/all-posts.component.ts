import { Component, OnInit } from '@angular/core';
import { Post } from '../../../../core/models/post';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  posts: Post[];
  totalElements: number;
  loading = true;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getAllPosts(1, 9);
  }

  getAllPosts(first: number, rows: number) {
    this.postService.getAllPosts({ first: first, rows: rows }).subscribe({
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
      error: (err) => {},
    });
  }

  paginate(event: any) {
    this.getAllPosts(event.first + 1, event.rows);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
