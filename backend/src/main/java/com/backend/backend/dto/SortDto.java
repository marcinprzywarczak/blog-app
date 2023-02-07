package com.backend.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class SortDto {
    @NotBlank
    private String field;
    @NotBlank
    private String direction;

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
