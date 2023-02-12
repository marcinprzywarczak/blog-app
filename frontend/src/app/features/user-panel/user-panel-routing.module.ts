import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewPostComponent } from './pages/add-new-post/add-new-post.component';
import { UserPanelMainComponent } from './pages/user-panel-main/user-panel-main.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: UserPanelMainComponent,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'addNewPost', component: AddNewPostComponent },
      { path: 'posts', component: UserPostsComponent },
      { path: 'account', component: UserAccountComponent },
      { path: 'post/edit/:id', component: EditPostComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPanelRoutingModule {}
