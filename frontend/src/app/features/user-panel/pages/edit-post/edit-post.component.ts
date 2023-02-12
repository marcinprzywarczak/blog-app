import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../core/models/category';
import { CategoryService } from '../../../../core/services/category.service';
import { PostService } from '../../../../core/services/post.service';
import { AlertService } from '../../../../core/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../../core/models/post';
import { map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
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
  postId: number;
  post: Post;
  photoChanged = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(255)]],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      categories: [null, [Validators.required]],
      content: [null, [Validators.required]],
    });
    this.postId = this.route.snapshot.params['id'];
    this.getCategories();
    this.getPost();
  }

  onSubmit() {
    console.log(this.form);
    this.submitted = true;
    if (this.form.invalid || this.mainPhotoSrc === '') return;
    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('content', this.form.get('content')?.value);
    formData.append('photoChanged', this.photoChanged ? 'true' : 'false');
    this.form.get('categories')?.value.forEach((x: any) => {
      formData.append('categories', x);
    });
    formData.append('mainPhoto', this.mainPhoto);
    this.photos.forEach((x) => {
      formData.append('photos[]', x.file);
    });

    this.postService.updatePost(formData, this.postId).subscribe({
      next: (res) => {
        this.alertService.showSuccess('Your post was successfully updated');
        this.router.navigate(['/user/posts']);
      },
      error: (err) => {
        this.alertService.showError('Error while updating post');
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
    this.photoChanged = true;
    this.mainPhoto = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => (this.mainPhotoSrc = reader.result);
    reader.readAsDataURL(this.mainPhoto);
  }

  onChangePhoto(event: any) {
    this.photoChanged = true;

    const index = this.photos.findIndex((x) => x.src === '');
    if (index !== undefined) {
      this.photos[index].file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.photos[index].src = reader.result);
      reader.readAsDataURL(this.photos[index].file);
    }
  }

  deleteMainPhoto() {
    this.photoChanged = true;

    this.mainPhotoSrc = '';
  }

  deletePhoto(src: string | ArrayBuffer | null) {
    this.photoChanged = true;

    const index = this.photos.findIndex((x) => x.src === src);
    if (index !== undefined) {
      this.photos[index] = { file: null as any, src: '' };
    }
  }

  getPost() {
    this.postService
      .getPostToEdit(this.postId)
      .pipe(
        tap((x) => {
          this.post = x;
        }),
        map((x) => {
          return {
            title: x.title,
            description: x.description,
            content: x.content,
            categories: x.categories.map((x) => {
              return x.id;
            }),
          };
        })
      )
      .subscribe({
        next: (value) => {
          this.form.setValue(value);
          this.setPhotos();
        },
        error: (err) => {},
      });
  }

  setPhotos() {
    this.photos = [];
    let index = 0;
    this.http
      .get(this.post.mainPhotoUrl, { responseType: 'blob' })
      .subscribe((res) => {
        this.mainPhoto = new File([res], this.post.mainPhotoName);
      });
    this.mainPhotoSrc = this.post.mainPhotoUrl;

    this.post.photos.forEach((photo) => {
      index++;
      this.http
        .get(photo.photoUrl, { responseType: 'blob' })
        .subscribe((res) => {
          this.photos.unshift({
            file: new File([res], photo.photoName),
            src: photo.photoUrl,
          });
        });
    });

    for (let i = index; i < 5; i++) {
      this.photos.push({
        file: null as any,
        src: '',
      });
    }
  }
}
