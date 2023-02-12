package com.backend.backend.controllers;

import com.backend.backend.dto.PaginationDto;
import com.backend.backend.models.Like;
import com.backend.backend.models.Post;
import com.backend.backend.models.User;
import com.backend.backend.payload.MessageResponse;
import com.backend.backend.repositories.LikeRepository;
import com.backend.backend.repositories.PostRepository;
import com.backend.backend.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/like")
public class LikeController {
    @Autowired
    PostRepository postRepository;

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/post/{postId}")
    public ResponseEntity<?> getLikesToPost(@PathVariable long postId) {
        Optional<Post> postOptional = this.postRepository.findById(postId);
        if(!postOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        List<Like> likes = this.likeRepository.findAllByPostOrderByCreatedAtDesc(postOptional.get());
        return ResponseEntity.ok().body(likes);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/post/{postId}/like")
    public ResponseEntity<?> addNewLike(@PathVariable long postId, Authentication authentication){
        Optional<Post> postOptional = this.postRepository.findById(postId);
        if(!postOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        User user = this.userRepository.findByEmail(authentication.getName());

        Like like = this.likeRepository.findAllByPostAndUser(postOptional.get(), user);
        if(like != null) {
            this.likeRepository.delete(like);
            return ResponseEntity.ok().body(new MessageResponse("Successfully unliked post"));
        }
        Like newLike = new Like();
        newLike.setPost(postOptional.get());
        newLike.setUser(user);
        this.likeRepository.save(newLike);

        return ResponseEntity.ok().body(new MessageResponse("Successfully liked post"));
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/user/likes")
    public ResponseEntity<?> getUserLikedPosts(Authentication authentication, @RequestBody @Valid PaginationDto paginationDto){
        User user = this.userRepository.findByEmail(authentication.getName());
        int page = paginationDto.getFirst() / paginationDto.getRows();
        Pageable pageable = PageRequest.of(page, paginationDto.getRows(), Sort.by("createdAt").descending());
        return ResponseEntity.ok().body(this.likeRepository.findAllByUser(user, pageable));
    }
}
