import axios from 'axios';
import { User } from './authTypes';


type LoginFn = (email: string, password: string) => Promise<User | null>;

export const login: LoginFn = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8081/api/signin', {
      email: email,
      password: password,
    });
    const user = response.data.user;
    return {
      id: user.id,
      email: user.email,
      is_admin: user.is_admin,
    };
  } catch (error:any) {
    throw new Error("Authentication error:", error)
  }
};
