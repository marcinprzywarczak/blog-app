import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Post } from '../../../core/models/post';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() post: Post;
  faThumbs = faThumbsUp;

  click() {}
}
