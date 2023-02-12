package com.backend.backend.controllers;

import com.backend.backend.dto.*;
import com.backend.backend.exceptions.UserNotFoundException;
import com.backend.backend.models.Category;
import com.backend.backend.models.Like;
import com.backend.backend.models.Post;
import com.backend.backend.models.User;
import com.backend.backend.payload.MessageResponse;
import com.backend.backend.repositories.CategoryRepository;
import com.backend.backend.repositories.LikeRepository;
import com.backend.backend.repositories.PostRepository;
import com.backend.backend.repositories.UserRepository;
import com.backend.backend.services.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.util.*;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostService postService;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    LikeRepository likeRepository;

    @PostMapping
    public ResponseEntity<?> getAll(@RequestBody @Valid PaginationSortSearchPostDto paginationSortSearchDto) {
        List<String> availableOptions = Arrays.asList("createdAt", "title", "likes");
        if(!availableOptions.contains(paginationSortSearchDto.getField())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid field argument"));
        }
        return this.postService.getAllPostPaginationSortAndSearch(paginationSortSearchDto);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Post addPost(Authentication authentication, @Valid NewPostDto newPostDto, @RequestParam(value = "mainPhoto", required = true)MultipartFile mainPhoto, @RequestParam(value = "photos[]", required = false) MultipartFile[] photos) {
        User user = userRepository.findByEmail(authentication.getName());
        return this.postService.addNewPost(user, newPostDto, mainPhoto, photos);
    }

    @PreAuthorize("isAuthenticated() and @postSecurity.isAuthorOfPost(authentication, #id)")
    @PutMapping(value = "/{id}/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Post updatePost(@PathVariable long id, Authentication authentication, @Valid UpdatePostDto updatePostDto, @RequestParam(value = "mainPhoto", required = true)MultipartFile mainPhoto, @RequestParam(value = "photos[]", required = false) MultipartFile[] photos) {
        User user = userRepository.findByEmail(authentication.getName());
        return this.postService.updatePost(id, updatePostDto, mainPhoto, photos);
    }

    @PostMapping("/categories")
    public Page<Post> getPostsByCategories(@RequestBody @Valid PostByCategoriesDto postByCategoriesDto) {
        int page = postByCategoriesDto.getFirst() / postByCategoriesDto.getRows();
        Pageable pageable = PageRequest.of(page, postByCategoriesDto.getRows(), Sort.by("createdAt").descending());
        List<Category> categories = this.categoryRepository.findAllById(postByCategoriesDto.getCategoryIds());
        return this.postRepository.findAllByCategoriesInAndActiveIs(new HashSet<>(categories), pageable, true);

    }


    @PreAuthorize("isAuthenticated()")
    @PostMapping("/user")
    public ResponseEntity<?> getPostsByUser(@RequestBody @Valid PostByUserDto postByUserDto) {
        int page = postByUserDto.getFirst() / postByUserDto.getRows();
        Pageable pageable = PageRequest.of(page, postByUserDto.getRows(), Sort.by("createdAt").descending());
        User user = this.userRepository.findById(postByUserDto.getUserId()).orElseThrow(() -> new UserNotFoundException("User not found"));
        return ResponseEntity.ok()
                .body(this.postRepository.findAllByUser(user, pageable));
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/userPosts")
    public ResponseEntity<?> getUserPosts(Authentication authentication, @RequestBody @Valid AngularLazyLoadDto angularLazyLoadDto) {
        int page = (angularLazyLoadDto.getFirst() + 1) / angularLazyLoadDto.getRows();
        Pageable pageable = PageRequest.of(page, angularLazyLoadDto.getRows(), Sort.by(angularLazyLoadDto.getSortOrder() == 1 ? Sort.Direction.ASC : Sort.Direction.DESC, angularLazyLoadDto.getSortField()));
        User user = userRepository.findByEmail(authentication.getName());
        if(angularLazyLoadDto.getFilters().get("categories") != null && angularLazyLoadDto.getFilters().get("categories").get(0).getValue() != null) {
            List<Long> categoryIds = new ArrayList<>();
            categoryIds.add(Long.parseLong(String.valueOf(angularLazyLoadDto.getFilters().get("categories").get(0).getValue())));
            List<Category> categories = this.categoryRepository.findAllById(categoryIds);
            if(angularLazyLoadDto.getFilters().get("active") != null) {
                if(angularLazyLoadDto.getFilters().get("active").get(0).getValue() != null) {
                    return ResponseEntity.ok().body(this.postRepository.findAllByCategoriesInAndActiveIsAndUser(new HashSet<>(categories), pageable, (Boolean) angularLazyLoadDto.getFilters().get("active").get(0).getValue(), user));
                }
                else {
                    return ResponseEntity.ok().body(this.postRepository.findAllByCategoriesInAndUser(new HashSet<>(categories), pageable, user));
                }
            } else {
                return ResponseEntity.ok().body(this.postRepository.findAllByCategoriesInAndUser(new HashSet<>(categories), pageable, user));
            }

        } else if(angularLazyLoadDto.getFilters().get("active") != null) {
            if(angularLazyLoadDto.getFilters().get("active").get(0).getValue() != null) {
                return ResponseEntity.ok().body(this.postRepository.findAllByActiveIsAndUser(pageable, (Boolean) angularLazyLoadDto.getFilters().get("active").get(0).getValue(), user));
            } else {
                return ResponseEntity.ok()
                        .body(this.postRepository.findAllByUser(user, pageable));
            }
        }

        return ResponseEntity.ok()
                .body(this.postRepository.findAllByUser(user, pageable));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable long id, Authentication authentication) {
        Optional<Post> post = this.postRepository.findById(id);
        if(post.isPresent() && post.get().isActive()){
            if(authentication != null) {
                User user = this.userRepository.findByEmail(authentication.getName());
                Like like = this.likeRepository.findAllByPostAndUser(post.get(), user);
                post.get().setLikedByUser(like != null);
            } else {
                post.get().setLikedByUser(false);
            }

            return ResponseEntity.ok().body(post.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PreAuthorize("isAuthenticated() and @postSecurity.isAuthorOfPost(authentication, #id)")
    @GetMapping("/edit/{id}")
    public ResponseEntity<?> getPostToEdit(@PathVariable long id, Authentication authentication) {
        Optional<Post> post = this.postRepository.findById(id);
        if(post.isPresent()) {
            return ResponseEntity.ok().body(post.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PreAuthorize("isAuthenticated() and @postSecurity.isAuthorOfPost(authentication, #id)")
    @PutMapping("/changeActive/{id}")
    public ResponseEntity<?> updatePostActive(@PathVariable long id, Authentication authentication) {
        Optional<Post> optionalPost = this.postRepository.findById(id);
        if(optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setActive(!post.isActive());
            return ResponseEntity.ok().body(this.postRepository.save(post));
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
