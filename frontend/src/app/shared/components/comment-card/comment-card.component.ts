import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../core/models/comment';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
  @Input() comment: Comment;
  constructor() {}

  ngOnInit() {}
}
