import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { DataReloadService } from './data-reload.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user: User;
  private isLogged: boolean;
  private reloadSubscription: Subscription;

  constructor(private dataReloadService: DataReloadService) {
    this.setItems();
    this.reloadSubscription = this.dataReloadService.navbarUserInfo.subscribe(
      () => {
        this.setItems();
      }
    );
  }

  setItems() {
    this.isLogged = localStorage.getItem('isLogged') === 'true';
    this.user = JSON.parse(localStorage.getItem('user') || '[]');
  }

  getUser(): User {
    return this.user;
  }

  getIsLogged(): boolean {
    return this.isLogged;
  }

  ngOnDestroy(): void {
    if (this.reloadSubscription) this.reloadSubscription.unsubscribe();
  }
}
