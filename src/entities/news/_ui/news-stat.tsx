"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEye, FaThumbsUp, FaBookmark } from "react-icons/fa";
import { getNewsViewsQuery } from "../_query/get_news_views_count_query";

interface NewsProps {
  slug: string;
  likes: number;
  bookmarks: number;
}

const NewsStats: React.FC<NewsProps> = ({ slug, likes, bookmarks }) => {
  const viewsCount = useQuery(getNewsViewsQuery(slug));
  console.log(viewsCount);
  return (
    <div className="flex justify-center gap-10 items-center text-gray-700">
      <div className="flex items-center space-x-2">
        <FaEye className="text-blue-500" size={20} />
        <span>{viewsCount.data}</span>
      </div>

      <div className="flex items-center space-x-2">
        <FaThumbsUp className="text-red-500" size={20} />
        <span>{likes}</span>
      </div>

      <div className="flex items-center space-x-2">
        <FaBookmark className="text-yellow-500" size={20} />
        <span>{bookmarks}</span>
      </div>
    </div>
  );
};

export default NewsStats;
