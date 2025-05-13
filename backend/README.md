# 🔙 CodeSocial — API Back-end

Esta é a API RESTful do projeto **CodeSocial**, desenvolvida com **Spring Boot** e banco de dados **PostgreSQL**. Ela fornece autenticação JWT, segurança com Spring Security e endpoints protegidos para gerenciamento de posts.

---

## 🔧 Tecnologias

- Java 17
- Spring Boot 3
- Spring Security
- JWT (JSON Web Token)
- PostgreSQL
- JPA / Hibernate
- Lombok

---

## 📦 Executando o Projeto
```bash
# Navegar para a pasta backend
cd blog-com-auth-backend

# Rodar via Maven
./mvnw spring-boot:run
Certifique-se de que o PostgreSQL está rodando localmente e configurado no application.properties

📑 Endpoints da API
Autenticação
Método	     Rota	   Corpo JSON	                 Resposta
POST	/auth/register	{ name, email, password }	201 Created
POST	/auth/login	{ email, password }	        { token }

Postagens
Método    Rota	     Protegido	     Descrição
GET	/posts	        ❌	Lista postagens públicas
GET	/posts/me       ✅	Lista posts do usuário logado
POST	/posts	        ✅	Cria nova postagem
PUT	/posts/{id}     ✅	Atualiza postagem existente
DELETE	/posts/{id}	✅	Remove postagem

🔐 Segurança
Todas as rotas /posts/* (exceto GET /posts) requerem autenticação JWT

O token deve ser enviado no header:
Authorization: Bearer {token}

📂 Estrutura
backend/
├── controller/     # Contém as classes que recebem as requisições HTTP. Elas definem os endpoints da aplicação e chamam os serviços apropriados
├── dto/            # Usadas para evitar expor diretamente as entidades (model) e para controlar quais dados são enviados ou recebidos.
├── model/          # Contém as entidades do sistema. Representam as tabelas do banco de dados e os objetos de domínio.
├── repository/     # Contém as interfaces que acessam o banco de dados. Responsáveis por operações como salvar, buscar, deletar, etc.
├── security/       # Contém classes relacionadas à segurança da aplicação, como configuração do Spring Security, filtros de autenticação, geração e validação de JWTs.
├── service/        # Contém a lógica de negócio da aplicação. Essas classes são chamadas pelos controllers para executar as ações principais, como regras de validação, chamadas ao repositório, processamento de dados.
└── BlogComAuthApplication.java

💬 Observações
API pronta para produção com boas práticas de autenticação e organização

Permite escalabilidade e integração com qualquer front-end moderno

Código limpo e comentado, com foco didático e profissional

✍️ Desenvolvido por
Micael Machado • Desenvolvedor fullstack com foco em usabilidade, boas práticas e soluções modernas.
