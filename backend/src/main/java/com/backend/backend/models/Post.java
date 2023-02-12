package com.backend.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false)
    private String mainPhotoUrl;

    @Column(nullable = false)
    private String mainPhotoName;

    @Lob
    @Column(nullable = false, length = 100000)
    private String content;

    @Column(nullable = false)
    private boolean active;

    @Column(nullable = false)
    private long visitCounter;
    @Transient
    private int likeCount;

    @Transient
    private boolean isLikedByUser;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonManagedReference(value = "post-user")
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "post_category", joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    @OrderBy(value = "id")
    private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "post")
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "post")
    @JsonManagedReference
    private Set<Photo> photos = new HashSet<>();

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "post")
    @JsonBackReference
    private Set<Like> likes = new HashSet<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMainPhotoUrl() {
        return mainPhotoUrl;
    }

    public void setMainPhotoUrl(String mainPhotoUrl) {
        this.mainPhotoUrl = mainPhotoUrl;
    }

    public String getMainPhotoName() {
        return mainPhotoName;
    }

    public void setMainPhotoName(String mainPhotoName) {
        this.mainPhotoName = mainPhotoName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public long getVisitCounter() {
        return visitCounter;
    }

    public void setVisitCounter(long visitCounter) {
        this.visitCounter = visitCounter;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    @JsonIgnore
    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<Like> getLikes() {
        return likes;
    }

    public void setLikes(Set<Like> likes) {
        this.likes = likes;
    }

    public int getLikeCount() {
        return this.likes.size();
    }

    public void setLikeCount() {
        this.likeCount = this.likes.size();
    }

    public boolean isLikedByUser() {
        return isLikedByUser;
    }

    public void setLikedByUser(boolean likedByUser) {
        isLikedByUser = likedByUser;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", mainPhotoUrl='" + mainPhotoUrl + '\'' +
                ", mainPhotoName='" + mainPhotoName + '\'' +
                ", content='" + content + '\'' +
                ", active=" + active +
                ", visitCounter=" + visitCounter +
                ", user=" + user +
                ", categories=" + categories +
                ", comments=" + comments +
                ", photos=" + photos +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", likes=" + likes +
                '}';
    }
}
