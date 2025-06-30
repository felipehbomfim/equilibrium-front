# Plataforma Equilibrium 

Projeto **Equilibrium**, construído com **Next.js**, **Tailwind CSS**, **NextAuth.js** , **Android** , **Kotlin** e outras tecnologias modernas de desenvolvimento.

## 🔥 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Lucide Icons](https://lucide.dev/)
- [ESLint + Prettier](https://eslint.org/)
- [MUI Skeleton](https://mui.com/material-ui/react-skeleton/) – para loaders visuais
- [Cookies / SessionStorage] – para simulação de autenticação temporária
- [Kotlin](https://kotlinlang.org) - Linguagem de programação para o app mobile
- [Android](https://www.android.com/intl/pt_br/) - Ambiente mobile

## 📁 Estrutura de Pastas front

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

## 📱 Como Rodar o APK (Aplicativo Android)

Siga os passos abaixo para instalar e executar o app Android no seu dispositivo:

### 1. Ative a Depuração USB

No seu celular Android:

- Acesse **Configurações > Sobre o telefone**
- Toque 7 vezes em **Número da versão** para ativar as **Opções de desenvolvedor**
- Volte e acesse **Opções de desenvolvedor**, depois ative a opção **Depuração USB**

### 2. Conecte o Dispositivo ao PC

- Use um cabo USB
- Confirme a permissão de depuração no celular, se for solicitado

### 3. Instale o APK

Você pode instalar o APK de duas formas:

#### ✔️ Via Android Studio

1. Abra o projeto Android no **Android Studio**
2. Selecione o dispositivo conectado no topo da interface
3. Clique em **Run ▶️** ou use `Shift + F10`

#### ✔️ Via Terminal (ADB)

1. Verifique se o dispositivo está visível:
   ```bash
   adb devices

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
- [@JoaoVitor](https://github.com/JoaoV1821)
---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.# equilibrium-front
# equilibrium-front
