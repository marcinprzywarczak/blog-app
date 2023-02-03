package com.backend.backend.controllers;

import com.backend.backend.dto.NewCommentDto;
import com.backend.backend.models.Comment;
import com.backend.backend.models.Post;
import com.backend.backend.models.User;
import com.backend.backend.payload.MessageResponse;
import com.backend.backend.repositories.CommentRepository;
import com.backend.backend.repositories.PostRepository;
import com.backend.backend.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{postId}/addNewComment")
    public ResponseEntity<?> addNewCommentToPost(Authentication authentication, @PathVariable(value = "postId") long id, @RequestBody @Valid NewCommentDto newCommentDto){
        User user = userRepository.findByEmail(authentication.getName());
        Post post = this.postRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: invalid post"));
        Comment comment = new Comment();
        comment.setTitle(newCommentDto.getTitle());
        comment.setDescription(newCommentDto.getDescription());
        comment.setRate(newCommentDto.getRate());
        comment.setLikes(0);
        comment.setPost(post);
        comment.setUser(user);
        this.commentRepository.save(comment);
        return ResponseEntity.ok().body(new MessageResponse("Successfully added comment"));
    }
}
