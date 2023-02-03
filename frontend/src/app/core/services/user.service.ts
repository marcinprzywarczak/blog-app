import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;
  private isLogged: boolean;

  constructor() {
    this.isLogged = localStorage.getItem('isLogged') === 'true';
    this.user = JSON.parse(localStorage.getItem('user') || '[]');
  }

  getUser(): User {
    return this.user;
  }

  getIsLogged(): boolean {
    return this.isLogged;
  }
}
