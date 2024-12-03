import { PostEntity } from "@/entities/post";
import { UserEntity } from "@/entities/user";

export type BookmarkId = string;

export type BookmarkEntity = {
  id: BookmarkId;

  user: UserEntity;
  userId: string;

  post: PostEntity;
  postId: string;
};
