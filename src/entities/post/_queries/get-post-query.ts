import { useQueryClient } from "@tanstack/react-query";
import { PostId } from "../_domain/types";
import { getPostAction } from "../_actions/get-post.action";

const baseKey = "post";

export const getPostQuery = (postId: PostId) => ({
  queryKey: [baseKey, "getPostById", postId],
  queryFn: () => getPostAction({ postId }),
});

export const useInvalidatePost = () => {
  const queryClient = useQueryClient();

  return (postId: PostId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getPostById", postId],
    });
};
