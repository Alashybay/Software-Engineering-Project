import { useMutation, useQueryClient, MutationFunction } from '@tanstack/react-query';
import { createUser } from '../services/api';
import { User } from '../typings/user';
import { USERS_QUERY_KEY } from '../constants/queryKeys';

interface CreateUserMutationVariables {
  newUserInfo: Partial<User>;
}

export const useCreateNewUser = () => {
  const queryClient = useQueryClient();

  const mutationFn: MutationFunction<Record<string, any>, CreateUserMutationVariables> = async (variables) => {
    const { newUserInfo } = variables;
    return await createUser(newUserInfo);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};
