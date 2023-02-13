import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../core/models/category';
import { CategoryService } from '../../../../core/services/category.service';
import { PostService } from '../../../../core/services/post.service';
import { AlertService } from '../../../../core/services/alert.service';
import { Router } from '@angular/router';
import { DropDownAnimation } from '../../../../core/animations/dropdown-animation';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss'],
  animations: [DropDownAnimation],
})
export class AddNewPostComponent implements OnInit {
  form: FormGroup;
  categories: Category[];
  mainPhoto: File;
  photos: { file: File; src: string | ArrayBuffer | null }[] = [
    { file: null as any, src: '' },
    { file: null as any, src: '' },
    { file: null as any, src: '' },
    { file: null as any, src: '' },
    { file: null as any, src: '' },
  ];
  mainPhotoSrc: string | ArrayBuffer | null = '';
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(255)]],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      categories: [null, [Validators.required]],
      content: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid || this.mainPhotoSrc === '') return;
    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('content', this.form.get('content')?.value);
    this.form.get('categories')?.value.forEach((x: any) => {
      formData.append('categories', x);
    });
    formData.append('mainPhoto', this.mainPhoto);
    this.photos.forEach((x) => {
      formData.append('photos[]', x.file);
    });

    this.postService.addPost(formData).subscribe({
      next: (res) => {
        this.router.navigate(['']);
        this.alertService.showSuccess('Your post was successfully added');
      },
      error: (err) => {
        this.alertService.showError('Error while adding your post');
      },
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
    const reader = new FileReader();
    reader.onload = (e) => (this.mainPhotoSrc = reader.result);
    reader.readAsDataURL(this.mainPhoto);
  }

  onChangePhoto(event: any) {
    const index = this.photos.findIndex((x) => x.src === '');
    if (index !== undefined) {
      this.photos[index].file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.photos[index].src = reader.result);
      reader.readAsDataURL(this.photos[index].file);
    }
  }

  deleteMainPhoto() {
    this.mainPhotoSrc = '';
  }

  deletePhoto(src: string | ArrayBuffer | null) {
    const index = this.photos.findIndex((x) => x.src === src);
    if (index !== undefined) {
      this.photos[index] = { file: null as any, src: '' };
    }
  }
}
