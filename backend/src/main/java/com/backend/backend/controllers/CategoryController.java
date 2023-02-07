package com.backend.backend.controllers;

import com.backend.backend.dto.CategoryWithPostsDto;
import com.backend.backend.models.Category;
import com.backend.backend.repositories.CategoryRepository;
import com.backend.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;


    @GetMapping
    public List<Category> getCategories(){
        return this.categoryRepository.findAllByOrderById();
    }

    @GetMapping("/mostPopular")
    public List<CategoryWithPostsDto> getMostPopularCategories(){
        Pageable pageable = PageRequest.of(0, 3);

        List<Category> categories = this.categoryRepository.findAllOrderByPostsCountDesc(pageable).getContent();

        List<CategoryWithPostsDto> categoryWithPostsDto = categories.stream().map(
                category -> new CategoryWithPostsDto(
                        category.getId(),
                        category.getName(),
                        category.getPosts().stream().toList().subList(0, Math.min(category.getPosts().size(), 6)),
                        category.getPosts().size()
                )
        ).toList();

        return categoryWithPostsDto;
    }
}
