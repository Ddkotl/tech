import { useQueryClient } from "@tanstack/react-query";
import { getNewsBookmarksCountAction } from "../_actions/get_news_bookmarks_count_action";

const baseKey = "bookmark";

export const getNewsBookmarksCountQuery = (newsId: string) => ({
  queryKey: [baseKey, "getBookmarksCountQuery", newsId],
  queryFn: () => getNewsBookmarksCountAction(newsId),
  staleTime: 1000 * 60 * 10,
  cacheTime: 1000 * 60 * 10,
});

export const useInvalidateNewsBookmarksCountQuery = () => {
  const queryClient = useQueryClient();
  return (newsId: string) => {
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getBookmarksCountQuery", newsId],
    });
  };
};
