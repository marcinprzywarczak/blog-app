import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './components/post-card/post-card.component';

@NgModule({
  declarations: [PostCardComponent],
  exports: [PostCardComponent],
  imports: [],
})
export class SharedModule {}
