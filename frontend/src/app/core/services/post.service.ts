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
import { PaginationWithSort } from '../models/paginationWithSort';
import { PaginationSortSearch } from '../models/paginationSortSearch';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getAllPosts(
    paginationWithSort: PaginationSortSearch
  ): Observable<Pageable<Post>> {
    return this.http.post<Pageable<Post>>(
      `${environment.apiUrl}/api/post`,
      paginationWithSort,
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

  public getPostByCategories(
    postByCategories: PostsByCategories
  ): Observable<Pageable<Post>> {
    return this.http.post<Pageable<Post>>(
      `${environment.apiUrl}/api/post/categories`,
      postByCategories
    );
  }

  public addPost(addPost: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(`${environment.apiUrl}/api/post/add`, addPost, {
      withCredentials: true,
      headers: headers,
    });
  }

  public getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/api/post/${id}`);
  }
}
