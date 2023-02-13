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
  displayCustom: boolean;
  activeIndex = 0;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    this.getPost();
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe({
      next: (res) => {
        this.post = res;
        this.post.content = this.post.content.replaceAll(
          'img',
          `img class='w-auto max-h-96' `
        );
      },
      error: (err) => {},
    });
  }

  imageClick(index: number) {
    this.activeIndex = this.post.photos.indexOf(
      this.post.photos.find((x) => x.id === index)!
    );
    this.displayCustom = true;
  }
}
