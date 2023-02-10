import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarServiceService {
  changeSidebarWidth = new Subject<boolean>();
  constructor() {}

  triggerSidebarWidth() {
    this.changeSidebarWidth.next(true);
  }
}
