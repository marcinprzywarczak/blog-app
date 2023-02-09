package com.backend.backend.repositories;

import com.backend.backend.models.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);

    List<Category> findAllByOrderById();

    Set<Category> findAllById(Long[] ids);

    Page<Category> findAll(Pageable pageable);

    @Query(value = "select c from Category c join c.posts p group by (c) order by count(c) desc")
    Page<Category> findAllOrderByPostsCountDesc(Pageable pageable);

}