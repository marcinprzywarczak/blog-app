import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public register(registerData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(
      `${environment.apiUrl}/api/auth/register`,
      registerData,
      { headers: headers }
    );
  }

  logout() {
    return this.http.post(`${environment.apiUrl}/api/auth/signout`, {});
  }
}
