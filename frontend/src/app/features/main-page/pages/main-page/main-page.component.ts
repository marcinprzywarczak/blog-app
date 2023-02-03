import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../core/services/post.service';
import { Post } from '../../../../core/models/post';
import { CategoryWithPosts } from '../../../../core/models/category-with-posts';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  posts: Post[];
  responsiveOptions: any;
  mostPopularCategoriesWithPosts: CategoryWithPosts[];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1060px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '760px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.postService.getAllPosts({ first: 1, rows: 5 }).subscribe({
      next: (res) => {
        console.log(res);
        this.posts = res.content;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.postService.getMostPopularCategoriesWithPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.mostPopularCategoriesWithPosts = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
