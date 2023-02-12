package com.backend.backend.permissions;

import com.backend.backend.models.Post;
import com.backend.backend.models.User;
import com.backend.backend.repositories.PostRepository;
import com.backend.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("postSecurity")
public class PostSecurity {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    public boolean isAuthorOfPost(Authentication authentication, Long postId) {
        User user = this.userRepository.findByEmail(authentication.getName());
        Optional<Post> optionalPost = this.postRepository.findById(postId);
        if(optionalPost.isEmpty()) return false;
        return optionalPost.get().getUser().equals(user);
    }
}
