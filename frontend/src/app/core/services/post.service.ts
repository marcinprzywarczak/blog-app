import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../models/login-form';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { Pageable } from '../models/pageable';
import { Post } from '../models/post';
import { Pagination } from '../models/pagination';
import { CategoryWithPosts } from '../models/category-with-posts';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getAllPosts(pagination: Pagination): Observable<Pageable<Post>> {
    return this.http.post<Pageable<Post>>(
      `${environment.apiUrl}/api/post`,
      pagination,
      {
        withCredentials: true,
      }
    );
  }

  public getMostPopularCategoriesWithPosts(): Observable<CategoryWithPosts[]> {
    return this.http.get<CategoryWithPosts[]>(
      `${environment.apiUrl}/api/category/mostPopular`
    );
  }
}