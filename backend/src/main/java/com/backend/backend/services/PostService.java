package com.backend.backend.services;

import com.backend.backend.configs.files.FilesStorageService;
import com.backend.backend.dto.NewPostDto;
import com.backend.backend.dto.PaginationSortSearchPostDto;
import com.backend.backend.dto.UpdatePostDto;
import com.backend.backend.models.Category;
import com.backend.backend.models.Photo;
import com.backend.backend.models.Post;
import com.backend.backend.models.User;
import com.backend.backend.repositories.CategoryRepository;
import com.backend.backend.repositories.PhotoRepository;
import com.backend.backend.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class PostService {
    @Value("${backend.app.serverUrl}")
    private String serverUrl;

    @Autowired
    FilesStorageService storageService;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    PhotoRepository photoRepository;

    public Post addNewPost(User user, NewPostDto newPostDto, MultipartFile mainPhoto, MultipartFile[] photos){

        Set<Category> categories = new HashSet<>();
        for(Long categoryId: newPostDto.getCategories()) {
            Category category = this.categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Error: category not found"));
            categories.add(category);
        }
        String fileName = storageService.save(mainPhoto);
        String fileUrl = this.serverUrl + "api/photo/" + fileName;

        Post post = new Post();

        post.setTitle(newPostDto.getTitle());
        post.setDescription(newPostDto.getDescription());
        post.setContent(newPostDto.getContent());
        post.setUser(user);
        post.setCategories(categories);
        post.setMainPhotoName(fileName);
        post.setMainPhotoUrl(fileUrl);
        post.setActive(true);
        post.setVisitCounter(0);
        Post savePost = this.postRepository.save(post);
        if(photos != null) {
            Set<Photo> photoSet = this.getPhotos(photos, savePost);

            savePost.setPhotos(photoSet);
        }

        return savePost;
    }


    public Post updatePost(long id, UpdatePostDto updatePostDto, MultipartFile mainPhoto, MultipartFile[] photos){

        Optional<Post> optionalPost = this.postRepository.findById(id);
        if(optionalPost.isEmpty())
            return null;
        Post post = optionalPost.get();
        if(updatePostDto.isPhotoChanged()) {
            if(!post.getMainPhotoName().equals("default_photo.png")) {
                this.storageService.delete(post.getMainPhotoName());
            }
            String fileName = storageService.save(mainPhoto);
            String fileUrl = this.serverUrl + "api/photo/" + fileName;
            post.setMainPhotoName(fileName);
            post.setMainPhotoUrl(fileUrl);

            if(post.getPhotos() != null){
                for(Photo photo: post.getPhotos()) {
                    this.storageService.delete(photo.getPhotoName());
                    this.photoRepository.delete(photo);
                }
            }

            if(photos != null) {
                Set<Photo> photoSet = this.getPhotos(photos, post);
                post.setPhotos(photoSet);
            }
        }

        Set<Category> categories = new HashSet<>();
        for(Long categoryId: updatePostDto.getCategories()) {
            Category category = this.categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Error: category not found"));
            categories.add(category);
        }

        post.setTitle(updatePostDto.getTitle());
        post.setDescription(updatePostDto.getDescription());
        post.setContent(updatePostDto.getContent());
        post.setCategories(categories);
        return this.postRepository.save(post);

    }

    public ResponseEntity<Page<Post>> getAllPostPaginationSortAndSearch(PaginationSortSearchPostDto paginationSortSearchDto){
        int page = paginationSortSearchDto.getFirst() / paginationSortSearchDto.getRows();
        Sort.Order order = new Sort.Order(Objects.equals(paginationSortSearchDto.getDirection(), "DESC") ? Sort.Direction.DESC : Sort.Direction.ASC, paginationSortSearchDto.getField());
        Pageable pageable = PageRequest.of(page, paginationSortSearchDto.getRows(), Sort.by(order));
        if(Objects.equals(paginationSortSearchDto.getField(), "likes")) {
            if(Objects.equals(paginationSortSearchDto.getDirection(), "DESC")) {
                if(paginationSortSearchDto.getSearch() != null) {
                    return ResponseEntity.ok().body(this.postRepository.finaAllByTitleOrderByLikesCountDesc(PageRequest.of(page, paginationSortSearchDto.getRows()), paginationSortSearchDto.getSearch()));
                } else {
                    return ResponseEntity.ok().body(this.postRepository.finaAllOrderByLikesCountDesc(PageRequest.of(page, paginationSortSearchDto.getRows())));
                }
            } else {
                if(paginationSortSearchDto.getSearch() != null) {
                    return ResponseEntity.ok().body(this.postRepository.finaAllByTitleOrderByLikesCountAsc(PageRequest.of(page, paginationSortSearchDto.getRows()), paginationSortSearchDto.getSearch()));
                } else {
                    return ResponseEntity.ok().body(this.postRepository.finaAllOrderByLikesCountAsc(PageRequest.of(page, paginationSortSearchDto.getRows())));
                }
            }
        } else {
            if(paginationSortSearchDto.getSearch() != null) {
                return ResponseEntity.ok().body(this.postRepository.findAllByTitleContainingAndActiveIs(pageable, paginationSortSearchDto.getSearch(), true));
            } else {
                return ResponseEntity.ok().body(this.postRepository.findAllByActiveIs(pageable, true));
            }
        }
    }


    public Set<Photo> getPhotos(MultipartFile[] photos, Post post){
        Set<Photo> photoSet = new HashSet<>();
        String fileName = "";
        String fileUrl = "";
        for(MultipartFile photo:photos){
            fileName = storageService.save(photo);
            fileUrl = this.serverUrl + "api/photo/" + fileName;
            Photo photo1 = new Photo();
            photo1.setPhotoName(fileName);
            photo1.setPhotoUrl(fileUrl);
            photo1.setPost(post);
            photoSet.add(photoRepository.save(photo1));
        }

        return photoSet;
    }
}
