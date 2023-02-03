import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginForm } from '../../../../core/models/login-form';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  serverErrorMessage: string;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.serverErrorMessage = '';
    this.submitted = true;
    if (this.form.invalid) return;
    this.loading = true;
    const loginForm: LoginForm = this.form.value;
    this.authService
      .login(loginForm)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('isLogged', 'true');
          // window.location.href = '/';
          console.log('success', res);
        },
        error: (err) => {
          if (err.error.message) {
            this.serverErrorMessage = err.error.message;
          }
          console.log('error', err);
        },
      });
  }
}
