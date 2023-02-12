import { Component, OnInit } from '@angular/core';
import { LikeService } from '../../../../core/services/like.service';
import { Like } from '../../../../core/models/like';

@Component({
  selector: 'app-user-liked-posts',
  templateUrl: './user-liked-posts.component.html',
  styleUrls: ['./user-liked-posts.component.scss'],
})
export class UserLikedPostsComponent implements OnInit {
  totalElements: number;
  likes: Like[];
  loading = true;
  rows: number;
  constructor(private likeService: LikeService) {}

  ngOnInit() {
    this.rows = 3;
    this.getLikes(1, this.rows);
  }

  getLikes(first: number, rows: number) {
    this.likeService.getUserLikedPosts({ rows: rows, first: first }).subscribe({
      next: (res) => {
        this.totalElements = res.totalElements;
        this.likes = res.content;
        console.log(res);
        this.loading = false;
      },
      error: (err) => {},
    });
  }

  paginate(event: any) {
    this.getLikes(event.first + 1, event.rows);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
