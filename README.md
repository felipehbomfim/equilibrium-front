# Equilibrium Front

Frontend do projeto **Equilibrium**, construído com **Next.js**, **Tailwind CSS**, **NextAuth.js** e outras tecnologias modernas de front-end.

## 🔥 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Lucide Icons](https://lucide.dev/)
- [ESLint + Prettier](https://eslint.org/)
- [MUI Skeleton](https://mui.com/material-ui/react-skeleton/) – para loaders visuais
- [Cookies / SessionStorage] – para simulação de autenticação temporária

## 📁 Estrutura de Pastas

```bash
src/
│
├── app/                  # Rotas do Next.js (App Router)
│   └── users/
│       └── profile/      # Página de perfil do usuário
│
├── components/           # Componentes reutilizáveis
│   └── pages/
│       └── users/
│           └── user-profile/
│
├── context/              # Contextos globais (Tema, Sidebar)
├── hooks/                # Hooks personalizados (como useModal)
├── utils/                # Funções utilitárias (em breve)
```

## 🛠️ Rodando o Projeto Localmente

```bash
# Instale as dependências
npm install

# Rode o projeto
npm run dev

# Inicie o db.json
json-server --watch db.json --port 3001
```

A aplicação estará disponível em `http://localhost:3000`.

## 🔐 Autenticação

O projeto utiliza **NextAuth.js** com **estratégia de credenciais (email/senha)**.  
Usuários autenticados têm sessão armazenada via `sessionStorage`, e o sistema pode redirecionar conforme o login.

Login fictício disponível em `/signin`:

```bash
Email: admin@admin.com
Senha: 123456
```

## 🧩 Funcionalidades

- Autenticação de usuários
- Perfil do próprio usuário: `/users/profile/me`
- Visualização de outros usuários: `/users/profile/:id`
- Componentes reutilizáveis com modais para edição
- Breadcrumb dinâmico
- Loader com skeleton durante o carregamento

## 🧑‍💻 Desenvolvedor

- [@felipehbomfim](https://github.com/felipehbomfim)
- [@EduardoFelixNeto](https://github.com/eduardofelixneto)
- [@VictorGabrielHilario](https://github.com/VictorGabrielHil)
---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.# equilibrium-front
# equilibrium-front
