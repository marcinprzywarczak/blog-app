package com.backend.backend.dto;

import com.backend.backend.validations.PasswordMatches;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

@PasswordMatches
public class RegisterUserDto {
    @NotBlank(message = "Name is required!")
    private String name;

    @NotBlank(message = "Password is required!")
    private String password;
    @NotBlank(message = "Password confirmation is required!")
    private String matchingPassword;

    @NotBlank(message = "Email is required!")
    @Email(message = "Email is wrong!")
    private String email;

    private MultipartFile avatar;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMatchingPassword() {
        return matchingPassword;
    }

    public void setMatchingPassword(String matchingPassword) {
        this.matchingPassword = matchingPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public MultipartFile getAvatar() {
        return avatar;
    }

    public void setAvatar(MultipartFile avatar) {
        this.avatar = avatar;
    }
}
