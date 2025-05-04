// src/app/api/auth/[...nextauth]/auth.js
import CredentialsProvider from "next-auth/providers/credentials";
import API_URL from '@/services/api';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                cpf: { label: "CPF", type: "text" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await fetch(`${API_URL}/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            cpf: credentials.cpf,
                            password: credentials.password,
                        }),
                    });
                    console.log(response);

                    if (!response.ok) {
                        console.error('Erro ao autenticar:', await response.text());
                        return null;
                    }

                    const { token, user } = await response.json();

                    if (token && user) {
                        return {
                            id: user.cpf,
                            name: user.name,
                            cpf: user.cpf,
                            token,
                            profile: user.profile,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Erro ao autenticar:', error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
    },
    pages: {
        signIn: "/(full-width-pages)/(auth)/signin",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.cpf = user.cpf;
                token.accessToken = user.token;
                token.profile = user.profile;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.cpf = token.cpf;
            session.user.accessToken = token.accessToken;
            session.user.profile = token.profile;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};
