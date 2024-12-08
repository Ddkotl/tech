import { UserEntity } from "@/entities/user";
import { Post } from "@prisma/client";

export type LikeId = string;
export type LikeEntity = {
  id: LikeId;

  user: UserEntity;
  userId: string;

  post: Post;
  postId: string;
};
