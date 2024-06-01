import { useState, useEffect } from 'react';
import { User } from '../typings/user';




  const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:8081/users');
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          const data: User[] = await response.json();
          setUsers(data);
        } catch (error:any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, []);

    return { users, loading, error };
  };

  export default useUsers;
