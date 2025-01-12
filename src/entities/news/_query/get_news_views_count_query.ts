import { useQueryClient } from "@tanstack/react-query";
import { getNewsViewsActon } from "../_actons/get_news_views_action";

const baseKey = "news";

export const getNewsViewsQuery = (slug: string) => ({
  queryKey: [baseKey, "getNewsViewsQuery", slug],
  queryFn: () => getNewsViewsActon(slug),
  staleTime: 10 * 60 * 1000,
});

export const useInvalidateProfile = () => {
  const queryClient = useQueryClient();

  return (slug: string) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getNewsViewsQuery", slug],
    });
};
