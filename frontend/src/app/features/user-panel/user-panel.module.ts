import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { AddNewPostComponent } from './pages/add-new-post/add-new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { UserPanelSidebarComponent } from './components/user-panel-sidebar/user-panel-sidebar.component';
import { UserPanelMainComponent } from './pages/user-panel-main/user-panel-main.component';
import { CoreModule } from '../../core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AddNewPostComponent,
    UserPanelSidebarComponent,
    UserPanelMainComponent,
    UserPostsComponent,
    UserAccountComponent,
    EditPostComponent,
  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    ButtonModule,
    EditorModule,
    CoreModule,
    FontAwesomeModule,
    TableModule,
    TagModule,
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    ConfirmDialogModule,
  ],
})
export class UserPanelModule {}
