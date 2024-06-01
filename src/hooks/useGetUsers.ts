import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/api';

export const USERS_QUERY_KEY = 'users';

export const useFetchUsers = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, filters],
    queryFn: () => {
      return fetchUsers(filters);
    },
    enabled: !!filters,
    ...options,
  });
};

//If filter is empty it fetches all users