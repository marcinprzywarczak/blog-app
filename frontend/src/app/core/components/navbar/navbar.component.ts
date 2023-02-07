import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { DropDownAnimation } from '../../animations/dropdown-animation';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { DataReloadService } from '../../services/data-reload.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [DropDownAnimation],
})
export class NavbarComponent implements OnInit {
  isLogged: boolean;
  user: User;
  userDropdown = false;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dataReloadService: DataReloadService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.userService.getIsLogged();
    this.user = this.userService.getUser();
    this.dataReloadService.navbarUserInfo.subscribe(() => {
      this.isLogged = this.userService.getIsLogged();
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.clear();
      window.location.reload();
    });
  }
}
