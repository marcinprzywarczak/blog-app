import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./features/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user-panel/user-panel.module').then(
        (m) => m.UserPanelModule
      ),
  },
  // {
  //   path: '*',
  //   loadChildren: () =>
  //     import('./features/main-page/main-page.module').then(
  //       (m) => m.MainPageModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
