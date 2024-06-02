import axios from 'axios';

type User = {
  id: string;
  email: string;
  password?: string;
};

type LoginFn = (email: string, password: string) => Promise<User | null>;

export const login: LoginFn = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8081/api/signin', {
      email: email,
      password: password,
    });
    console.log(response.data.user);

    return response.data.user;
  } catch (error) {
    console.log('some err');

    console.error("Authentication error:", error);
    return null;
  }
};
