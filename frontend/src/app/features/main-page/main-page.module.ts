import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '../../shared/shared.module';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    SharedModule,
    CarouselModule,
    SkeletonModule,
  ],
})
export class MainPageModule {}
