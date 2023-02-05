package com.backend.backend;

import com.backend.backend.models.Category;
import com.backend.backend.models.Post;
import com.backend.backend.models.Role;
import com.backend.backend.models.User;
import com.backend.backend.repositories.CategoryRepository;
import com.backend.backend.repositories.PostRepository;
import com.backend.backend.repositories.RoleRepository;
import com.backend.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class DataLoader implements ApplicationRunner {
    @Value("${backend.app.serverUrl}")
    private String serverUrl;
    @Value("${backend.app.adminPassword}")
    private String password;

    private UserRepository userRepository;

    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;
    
    private final PostRepository postRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public DataLoader(UserRepository userRepository, RoleRepository roleRepository, CategoryRepository categoryRepository,
                      PostRepository postRepository
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.categoryRepository = categoryRepository;
        this.postRepository = postRepository;
    }

    //add admin user if not already exists
    public void run(ApplicationArguments args) {
        System.out.println("runner");
        this.addRoles();
        this.addCategories();
        if(userRepository.findByEmail("admin@test.com") != null) {
            if(this.postRepository.findAll().size() == 0)
                this.createRandomPosts();
            return;
        }
        else {
            String avatar = this.serverUrl + "api/photo/default_avatar.png";
            User user = new User();
            user.setName("admin");
            user.setAvatarUrl(avatar);
            user.setAvatarName("default_avatar.png");
            user.setPassword(passwordEncoder.encode(password));
            user.setEmail("admin@test.com");
            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseThrow(() -> new RuntimeException("Error: Role not found"));
            roles.add(adminRole);
            user.setRoles(roles);
            userRepository.save(user);
            if(this.postRepository.findAll().size() == 0)
                this.createRandomPosts();
        }


    }

    public void addRoles() {
        Optional<Role> role = this.roleRepository.findByName("ROLE_ADMIN");
        if(!role.isPresent()) {
            Role addRole = new Role();
            addRole.setName("ROLE_ADMIN");
            this.roleRepository.save(addRole);
        }
        role = this.roleRepository.findByName("ROLE_USER");
        if(!role.isPresent()) {
            Role addRole = new Role();
            addRole.setName("ROLE_USER");
            this.roleRepository.save(addRole);
        }
    }

    public void addCategories() {
        String[] categories = {"travels", "finances", "technologies", "cooking", "programming", "mechanization", "health&fitness", "fashion", "DIY", "photography"};
        for (String category:categories){
            if(this.categoryRepository.findByName(category).isEmpty())
            {
                Category category1 = new Category();
                category1.setName(category);
                this.categoryRepository.save(category1);
            }
        }
    }
    
    public void createRandomPosts() {
        List<Category> categories = this.categoryRepository.findAll();
        List<User> users = this.userRepository.findAll();
        String photo = this.serverUrl + "api/photo/default_avatar.png";
        String photoName = "default_photo.png";
        for(int i = 0; i < 100; i++) {

            int categoryId = ThreadLocalRandom.current().nextInt(0, categories.size());
            int categoryId2 = ThreadLocalRandom.current().nextInt(0, categories.size());
            System.out.println(i + ";" + categoryId + ";" + categoryId2);
            Set<Category> categorySet = new HashSet<>();
            categorySet.add(categories.get(categoryId));
            categorySet.add(categories.get(categoryId2));
            Post post = new Post();
            post.setTitle("Test post number" + i);
            post.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in egestas elit, id consectetur urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed erat ultricies, hendrerit magna sed, tempus neque. Suspendisse ut maximus diam. Integer ac nisi eu nibh cursus aliquam. Suspendisse potenti. Aliquam facilisis auctor lobortis.");
            post.setContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in egestas elit, id consectetur urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed erat ultricies, hendrerit magna sed, tempus neque. Suspendisse ut maximus diam. Integer ac nisi eu nibh cursus aliquam. Suspendisse potenti. Aliquam facilisis auctor lobortis.");
            post.setUser(users.get(0));
            post.setCategories(categorySet);
            post.setMainPhotoName(photoName);
            post.setMainPhotoUrl(photo);
            post.setActive(true);
            post.setVisitCounter(0);
            this.postRepository.save(post);
        }
    }
}
