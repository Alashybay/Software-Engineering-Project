

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POSTS_QUERY_KEY } from '../constants/queryKeys';
import { deletePost } from '../services/api';

export const useDeletePost = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
    },
    ...options,
  });
};
