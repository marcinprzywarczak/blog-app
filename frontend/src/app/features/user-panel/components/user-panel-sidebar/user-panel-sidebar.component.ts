import { Component, ElementRef, ViewChild } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import {
  faArrowLeft,
  faBarsStaggered,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { SidebarAnimation } from '../../../../core/animations/sidebar-animation';
import { OpacityAnimation } from '../../../../core/animations/opacity-animation';
import { SidebarLinks } from '../../../../core/constans/sidebar-links';
import { SidebarServiceService } from '../../../../core/services/sidebar-service.service';

@Component({
  selector: 'app-user-panel-sidebar',
  templateUrl: './user-panel-sidebar.component.html',
  styleUrls: ['./user-panel-sidebar.component.scss'],
  animations: [SidebarAnimation, OpacityAnimation],
})
export class UserPanelSidebarComponent {
  @ViewChild('hideSidebarDesktopIcon', { read: ElementRef })
  sidebarIcon: ElementRef;
  faBarsIcon = faBarsStaggered;
  faMarkIcon = faXmark;
  activeSidebar = false;
  links = SidebarLinks;
  hideSidebarIcon = faArrowLeft;
  hideDesktopSidebar = false;

  constructor(private sidebarService: SidebarServiceService) {}

  clickSidebarButton() {
    this.activeSidebar = true;
    // document.querySelector('#userPanelContent')!.classList.add('bg-gray-600');
  }

  hideSidebar() {
    this.activeSidebar = false;
  }

  async hideSidebarDesktop() {
    this.sidebarIcon.nativeElement.classList.toggle('rotate-180');

    this.hideDesktopSidebar = !this.hideDesktopSidebar;
    this.sidebarService.triggerSidebarWidth();
  }
}
