package com.backend.backend.dto;

import com.backend.backend.validations.postSortField.PostSortField;
import jakarta.validation.constraints.NotBlank;

public class PaginationSortSearchPostDto extends PaginationDto{
    private String search;

    @NotBlank
    @PostSortField
    private String field;
    @NotBlank
    private String direction;

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }
}
