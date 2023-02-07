import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsLiked } from '@fortawesome/free-solid-svg-icons';
import { LikeService } from '../../../../core/services/like.service';
import { AlertService } from '../../../../core/services/alert.service';
import { DataReloadService } from '../../../../core/services/data-reload.service';
import { DialogService } from 'primeng/dynamicdialog';
import { UserLikesComponent } from '../user-likes/user-likes.component';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent implements OnInit {
  @Input() likeCounts: number;
  @Input() liked: boolean;
  @Input() postId: number;
  faThumbs = faThumbsUp;
  faThumbsLiked = faThumbsLiked;
  constructor(
    private likeService: LikeService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {}

  like() {
    this.likeService.addNewLike(this.postId).subscribe({
      next: (res) => {
        if (this.liked) {
          this.likeCounts--;
          this.liked = false;
        } else {
          this.likeCounts++;
          this.liked = true;
        }
      },
      error: (err) => {
        this.alertService.showError('To like post you must login firs');
      },
    });
  }

  openLikes() {
    this.dialogService.open(UserLikesComponent, {
      header: 'Users who liked this post',
      width: '30rem',
      height: '45rem',
      data: {
        postId: this.postId,
      },
    });
  }
}
