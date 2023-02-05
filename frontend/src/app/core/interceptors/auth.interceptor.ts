import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpRequestInterceptor } from './http-request.interceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.logout().subscribe(() => {
            localStorage.clear();
            window.location.href = '/login';
          });
        }
        return throwError(err);
      })
    );
  }
}

export const httpAuthInterceptor = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
