export type PostId = string;

export type PostEntity = {
  id: PostId;
  title: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type CreatePostDto = {
  title: string;
  content: string;
};
