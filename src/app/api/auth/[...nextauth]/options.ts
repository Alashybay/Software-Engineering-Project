import { login } from '@/src/lib/auth';
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
                    const user = await login(
                        credentials.email,
                        credentials.password
                    );
                    return user;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            }
        })
    ],
    secret: 'K+Aj61Fp4lPLr85Au4urQgexIwygXvu+d1urkNYw0f4=',
    pages: {
        signIn: '/signIn',
        // newUser: '/signUp'
    }
};
