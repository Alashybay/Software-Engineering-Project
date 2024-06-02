import { useMutation, useQueryClient, MutationFunction } from '@tanstack/react-query';
import { updateUser } from '../services/api';
import { User } from '../typings/user';
import { USERS_QUERY_KEY } from '../constants/queryKeys';

interface UpdateUserMutationVariables {
  userId: number;
  updatedUserInfo: Partial<User>;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutationFn: MutationFunction<Record<string, any>, UpdateUserMutationVariables> = async (userData) => {
    const { userId, updatedUserInfo } = userData;
    return await updateUser(userId, updatedUserInfo);
  };

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};
