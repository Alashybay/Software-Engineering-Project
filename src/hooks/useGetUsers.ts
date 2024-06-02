import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/api';
import { USERS_QUERY_KEY } from '../constants/queryKeys';



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
