import { useQueryClient } from "@tanstack/react-query";
import { getNewsViewsActon } from "../_actons/get_news_views_action";

const baseKey = "news";

export const getNewsViewsQuery = (newsId: string) => ({
  queryKey: [baseKey, "getNewsViewsQuery", newsId],
  queryFn: () => getNewsViewsActon(newsId),
  staleTime: 10 * 60 * 1000,
  cashTime: 10 * 60 * 1000,
});

export const useInvalidateNewsViewsQuery = () => {
  const queryClient = useQueryClient();

  return (newsId: string) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getNewsViewsQuery", newsId],
    });
};
