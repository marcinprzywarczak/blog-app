import { Component, OnInit } from '@angular/core';
import { LikeService } from '../../../../core/services/like.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Like } from '../../../../core/models/like';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
  styleUrls: ['./user-likes.component.scss'],
})
export class UserLikesComponent implements OnInit {
  postId: number;
  likes: Like[];
  constructor(
    private likeService: LikeService,
    private dialogConfig: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.postId = this.dialogConfig.data.postId;
    this.getLikes();
  }

  getLikes() {
    this.likeService.getLikesToPost(this.postId).subscribe({
      next: (res) => {
        this.likes = res;
      },
      error: (err) => {},
    });
  }
}
