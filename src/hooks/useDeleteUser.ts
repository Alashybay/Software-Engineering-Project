import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../services/api';
import { USERS_QUERY_KEY } from '../constants/queryKeys';

export const useDeleteUser = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
    ...options,
  });
};
