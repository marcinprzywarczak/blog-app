import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [NavbarComponent, ClickOutsideDirective],
  imports: [CommonModule, RouterModule, AvatarModule],
  exports: [NavbarComponent],
})
export class CoreModule {}
