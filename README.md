# 💡 CodeSocial — Blog com Autenticação

CodeSocial é uma aplicação full stack desenvolvida com Java (Spring Boot) no back-end e Next.js no front-end. Inspirada em redes sociais minimalistas como o antigo Facebook, permite que usuários criem contas, publiquem conteúdos autorais e gerenciem seus próprios posts em um painel privado.

---

## 🚀 Funcionalidades

- ✅ Cadastro e login de usuários com autenticação via JWT
- ✅ Página principal com formulários de login e cadastro (estilo Facebook)
- ✅ Visualização pública de postagens (feed)
- ✅ Dashboard protegido para criar, editar e excluir posts
- ✅ Verificação de autenticação e redirecionamento seguro
- ✅ Interface moderna, responsiva e minimalista com TailwindCSS
- ✅ Código limpo, modular e com boas práticas

---

## 🧰 Tecnologias Utilizadas

### 🔙 Back-end
- Java 17
- Spring Boot 
- Spring Security
- JWT (Autenticação)
- PostgreSQL
- Maven

### 🔜 Front-end
- Next.js 15 (App Router)
- TypeScript
- Axios
- TailwindCSS

---

## 📂 Estrutura do Projeto
```
blog-com-auth/
  ├── backend/ # Spring Boot API
  ├── frontend/ # Next.js interface
  └── README.md # Este arquivo
```
---

## 🔗 Endpoints da API

| Método | Rota              | Descrição                        | Protegido |
|--------|-------------------|----------------------------------|-----------|
| POST   | `/auth/register`  | Cadastrar novo usuário           | ❌        |
| POST   | `/auth/login`     | Fazer login e receber token JWT | ❌        |
| GET    | `/posts`          | Listar posts públicos            | ❌        |
| GET    | `/posts/me`       | Listar posts do usuário logado   | ✅        |
| POST   | `/posts`          | Criar novo post                  | ✅        |
| PUT    | `/posts/{id}`     | Atualizar post por ID            | ✅        |
| DELETE | `/posts/{id}`     | Deletar post por ID              | ✅        |

---

## 🎯 Objetivo

Este projeto foi desenvolvido com foco em demonstrar domínio de tecnologias modernas, boas práticas de código e sensibilidade de design. Ele simula um ambiente real de desenvolvimento, ideal para comprovar competências técnicas em processos seletivos.

---

## 👩‍💻 Desenvolvedor

Feito com propósito, estudo e dedicação por **Micael Machado**  
```
🔗 https://www.linkedin.com/in/micael-machado-b4b9821a5/
📬 micarique2010@gmail.com
