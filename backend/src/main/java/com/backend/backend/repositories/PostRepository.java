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
    Page<Post> findAllByTitleContainingAndActiveIs(Pageable pageable, String search, boolean active);

    Page<Post> findAllByCategoriesInAndActiveIs(Set<Category> categories, Pageable pageable, boolean active);

    Page<Post> findAllByCategoriesInAndActiveIsAndUser(Set<Category> categories, Pageable pageable, boolean active, User user);
    Page<Post> findAllByActiveIsAndUser(Pageable pageable, boolean active, User user);

    Page<Post> findAllByCategoriesInAndUser(Set<Category> categories, Pageable pageable, User user);

    Page<Post> findAllByUser(User user, Pageable pageable);

    List<Post> findAllByUser(User user);

    Page<Post> findAllByActiveIs(Pageable pageable, boolean active);

    @Query(value = "select p from Post p left join p.likes l where p.active = true group by (p.id) order by count(l) desc")
    Page<Post> finaAllOrderByLikesCountDesc(Pageable pageable);

    @Query(value = "select p from Post p left join p.likes l where p.active = true group by (p.id) order by count(l) asc")
    Page<Post> finaAllOrderByLikesCountAsc(Pageable pageable);

    @Query(value = "select p from Post p left join p.likes l where p.active = true and p.title like  CONCAT('%',:title,'%') group by (p.id) order by count(l) asc")
    Page<Post> finaAllByTitleOrderByLikesCountAsc(Pageable pageable, @Param("title") String title);

    @Query(value = "select p from Post p left join p.likes l where p.active = true and p.title like  CONCAT('%',:title,'%') group by (p.id) order by count(l) desc")
    Page<Post> finaAllByTitleOrderByLikesCountDesc(Pageable pageable, @Param("title") String title);

}