// src/app/api/auth/[...nextauth]/auth.js
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                const { email, password, rememberMe } = credentials;

                if (email === "admin@admin.com" && password === "123456") {
                    return {
                        id: "1",
                        name: "Admin",
                        email,
                        rememberMe: rememberMe === "true", // string por default
                    };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7,
    },
    pages: {
        signIn: "/(full-width-pages)/(auth)/signin",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.rememberMe = user.rememberMe;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.rememberMe = token.rememberMe;
            return session;
        }

    },
    secret: process.env.NEXTAUTH_SECRET || "segredo-qualquer",
    debug: true,
};
