import { Post } from "@prisma/client";

export type CategoryId = string;

export type CategoryEntity = {
  id: CategoryId;
  createdAt: Date;
  updatedAt: Date;

  image?: string | null;
  name: string;
  description: string;

  posts: Post[];
};
