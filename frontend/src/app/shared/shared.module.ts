import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostCardSkeletonComponent } from './components/post-card-skeleton/post-card-skeleton.component';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentCardComponent } from './components/comment-card/comment-card.component';

@NgModule({
  declarations: [
    PostCardComponent,
    PostCardSkeletonComponent,
    CommentCardComponent,
  ],
  exports: [PostCardComponent, PostCardSkeletonComponent, CommentCardComponent],
  imports: [
    SkeletonModule,
    CommonModule,
    AvatarModule,
    CoreModule,
    RouterModule,
    FontAwesomeModule,
  ],
})
export class SharedModule {}
