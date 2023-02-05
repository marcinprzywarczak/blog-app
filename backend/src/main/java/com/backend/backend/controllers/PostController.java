package com.backend.backend.controllers;

import com.backend.backend.dto.NewPostDto;
import com.backend.backend.dto.PaginationDto;
import com.backend.backend.dto.PostByCategoriesDto;
import com.backend.backend.dto.PostByUserDto;
import com.backend.backend.exceptions.UserNotFoundException;
import com.backend.backend.models.Category;
import com.backend.backend.models.Post;
import com.backend.backend.models.User;
import com.backend.backend.repositories.CategoryRepository;
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

    @PostMapping
    public Page<Post> getAll(@RequestBody @Valid PaginationDto paginationDto){
        int page = paginationDto.getFirst() / paginationDto.getRows();
        Pageable pageable = PageRequest.of(page, paginationDto.getRows(), Sort.by("createdAt").descending());
        return this.postRepository.findAll(pageable);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Post addPost(Authentication authentication, @Valid NewPostDto newPostDto, @RequestParam(value = "mainPhoto", required = true)MultipartFile mainPhoto, @RequestParam(value = "photos[]", required = true) MultipartFile[] photos) {
        User user = userRepository.findByEmail(authentication.getName());
        return this.postService.addNewPost(user, newPostDto, mainPhoto, photos);
    }

    @PostMapping("/categories")
    public Page<Post> getPostsByCategories(@RequestBody @Valid PostByCategoriesDto postByCategoriesDto) {
        int page = postByCategoriesDto.getFirst() / postByCategoriesDto.getRows();
        Pageable pageable = PageRequest.of(page, postByCategoriesDto.getRows(), Sort.by("createdAt").descending());
        List<Category> categories = this.categoryRepository.findAllById(postByCategoriesDto.getCategoryIds());
        return this.postRepository.findAllByCategoriesIn(new HashSet<>(categories), pageable);
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


    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable long id) {
        Optional<Post> post = this.postRepository.findById(id);
        if(post.isPresent()){
            return ResponseEntity.ok().body(post.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
