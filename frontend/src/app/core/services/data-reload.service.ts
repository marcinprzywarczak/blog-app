import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class DataReloadService {
  newComment = new Subject<boolean>();
  constructor() {}

  triggerNewComment() {
    this.newComment.next(true);
  }
}
