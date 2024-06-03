import { Category } from "./category";

export type User ={
    id: number;
    firstname: string;
    middlename: string | null;
    surname: string;
    email: string;
    password: string;
    phone: string | null;
    preferences: Category[];
    avatar?:string;
    role?: string;
    is_admin?:number,
  }
