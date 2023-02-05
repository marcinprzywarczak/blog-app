package com.backend.backend.services;

import com.backend.backend.configs.files.FilesStorageService;
import com.backend.backend.dto.NewPostDto;
import com.backend.backend.models.Category;
import com.backend.backend.models.Photo;
import com.backend.backend.models.Post;
import com.backend.backend.models.User;
import com.backend.backend.repositories.CategoryRepository;
import com.backend.backend.repositories.PhotoRepository;
import com.backend.backend.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class PostService {
    @Value("${backend.app.serverUrl}")
    private String serverUrl;

    @Autowired
    FilesStorageService storageService;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    PhotoRepository photoRepository;

    public Post addNewPost(User user, NewPostDto newPostDto, MultipartFile mainPhoto, MultipartFile[] photos){

        Set<Category> categories = new HashSet<>();
        for(Long categoryId: newPostDto.getCategories()) {
            Category category = this.categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Error: category not found"));
            categories.add(category);
        }
        String fileName = storageService.save(mainPhoto);
        String fileUrl = this.serverUrl + "api/photo/" + fileName;

        Post post = new Post();

        post.setTitle(newPostDto.getTitle());
        post.setDescription(newPostDto.getDescription());
        post.setContent(newPostDto.getContent());
        post.setUser(user);
        post.setCategories(categories);
        post.setMainPhotoName(fileName);
        post.setMainPhotoUrl(fileUrl);
        post.setActive(true);
        post.setVisitCounter(0);
        Post savePost = this.postRepository.save(post);

        Set<Photo> photoSet = new HashSet<>();
        for(MultipartFile photo:photos){
            fileName = storageService.save(photo);
            fileUrl = this.serverUrl + "api/photo/" + fileName;
            Photo photo1 = new Photo();
            photo1.setPhotoName(fileName);
            photo1.setPhotoUrl(fileUrl);
            photo1.setPost(savePost);
            photoSet.add(photoRepository.save(photo1));
        }

        savePost.setPhotos(photoSet);
        return savePost;
    }
}
