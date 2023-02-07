package com.backend.backend.validations.postSortField;
import com.backend.backend.dto.RegisterUserDto;
import com.backend.backend.validations.password.PasswordMatches;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.List;


public class PostSortFieldValidator
        implements ConstraintValidator<PostSortField, String> {

    @Override
    public void initialize(PostSortField constraintAnnotation) {
    }
    @Override
    public boolean isValid(String field, ConstraintValidatorContext context){
        List<String> availableOptions = Arrays.asList("createdAt", "title", "likes");
        return availableOptions.contains(field);
    }
}