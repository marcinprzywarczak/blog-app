package com.backend.backend.repositories;

import com.backend.backend.models.Category;
import com.backend.backend.models.Post;
import com.backend.backend.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAll(Pageable pageable);

    Page<Post> findAllByCategoriesIn(Set<Category> categories, Pageable pageable);

    Page<Post> findAllByUser(User user, Pageable pageable);

}