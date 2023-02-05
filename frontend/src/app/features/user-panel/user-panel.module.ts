import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { AddNewPostComponent } from './pages/add-new-post/add-new-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AddNewPostComponent],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    ButtonModule,
  ],
})
export class UserPanelModule {}
