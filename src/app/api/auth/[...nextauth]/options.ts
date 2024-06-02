import axios from 'axios';
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
            async authorize(credentials?: {email: string, password:string}) {
                if(!credentials) return null
                console.log(credentials);

                try {
                    // Make API call to authenticate user
                    const response = await axios.post('/api/auth/signin', {
                        email: credentials.email,
                        password: credentials.password
                    });

                    // If authentication successful, return user data
                    return response.data.user;
                } catch (error) {
                    // If authentication fails, return null
                    console.error("Authentication error:", error);
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // pages:{
    //     // signIn: '/signIn',
    //     // newUser: '/signUp'
    // }
}