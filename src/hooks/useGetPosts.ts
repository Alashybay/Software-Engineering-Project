import { useQuery } from '@tanstack/react-query';
import { fetchPosts, fetchUsers } from '../services/api';
import { POSTS_QUERY_KEY,  } from '../constants/queryKeys';



export const useFetchPosts = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: [POSTS_QUERY_KEY, filters],
    queryFn: () => {
      return fetchPosts(filters);
    },
    enabled: !!filters,
    ...options,
  });
};
