
export type User = {
    id?: number;
    firstname: string;
    middlename?: string | null;
    surname?: string;
    email: string;
    age: number;
    password: string;
    phone?: string | null;
    user_preference?: Preferences;
    avatar?:string;
    role?: string;
    is_admin?:number,
    is_sub?: number;
  }
export type UserFetch = {
  id: number;
  firstname: string;
  middlename?: string | null;
  surname?: string;
  email: string;
  age: number;
  password: string;
  phone?: string | null;
  avatar?:string;
  role?: string;
  is_admin?:number,
  user_preference: Preferences;
  is_sub?: number;
}

export type Preferences = {
  cuisines: string[];
  ingredients: string[];
  allergies: string[];
  glutenFreeOnly: boolean;
}
