package com.example.blog_com_auth_backend.repository;

import com.example.blog_com_auth_backend.model.Post;
import com.example.blog_com_auth_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByCreatedAtDesc();
    List<Post> findByAutorOrderByCreatedAtDesc(User user);
}