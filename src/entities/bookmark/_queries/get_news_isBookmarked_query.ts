import { useQueryClient } from "@tanstack/react-query";
import { getNewsIsBookmarkedAction } from "../_actions/get_news_isBookmarked_action";

const baseKey = "bookmark";

export const getNewsIsBookmarkedQuery = (newsId: string, userId: string) => ({
  queryKey: [baseKey, "getNewsIsBookmarkedQuery", newsId, userId],
  queryFn: () => getNewsIsBookmarkedAction(newsId, userId),
  staleTime: 1000 * 60 * 10,
  cacheTime: 1000 * 60 * 10,
});

export const useInvalidateBookmarksCountQuery = () => {
  const queryClient = useQueryClient();
  return (newsId: string, userId: string) => {
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getNewsIsBookmarkedQuery", newsId, userId],
    });
  };
};
