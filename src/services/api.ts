import axios, { AxiosResponse } from 'axios';
import { User } from '../typings/user';

const api = axios.create({
    baseURL: 'http://localhost:8081/api', // Base URL of your backend API
});

export const fetchUsers = async (filters?: Record<string, any>): Promise<User[]> => {
    const response: AxiosResponse<User[]> = await api.get('/users', { params: filters });
    return response.data;
};

export const deleteUser = async (userId: number): Promise<Record<string, any>> => {
    if (!userId) {
        throw new Error("User ID is required");
    }

    try {
        const response: AxiosResponse<Record<string, any>> = await api.delete(`/users/${userId}`);
        return response.data;
    } catch (error:any) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
};

export const updateUser = async (userId: number, updatedUserInfo: Partial<User>): Promise<Record<string, any>> => {
    if (!userId) {
        throw new Error("User ID is required");
    }

    try {
        const response: AxiosResponse<Record<string, any>> = await api.put(`/users/${userId}`, updatedUserInfo);
        return response.data;
    } catch (error:any) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
};

export const fetchPosts = async (filters?: Record<string, any>): Promise<Post[]> => {
    const response: AxiosResponse<Post[]> = await api.get('/posts', { params: filters });
    return response.data;
};
