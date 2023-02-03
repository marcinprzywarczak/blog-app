import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SharedModule } from '../../shared/shared.module';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule,
    SharedModule,
    ButtonModule,
  ],
})
export class LoginModule {}
