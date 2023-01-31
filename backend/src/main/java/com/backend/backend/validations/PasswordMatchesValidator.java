package com.backend.backend.validations;
import com.backend.backend.dto.RegisterUserDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


public class PasswordMatchesValidator
        implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(PasswordMatches constraintAnnotation) {
    }
    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context){
        RegisterUserDto user = (RegisterUserDto) obj;
        if(user.getPassword() == null || user.getMatchingPassword() == null)
            return false;
        return user.getPassword().equals(user.getMatchingPassword());
    }
}