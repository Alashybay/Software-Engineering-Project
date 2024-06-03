export type User = {
    id: string;
    email: string;
    is_admin: boolean;
    password?: string;
  };

  export type LoginResponse = {
    user: User;
  };
