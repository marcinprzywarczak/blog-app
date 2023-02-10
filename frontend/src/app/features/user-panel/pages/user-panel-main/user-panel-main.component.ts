import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarServiceService } from '../../../../core/services/sidebar-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-panel-main',
  templateUrl: './user-panel-main.component.html',
  styleUrls: ['./user-panel-main.component.scss'],
})
export class UserPanelMainComponent implements OnInit, OnDestroy {
  changeMargin = false;
  sidebarWidthSubscription: Subscription;
  constructor(private sidebarService: SidebarServiceService) {}

  ngOnInit() {
    this.sidebarWidthSubscription =
      this.sidebarService.changeSidebarWidth.subscribe(() => {
        this.changeMargin = !this.changeMargin;
      });
  }

  ngOnDestroy() {
    if (this.sidebarWidthSubscription)
      this.sidebarWidthSubscription.unsubscribe();
  }
}
