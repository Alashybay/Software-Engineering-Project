export type User ={
    id: number;
    firstname: string;
    middlename: string | null;
    surname: string;
    email: string;
    password: string;
    phone: string | null;
    is_admin: number;
    preferences: string;
    avatar?:string;
    role?: string;
  }
