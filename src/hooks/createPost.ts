import { useMutation, useQueryClient, MutationFunction } from '@tanstack/react-query';
import { createPost } from '../services/api';
import { POSTS_QUERY_KEY } from '../constants/queryKeys';
import { Post } from '../typings/post';

interface CreatePostMutationVariables {
  newPostInfo: Partial<Post>;
}

export const useCreateNewPost = () => {

  const queryClient = useQueryClient();

  const mutationFn: MutationFunction<Record<string, any>, CreatePostMutationVariables> = async (variables) => {
    const { newPostInfo } = variables;
    return await createPost(newPostInfo);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
    },
  });
};
