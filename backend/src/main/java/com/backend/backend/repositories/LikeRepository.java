package com.backend.backend.repositories;

import com.backend.backend.models.Like;
import com.backend.backend.models.Post;
import com.backend.backend.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findAllByPostOrderByCreatedAtDesc(Post post);
    Like findAllByPostAndUser(Post post, User user);

    Page<Like> findAllByUser(User user, Pageable pageable);
}