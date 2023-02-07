package com.backend.backend.repositories;

import com.backend.backend.models.Category;
import com.backend.backend.models.Post;
import com.backend.backend.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAllByTitleContaining(Pageable pageable, String search);

    Page<Post> findAllByCategoriesIn(Set<Category> categories, Pageable pageable);

    Page<Post> findAllByUser(User user, Pageable pageable);

    @Query(value = "select p from Post p left join p.likes l group by (p.id) order by count(l) desc")
    Page<Post> finaAllOrderByLikesCountDesc(Pageable pageable);

    @Query(value = "select p from Post p left join p.likes l group by (p.id) order by count(l) asc")
    Page<Post> finaAllOrderByLikesCountAsc(Pageable pageable);

    @Query(value = "select p from Post p left join p.likes l where p.title like  CONCAT('%',:title,'%') group by (p.id) order by count(l) asc")
    Page<Post> finaAllByTitleOrderByLikesCountAsc(Pageable pageable, @Param("title") String title);

    @Query(value = "select p from Post p left join p.likes l where p.title like  CONCAT('%',:title,'%') group by (p.id) order by count(l) desc")
    Page<Post> finaAllByTitleOrderByLikesCountDesc(Pageable pageable, @Param("title") String title);

}