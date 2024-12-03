import { PostEntity } from "@/entities/post";

export type CategoryId = string;

export type CategoryEntity = {
  id: CategoryId;
  createdAt: Date;
  updatedAt: Date;

  image?: string | null;
  name: string;
  description: string;

  posts: PostEntity[];
};
