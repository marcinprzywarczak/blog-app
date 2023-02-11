import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../core/services/post.service';
import { Post } from '../../../../core/models/post';
import { CategoryWithPosts } from '../../../../core/models/category-with-posts';
import { finalize, Observable } from 'rxjs';
import { DropDownAnimation } from '../../../../core/animations/dropdown-animation';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [DropDownAnimation],
})
export class MainPageComponent implements OnInit {
  posts: Post[];
  responsiveOptions: any;
  placeholder = [1, 2, 3];
  dataLoaded = false;
  mostPopularCategoriesWithPosts: CategoryWithPosts[];
  constructor(private postService: PostService) {}

  async ngOnInit(): Promise<void> {
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
    await new Promise((f) => setTimeout(f, 2000));
    this.postService
      .getMostPopularCategoriesWithPosts()
      .pipe(finalize(() => (this.dataLoaded = true)))
      .subscribe({
        next: (res) => {
          this.mostPopularCategoriesWithPosts = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
