import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { DropDownAnimation } from '../../animations/dropdown-animation';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { DataReloadService } from '../../services/data-reload.service';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [DropDownAnimation],
})
export class NavbarComponent implements OnInit {
  @ViewChild('mobileMenuIcon', { read: ElementRef }) mobileMenu: ElementRef;
  isLogged: boolean;
  user: User;
  userDropdown = false;
  userDropdownMobile = false;
  faBarsIcon = faBars;
  faMarkIcon = faXmark;
  activeIcon = this.faBarsIcon;
  activeMobileMenu = false;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dataReloadService: DataReloadService,
    private router: Router
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

  clickMobileMenu() {
    this.activeMobileMenu = !this.activeMobileMenu;
    this.mobileMenu.nativeElement.classList.toggle('rotate-180');
    document.body.classList.toggle('overflow-hidden');
  }

  clickOutsideMobileMenu() {
    if (this.activeMobileMenu)
      this.mobileMenu.nativeElement.classList.toggle('rotate-180');
    this.activeMobileMenu = false;
    document.body.classList.remove('overflow-hidden');
  }

  isLinkActive(url: string): boolean {
    const queryParamsIndex = this.router.url.indexOf('?');
    const baseUrl =
      queryParamsIndex === -1
        ? this.router.url
        : this.router.url.slice(0, queryParamsIndex);
    return baseUrl === url;
  }
}
