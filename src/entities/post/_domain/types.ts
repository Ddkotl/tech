import { BookmarkEntity } from "@/entities/bookmark";
import { CategoryEntity } from "@/entities/category";
import { LikeEntity } from "@/entities/like";

export type PostId = string;

export type PostEntity = {
  id: PostId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  previewImage?: string | null;
  images: string[];
  published: boolean;
  views: number;
  likes: LikeEntity[];
  bookmarks: BookmarkEntity[];
  category?: CategoryEntity | null;
  categoryId?: string | null;
};

export type CreatePostDto = {
  title: string;
  content: string;
};
