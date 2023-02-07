import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsByCategoryComponent } from './pages/posts-by-category/posts-by-category.component';
import { SharedModule } from '../../shared/shared.module';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { PaginatorModule } from 'primeng/paginator';
import { CarouselModule } from 'primeng/carousel';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostCategoriesComponent } from './pages/post-categories/post-categories.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { CommentsComponent } from './components/comments/comments.component';
import { LikesComponent } from './components/likes/likes.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserLikesComponent } from './components/user-likes/user-likes.component';
import { CoreModule } from '../../core/core.module';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    PostsByCategoryComponent,
    AllPostsComponent,
    PostDetailsComponent,
    PostCategoriesComponent,
    CommentFormComponent,
    CommentsComponent,
    LikesComponent,
    UserLikesComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    PaginatorModule,
    CarouselModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    AvatarModule,
    FontAwesomeModule,
    CoreModule,
    RippleModule,
  ],
})
export class PostsModule {}
