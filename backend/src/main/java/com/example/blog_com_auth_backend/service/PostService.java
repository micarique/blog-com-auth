package com.example.blog_com_auth_backend.service;

import com.example.blog_com_auth_backend.dto.PostRequestDTO;
import com.example.blog_com_auth_backend.dto.PostResponseDTO;
import com.example.blog_com_auth_backend.model.Post;
import com.example.blog_com_auth_backend.model.User;
import com.example.blog_com_auth_backend.repository.PostRepository;
import com.example.blog_com_auth_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    // Listar posts (Não requer autenticação)
    public List<PostResponseDTO> listPost() {
        return postRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(PostResponseDTO::new)
                .toList();
    }

    // Buscar post por ID (Não requer autenticação)
    public ResponseEntity<PostResponseDTO> searchPost(Long id) {
        return postRepository.findById(id)
                .map(post -> ResponseEntity.ok(new PostResponseDTO(post)))
                .orElse(ResponseEntity.notFound().build());
    }

    // Listar apenas posts do autor para CRUD (Requer autenticação)
    public List<PostResponseDTO> listUserPosts(UserDetails userDetails) {
        String email = userDetails.getUsername();
        User autor = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        List<Post> posts = postRepository.findByAutorOrderByCreatedAtDesc(autor);

        return posts.stream().map(PostResponseDTO::new).toList();
    }

    // Criar post (Requer autenticação)
    public ResponseEntity<PostResponseDTO> createPost(PostRequestDTO dto, UserDetails userDetails) {
        User autor = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        Post post = Post.builder()
                .titulo(dto.getTitulo())
                .conteudo(dto.getConteudo())
                .createdAt(LocalDateTime.now())
                .autor(autor)
                .build();
        Post savedPost = postRepository.save(post);
        return ResponseEntity.ok(new PostResponseDTO(savedPost));  // Retorna o DTO do Post
    }

    // Atualizar post (Requer autenticação)
    public ResponseEntity<PostResponseDTO> updatePost(Long id, PostRequestDTO dto, UserDetails userDetails) {
        return postRepository.findById(id).map(post -> {
            // Verifica se o usuário autenticado é o autor do post
            if (!post.getAutor().getEmail().equals(userDetails.getUsername())) {
                // Retorna erro 403, mas agora com a mensagem de erro no DTO
                return ResponseEntity.status(403).body(new PostResponseDTO("Erro 403 - Não autorizado"));
            }

            // Atualiza o post com os novos dados
            post.setTitulo(dto.getTitulo());
            post.setConteudo(dto.getConteudo());

            // Salva as alterações no banco
            Post updatedPost = postRepository.save(post);

            // Retorna o post atualizado em um ResponseEntity com o DTO correto
            return ResponseEntity.ok(new PostResponseDTO(updatedPost));
        }).orElse(ResponseEntity.notFound().build()); // Se não encontrar o post, retorna 404
    }

    // Deletar post (Requer autenticação)
    public ResponseEntity<Void> deletePost(Long id, UserDetails userDetails) {
        // Encontre o post pelo ID
        return postRepository.findById(id)
                // Verifique se o usuário é o autor do post
                .<ResponseEntity<Void>>map(post -> {  // Tipo explícito no map
                    if (!post.getAutor().getEmail().equals(userDetails.getUsername())) {
                        // Se o usuário não for o autor, retorne 403 (Forbidden)
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                    }
                    // Se o post for encontrado e o usuário for o autor, exclua o post
                    postRepository.delete(post);
                    // Retorne 204 (No Content) após excluir com sucesso (sem corpo)
                    return ResponseEntity.noContent().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // Se o post não for encontrado, retorne 404 (Not Found)
    }
}