import { useQueryClient } from "@tanstack/react-query";

import { getAllPostsAction } from "../_actions/get-all-posts.action";

const baseKey = "posts";

export const getAllPostsQuery = () => ({
  queryKey: [baseKey, "getAllPostsById"],
  queryFn: () => getAllPostsAction(),
});

export const useInvalidatePosts = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getAllPostsById"],
    });
};
