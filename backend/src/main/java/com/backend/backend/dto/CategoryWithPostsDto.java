package com.backend.backend.dto;

import com.backend.backend.models.Post;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CategoryWithPostsDto {
    private long id;

    private String name;

    private List<Post> posts;

    private int postCount;

    public CategoryWithPostsDto(long id, String name, List<Post> posts, int postCount) {
        this.id = id;
        this.name = name;
        this.posts = posts;
        this.postCount = postCount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public int getPostCount() {
        return postCount;
    }

    public void setPostCount(int postCount) {
        this.postCount = postCount;
    }
}
