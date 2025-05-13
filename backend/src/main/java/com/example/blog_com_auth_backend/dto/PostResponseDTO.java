package com.example.blog_com_auth_backend.dto;

import com.example.blog_com_auth_backend.model.Post;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostResponseDTO {
    private Long id;
    private String titulo;
    private String conteudo;
    private String authorEmail;
    private String authorId;
    private String authorName;
    private LocalDateTime createdAt;
    private String errorMessage;

    public PostResponseDTO(Post post) {
        this.id = post.getId();
        this.titulo = post.getTitulo();
        this.conteudo = post.getConteudo();
        this.authorEmail = post.getAutor().getEmail();
        this.authorId = post.getAutor().getId();
        this.authorName = post.getAutor().getName();
        this.createdAt = post.getCreatedAt();
    }

    // Construtor para erro, quando não há post
    public PostResponseDTO(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}