import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginForm } from '../models/login-form';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { Pageable } from '../models/pageable';
import { Post } from '../models/post';
import { Pagination } from '../models/pagination';
import { CategoryWithPosts } from '../models/category-with-posts';
import { PostsByCategories } from '../models/postsByCategories';
import { CommentForm } from '../models/comment-form';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  public addCommentToPost(
    comment: CommentForm,
    postId: number
  ): Observable<Comment> {
    return this.http.post<Comment>(
      `${environment.apiUrl}/api/comment/${postId}/addNewComment`,
      comment
    );
  }

  public getCommentsToPost(
    postId: number,
    pagination: Pagination
  ): Observable<Pageable<Comment>> {
    return this.http.post<Pageable<Comment>>(
      `${environment.apiUrl}/api/comment/${postId}/all/paginate`,
      pagination
    );
  }
}
