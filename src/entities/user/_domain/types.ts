import { PostEntity } from "@/entities/post";

export type UserId = string;
export type BookmarkId = string;
export type Role = "ADMIN" | "USER";

export const ROLES: Record<Role, Role> = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export type UserEntity = {
  id: UserId;
  email: string;
  emailVerified?: Date | null;
  role: Role;
  name?: string | null;
  image?: string | null;
};

export type SessionEntity = {
  user: {
    id: UserId;
    email: string;
    role: Role;
    name?: string | null;
    image?: string | null;
  };
  expires: string;
};

export type Profile = {
  email: string;
  name?: string | null;
  image?: string | null;
};

export type BookmarkEntity = {
  id: BookmarkId;

  user: UserEntity;
  userId: string;

  post: PostEntity;
  postId: string;
};
