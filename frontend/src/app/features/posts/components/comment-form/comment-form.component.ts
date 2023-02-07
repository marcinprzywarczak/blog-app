import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user';
import { CommentService } from '../../../../core/services/comment.service';
import { CommentForm } from '../../../../core/models/comment-form';
import { DataReloadService } from '../../../../core/services/data-reload.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() postId: number;
  form: FormGroup;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commentService: CommentService,
    private dataReloadService: DataReloadService
  ) {}

  ngOnInit() {
    if (this.userService.getIsLogged()) this.user = this.userService.getUser();
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  submitForm() {
    if (this.form.invalid) return;
    const commentForm: CommentForm = this.form.value;
    this.commentService.addCommentToPost(commentForm, this.postId).subscribe({
      next: (res) => {
        this.form.reset();
        this.dataReloadService.triggerNewComment();
      },
      error: (err) => {},
    });
  }
}
