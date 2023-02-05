import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsByCategoryComponent } from './pages/posts-by-category/posts-by-category.component';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostCategoriesComponent } from './pages/post-categories/post-categories.component';

const routes: Routes = [
  {
    path: 'category/:category',
    component: PostsByCategoryComponent,
  },
  {
    path: 'details/:id',
    component: PostDetailsComponent,
  },
  {
    path: 'categories',
    component: PostCategoriesComponent,
  },
  {
    path: '',
    component: AllPostsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
