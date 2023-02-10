import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
// import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router // private ngxPermissionsService: NgxPermissionsService
  ) {}
  canActivate(): boolean {
    if (this.userService.getIsLogged()) {
      const user = this.userService.getUser();
      // if (user.roles) this.ngxPermissionsService.loadPermissions(user.roles);
    }
    if (!this.userService.getIsLogged()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
}
