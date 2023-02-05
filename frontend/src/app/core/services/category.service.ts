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
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/category`);
  }
}
