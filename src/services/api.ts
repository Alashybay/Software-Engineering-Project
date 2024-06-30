import axios, { AxiosResponse } from 'axios';
import { User, UserFetch } from '../typings/user';
import { Post } from '../typings/post';

const api = axios.create({
    baseURL: 'http://localhost:8081/api', // Base URL of your backend API
});
export const createUser= async (newUser: Partial<User>)=>{
    const response: AxiosResponse<Record<string, any>> = await api.post(`/users`, newUser);
    return response;

}
export const createPost= async (newPost: Partial<Post>)=>{
    const response: AxiosResponse<Record<string, any>> = await api.post(`/posts/create`, newPost);
    return response;
}

export const deletePost = async (postId: number): Promise<Record<string, any>> => {
    if (!postId) {
        throw new Error("ID is required");
    }

    try {
        const response: AxiosResponse<Record<string, any>> = await api.delete(`/posts/${postId}`);
        return response.data;
    } catch (error:any) {
        throw new Error(`Failed to delete post: ${error.message}`);
    }
};

export const fetchUsers = async (filters?: Record<string, any>): Promise<UserFetch[]> => {
    const response: AxiosResponse<UserFetch[]> = await api.get('/users', { params: filters });
    return response.data;
};

export const deleteUser = async (userId?: number): Promise<Record<string, any>> => {
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

export const updateClickCount = async (postId: number): Promise<AxiosResponse<Record<string, any>>> => {
    try {
        const response: AxiosResponse<Record<string, any>> = await api.put(`/posts/${postId}/click`);
        return response;
    } catch (error: any) {
        throw new Error(`Failed to update click count: ${error.message}`);
    }
};