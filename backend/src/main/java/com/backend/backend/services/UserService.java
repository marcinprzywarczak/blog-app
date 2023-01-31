package com.backend.backend.services;

import com.backend.backend.configs.files.FilesStorageService;
import com.backend.backend.dto.LoginDto;
import com.backend.backend.dto.RegisterUserDto;
import com.backend.backend.exceptions.UserAlreadyExistException;
import com.backend.backend.models.Role;
import com.backend.backend.models.User;
import com.backend.backend.payload.MessageResponse;
import com.backend.backend.repositories.RoleRepository;
import com.backend.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import jdk.jfr.Registered;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class UserService {
    @Value("${backend.app.serverUrl}")
    private String serverUrl;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    FilesStorageService storageService;

    private boolean emailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    public boolean checkUserCredentials(LoginDto loginDto) {
        User user = this.userRepository.findByEmail(loginDto.getLogin());
        return this.passwordEncoder.matches(loginDto.getPassword(), user.getPassword());
    }

    public User registerNewUserAccount(RegisterUserDto userDto) throws UserAlreadyExistException {
        if (emailExists(userDto.getEmail())) {
            throw new UserAlreadyExistException("There is an account with that email address: "
                    + userDto.getEmail());
        }
        String avatar;
        if(userDto.getAvatar() != null) {
            String fileName = storageService.save(userDto.getAvatar());
            avatar = this.serverUrl + "api/photo/" + fileName;
        } else {
            avatar = this.serverUrl + "api/photo/default_avatar.png";
        }



        User user = new User();
        user.setName(userDto.getName());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setEmail(userDto.getEmail());
        user.setAvatarUrl(avatar);
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new RuntimeException("Error: Role not found"));
        roles.add(userRole);
        user.setRoles(roles);
        return userRepository.save(user);
    }
}
