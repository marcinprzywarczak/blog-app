import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { AlertService } from '../../../../core/services/alert.service';
import { LoginForm } from '../../../../core/models/login-form';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { confirmedValidator } from '../../../../core/validators/cofirmed-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  serverErrorMessage: string;
  serverErrorMessages: any;
  avatar: File;
  avatarSrc: string | ArrayBuffer | null = '';
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.email]],
        name: [null, [Validators.required]],
        password: [null, [Validators.required]],
        matchingPassword: [null, [Validators.required]],
      },
      { validators: confirmedValidator }
    );
  }

  onSubmit() {
    this.serverErrorMessage = '';
    this.serverErrorMessages = [];
    this.submitted = true;
    if (this.form.invalid) return;
    this.loading = true;
    const formData: FormData = new FormData();
    Object.keys(this.form.controls).forEach((key) => {
      if (this.form.controls[key].value !== null)
        formData.append(key, this.form.controls[key].value);
    });
    if (this.avatarSrc !== '') {
      formData.append('avatar', this.avatar);
    }
    this.authService
      .register(formData)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.alertService.showSuccess(
            'Your account has been successfully created. Now you can log in to your account.'
          );
          this.router.navigate(['auth/login']);
        },
        error: (err) => {
          if (err.error.message) {
            if (err.error.error === 'InvalidregisterUserDto') {
              this.serverErrorMessages = JSON.parse(err.error.message);
            } else {
              this.serverErrorMessage = err.error.message;
            }
          }
          this.alertService.showError('Error while registering');
        },
      });
  }

  onChangeAvatar(event: any) {
    this.avatar = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => (this.avatarSrc = reader.result);
    reader.readAsDataURL(this.avatar);
  }

  deleteAvatar() {
    this.avatarSrc = '';
  }
}
