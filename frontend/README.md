# 🖥️ CodeSocial — Front-end

Este é o front-end do projeto **CodeSocial**, desenvolvido com **Next.js 14** usando a nova arquitetura de rotas (`app/`) e estilizado com **TailwindCSS**. Ele consome uma API RESTful construída em Java (Spring Boot) para autenticação e gerenciamento de posts.

---

## ⚙️ Tecnologias

- Next.js 15 com App Router
- TypeScript + TSX
- TailwindCSS
- Axios
- React Hooks
- LocalStorage (armazenamento do token JWT)

---

## 🧠 Funcionalidades

- Tela principal com formulários de login e cadastro (estilo Facebook)
- Redirecionamento seguro para o dashboard após login
- Validação simples de formulário
- Feed público com listagem de postagens
- Dashboard protegido com CRUD de posts
- Design minimalista e profissional com foco em usabilidade

---

## ▶️ Executando Localmente

```bash
# Navegar até a pasta frontend
cd frontend

# Instalar dependências
npm install

# Rodar projeto em modo desenvolvimento
npm run dev
Certifique-se de que a API esteja rodando em http://localhost:8080

🔐 Autenticação
O token JWT é armazenado no localStorage após o login e incluído manualmente nos headers das requisições protegidas.

📂 Estrutura Principal
bash
Copiar
Editar
frontend/
├── app/
│   ├── page.tsx                     # Tela principal (login/cadastro)
│   ├── posts/page.tsx               # Feed público
|        ├── [id]/page.tsx           # post completo
│   ├── dashboard/page.tsx           # CRUD de posts
|        ├── editPost[id]/page.tsx   # Formulário de edição de post
|        ├── newPost/page.tsx        # Formulário de criação de post
├── components/                      # Componentes reutilizáveis 
├── hooks/                           # Custom hooks
├── services/api.ts                  # Axios configurado
├── types/Post.ts                    # Tipagem dos posts

🤝 Integração com o Back-end
As rotas consomem a API Java Spring Boot hospedada em http://localhost:8080. Endpoints seguros requerem token JWT no header Authorization: Bearer.

✨ Detalhes Extras
Sem dependências complexas de autenticação (JWT via Axios + localStorage)

Redirecionamentos protegidos com useRouter e verificação local de token

Código modular e organizado, com nomeação clara

✍️ Desenvolvido por
Micael Machado • Desenvolvedor fullstack com foco em usabilidade, boas práticas e soluções modernas.
