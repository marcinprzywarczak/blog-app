import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/models/category';

@Component({
  selector: 'app-post-categories',
  templateUrl: './post-categories.component.html',
  styleUrls: ['./post-categories.component.scss'],
})
export class PostCategoriesComponent implements OnInit {
  categories: Category[];
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
    });
  }
}
