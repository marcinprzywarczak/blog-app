package com.backend.backend.controllers;

import com.backend.backend.dto.NewCommentDto;
import com.backend.backend.dto.PaginationDto;
import com.backend.backend.models.Comment;
import com.backend.backend.models.Post;
import com.backend.backend.models.User;
import com.backend.backend.payload.MessageResponse;
import com.backend.backend.repositories.CommentRepository;
import com.backend.backend.repositories.PostRepository;
import com.backend.backend.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/{postId}/addNewComment")
    public ResponseEntity<?> addNewCommentToPost(Authentication authentication, @PathVariable(value = "postId") long id, @RequestBody @Valid NewCommentDto newCommentDto){
        User user = userRepository.findByEmail(authentication.getName());
        Optional<Post> postOptional = this.postRepository.findById(id);
        if(!postOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        Post post = postOptional.get();
        Comment comment = new Comment();
        comment.setTitle(newCommentDto.getTitle());
        comment.setDescription(newCommentDto.getDescription());
        comment.setLikes(0);
        comment.setPost(post);
        comment.setUser(user);
        this.commentRepository.save(comment);
        return ResponseEntity.ok().body(comment);
    }

    @PostMapping("/{postId}/all/paginate")
    public ResponseEntity<?> getCommentsToPost(Authentication authentication, @PathVariable(value = "postId") long id, @RequestBody @Valid PaginationDto paginationDto){
        Optional<Post> postOptional = this.postRepository.findById(id);
        if(!postOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        Post post = postOptional.get();
        int page = paginationDto.getFirst() / paginationDto.getRows();
        Pageable pageable = PageRequest.of(page, paginationDto.getRows(), Sort.by("createdAt").descending());
        Page<Comment> comments = this.commentRepository.findAllByPost(post, pageable);


        return ResponseEntity.ok().body(comments);
    }
}
