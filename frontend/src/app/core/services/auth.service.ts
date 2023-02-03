import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { LoginForm } from '../models/login-form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(loginForm: LoginForm): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/api/auth/signin`,
      loginForm
    );
  }

  logout() {
    return this.http.post(`${environment.apiUrl}/api/auth/signout`, {});
  }
}
