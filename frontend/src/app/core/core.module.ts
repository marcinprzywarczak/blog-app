import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AvatarModule } from 'primeng/avatar';
import { TimeAgoPipe } from './pipes/TimeAgoPipe';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    ClickOutsideDirective,
    TimeAgoPipe,
    ClickStopPropagationDirective,
  ],
  imports: [CommonModule, RouterModule, AvatarModule],
  exports: [NavbarComponent, TimeAgoPipe, ClickStopPropagationDirective],
})
export class CoreModule {}
