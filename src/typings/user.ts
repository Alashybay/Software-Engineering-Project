
export type User ={
    id?: number;
    firstname: string;
    middlename?: string | null;
    surname?: string;
    email: string;
    age: number;
    password: string;
    phone?: string | null;
    preferences?: string;
    avatar?:string;
    role?: string;
    is_admin?:number,
  }
