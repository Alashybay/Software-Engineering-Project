import NextAuth from "next-auth";
import { User as AuthUser } from './authTypes';

declare module "next-auth" {
  interface User extends AuthUser {}

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    email: string;
    is_admin: boolean;
  }
}
