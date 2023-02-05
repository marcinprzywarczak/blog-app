import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../../../core/models/category';
import { CategoryService } from '../../../../core/services/category.service';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss'],
})
export class AddNewPostComponent implements OnInit {
  form: FormGroup;
  categories: Category[];
  mainPhoto: File;
  photos: File[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.form = this.formBuilder.group({
      title: [],
      description: [],
      categories: [],
      content: [],
    });
  }

  onSubmit() {
    console.log(this.form.value);
    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('content', this.form.get('content')?.value);
    this.form.get('categories')?.value.forEach((x: any) => {
      console.log(x);
      formData.append('categories', x);
    });
    formData.append('mainPhoto', this.mainPhoto);
    this.photos.forEach((x) => {
      formData.append('photos[]', x);
    });

    this.postService.addPost(formData).subscribe((res) => {
      console.log(res);
    });
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {},
    });
  }

  onChangeMainPhoto(event: any) {
    this.mainPhoto = event.target.files[0];
  }

  onChangePhoto(event: any) {
    console.log(event);
    this.photos.push(event.target.files[0]);
    console.log(this.photos);
  }
}
