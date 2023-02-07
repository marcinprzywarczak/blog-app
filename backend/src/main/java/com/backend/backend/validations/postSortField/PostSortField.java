package com.backend.backend.validations.postSortField;

import com.backend.backend.validations.password.PasswordMatchesValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;


@Target({TYPE, FIELD,ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = PostSortFieldValidator.class)
@Documented
public @interface PostSortField {
    String message() default "Incorrect sort field name.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
