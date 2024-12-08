import { UserEntity } from "@/entities/user";
import { Post } from "@prisma/client";

export type BookmarkId = string;

export type BookmarkEntity = {
  id: BookmarkId;

  user: UserEntity;
  userId: string;

  post: Post;
  postId: string;
};
