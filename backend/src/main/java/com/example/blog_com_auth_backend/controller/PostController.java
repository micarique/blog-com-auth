package com.example.blog_com_auth_backend.controller;

import com.example.blog_com_auth_backend.dto.PostRequestDTO;
import com.example.blog_com_auth_backend.dto.PostResponseDTO;
import com.example.blog_com_auth_backend.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // Endpoint público para listar posts
    @GetMapping
    public List<PostResponseDTO> listPost() {
        return postService.listPost();
    }

    // Endpoint privado para listar apenas posts do usuário
    @GetMapping("/me")
    public List<PostResponseDTO> listUserPosts(@AuthenticationPrincipal UserDetails userDetails) {
        return postService.listUserPosts(userDetails);
    }

    // Endpoint público para obter post por ID
    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> searchPost(@PathVariable Long id) {
        return postService.searchPost(id);
    }

    // Endpoint para criar post
    @PostMapping
    public ResponseEntity<PostResponseDTO> createPost(@RequestBody @Valid PostRequestDTO postRequestDTO, @AuthenticationPrincipal UserDetails userDetails) {
        return postService.createPost(postRequestDTO, userDetails); // Certifique-se de retornar PostResponseDTO aqui
    }

    // Endpoint para atualizar post
    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDTO> updatePost(@PathVariable Long id, @RequestBody @Valid PostRequestDTO postRequestDTO, @AuthenticationPrincipal UserDetails userDetails) {
        return postService.updatePost(id, postRequestDTO, userDetails); // Certifique-se de retornar PostResponseDTO aqui
    }

    // Deletar post (autenticado)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        return postService.deletePost(id, userDetails);
    }
}
