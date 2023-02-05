import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewPostComponent } from './pages/add-new-post/add-new-post.component';

const routes: Routes = [{ path: 'addNewPost', component: AddNewPostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPanelRoutingModule {}
