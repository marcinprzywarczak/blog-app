package com.backend.backend.dto;

public class UpdatePostDto extends NewPostDto{
    private boolean photoChanged;

    public boolean isPhotoChanged() {
        return photoChanged;
    }

    public void setPhotoChanged(boolean photoChanged) {
        this.photoChanged = photoChanged;
    }
}
