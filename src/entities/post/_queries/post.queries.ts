import { useQuery } from "@tanstack/react-query";
import {
  getFeaturedPost,
  getPopularCategories,
  getPopularPosts,
  getRecentPosts,
} from "../_actions/posts.server.actions";

export function useFeaturedPost() {
  return useQuery({
    queryKey: ["featuredPost"],
    queryFn: getFeaturedPost,
  });
}

export function useRecentPosts() {
  return useQuery({
    queryKey: ["recentPosts"],
    queryFn: getRecentPosts,
  });
}

export function usePopularPosts() {
  return useQuery({
    queryKey: ["popularPosts"],
    queryFn: getPopularPosts,
  });
}

export function usePopularCategories() {
  return useQuery({
    queryKey: ["popularCategories"],
    queryFn: getPopularCategories,
  });
}
