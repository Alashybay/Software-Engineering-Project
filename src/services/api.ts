import axios, { AxiosResponse } from 'axios';
import { User } from '../typings/user';

const api = axios.create({
    baseURL: 'http://localhost:8081/api', // Base URL of your backend API
});

export const fetchUsers = async (): Promise<User[]> => {
    const response: AxiosResponse<User[]> = await api.get('/users');
    return response.data;
};
