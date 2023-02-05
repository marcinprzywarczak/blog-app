import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comment } from '../../../../core/models/comment';
import { CommentService } from '../../../../core/services/comment.service';
import { DataReloadService } from '../../../../core/services/data-reload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() postId: number;
  comments: Comment[];
  totalElements: number;
  newCommentSubscription: Subscription;
  constructor(
    private commentService: CommentService,
    private dataReloadService: DataReloadService
  ) {}

  ngOnInit() {
    this.getComments(1, 6);
    this.newCommentSubscription = this.dataReloadService.newComment.subscribe(
      () => {
        this.getComments(1, 6);
      }
    );
  }

  ngOnDestroy() {
    if (this.newCommentSubscription) this.newCommentSubscription.unsubscribe();
  }

  getComments(first: number, rows: number) {
    this.commentService
      .getCommentsToPost(this.postId, { first: first, rows: rows })
      .subscribe({
        next: (res) => {
          this.comments = res.content;
          this.totalElements = res.totalElements;
          console.log(res);
        },
        error: (err) => {},
      });
  }

  paginate(event: any) {
    this.getComments(event.first + 1, event.rows);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
