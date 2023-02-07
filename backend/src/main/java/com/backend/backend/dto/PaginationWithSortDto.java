package com.backend.backend.dto;

import com.backend.backend.validations.postSortField.PostSortField;
import jakarta.validation.constraints.NotBlank;

public class PaginationWithSortDto extends PaginationDto {
    @NotBlank
    private String field;
    @NotBlank
    private String direction;

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }
}
