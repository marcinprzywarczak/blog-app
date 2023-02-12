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
import { Like } from '../models/like';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}

  public addNewLike(postId: number) {
    return this.http.post(
      `${environment.apiUrl}/api/like/post/${postId}/like`,
      {}
    );
  }

  public getLikesToPost(postId: number): Observable<Like[]> {
    return this.http.get<Like[]>(
      `${environment.apiUrl}/api/like/post/${postId}`
    );
  }

  public getUserLikedPosts(pagination: Pagination): Observable<Pageable<Like>> {
    return this.http.post<Pageable<Like>>(
      `${environment.apiUrl}/api/like/user/likes`,
      pagination
    );
  }
}
