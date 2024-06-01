import { useEffect, useState } from 'react';
import { User } from '../typings/user';
import { fetchUsers } from '../services/api';

export const useGetUsers = (): { data: User[] | null, isLoading: boolean, error: string | null } => {
    const [data, setData] = useState<User[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setData(usersData);
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching users');
                setIsLoading(false);
            }
        };

        getUsers();
    }, []);

    return { data, isLoading, error };
};
