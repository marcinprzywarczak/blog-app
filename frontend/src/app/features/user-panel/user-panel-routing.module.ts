import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewPostComponent } from './pages/add-new-post/add-new-post.component';
import { UserPanelMainComponent } from './pages/user-panel-main/user-panel-main.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { UserLikedPostsComponent } from './pages/user-liked-posts/user-liked-posts.component';
import { UserFollowPostsComponent } from './pages/user-follow-posts/user-follow-posts.component';

const routes: Routes = [
  {
    path: '',
    component: UserPanelMainComponent,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'addNewPost', component: AddNewPostComponent },
      { path: 'posts', component: UserPostsComponent },
      { path: 'account', component: UserAccountComponent },
      { path: 'likes', component: UserLikedPostsComponent },
      { path: 'follow', component: UserFollowPostsComponent },
      { path: 'settings', component: UserFollowPostsComponent },
      { path: 'post/edit/:id', component: EditPostComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPanelRoutingModule {}
