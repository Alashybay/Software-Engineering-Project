import { login } from '@/src/lib/auth';
import { User } from '@/src/lib/authTypes';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email:",
                    type: "text",
                    placeholder: "email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials) {
                if (!credentials) return null;
                try {
                    const user: User | null = await login(credentials.email, credentials.password);
                    return user;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.email = user.email;
            token.is_admin = user.is_admin;
          }
          return token;
        },
        async session({ session, token }) {
            if (token) {
              session.user = {
                id: token.id as string,
                email: token.email as string,
                is_admin: token.is_admin as boolean,
              };
            }
            return session;
          },
      },
    secret: 'K+Aj61Fp4lPLr85Au4urQgexIwygXvu+d1urkNYw0f4=',
    pages: {
        signIn: '/signIn',
        // newUser: '/signUp'
    }
};
