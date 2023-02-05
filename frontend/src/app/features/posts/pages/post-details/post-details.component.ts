import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../../core/services/post.service';
import { Post } from '../../../../core/models/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  postId: number;
  post: Post;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    console.log(this.postId);
    this.getPost();
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe({
      next: (res) => {
        console.log(res);
        this.post = res;
      },
      error: (err) => {},
    });
  }
}
